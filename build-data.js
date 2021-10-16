const axios = require('axios')
const fs = require('fs')
const gql = require('graphql-request')
const requireFromString = require('require-from-string')

axios.get('https://cdn.statically.io/gh/smogon/pokemon-showdown/master/data/pokedex.ts').then((resp) => {
  const { Pokedex } = requireFromString(resp.data.replace(/^[^=]+=\s+/, 'exports.Pokedex = '))
  axios.get('https://cdn.statically.io/gh/smogon/pokemon-showdown/master/data/moves.ts').then((resp) => {
    const { Moves } = requireFromString(resp.data.replace(/^[^=]+=\s+/, 'exports.Moves = ').replace(/\t\t\t.*/g, ''))
    axios.get('https://cdn.statically.io/gh/smogon/pokemon-showdown/master/data/learnsets.ts').then((resp) => {
      const { Learnsets } = requireFromString(resp.data.replace(/^[^=]+=\s+/, 'exports.Learnsets = '))
      gql.request('https://beta.pokeapi.co/graphql/v1beta', fs.readFileSync('./forms.gql').toString()).then((all) => {
        function strSort(x, y) {
          return x.localeCompare(y)
        }

        function normalize(s) {
          return s.replace(/[^A-z0-9]/, '').toLowerCase()
        }

        const idConversionMap = {}
        all.species.forEach((spec) => {
          spec.pokemon.forEach((pkmn) => {
            pkmn.forms.forEach((form) => {
              idConversionMap[normalize(pkmn.name)] = pkmn.id
              idConversionMap[normalize(form.name)] = pkmn.id
              idConversionMap[normalize(spec.name+form.formName)] = pkmn.id
              if (form.default && !idConversionMap[normalize(pkmn.name)]) {
                idConversionMap[normalize(pkmn.name)] = pkmn.id
              }
            })
            if (pkmn.default && !idConversionMap[normalize(spec.name)]) {
              idConversionMap[normalize(spec.name)] = pkmn.id
            }
          })
        })

        const nameToPkmn = {}
        Object.entries(Pokedex).forEach((kvp) => {
          const pkmn = kvp[1]
          const id = kvp[0]
          pkmn.id = id
          nameToPkmn[pkmn.name] = pkmn
        })

        const nameExcludes = /(mega|gmax|busted|totem|original|eternal|phony|gulping|gorging|sunshine|antique|hangry|dada|zen|fancy|pokeball|poke-ball|shock|chill|douse|burn)/
        const allPokemon = []

        function fixName(name) {
          return name.match(/-[oO]$/)? name: name.split('-').join(' ')
        }
        Object.values(Pokedex).forEach((pkmn) => {
          if (
            pkmn.evos || pkmn.num <= 0 || !idConversionMap[normalize(nameToPkmn[pkmn.name].id)] || 
            ((pkmn.tags || []).concat((nameToPkmn[pkmn.baseSpecies || ''] || {}).tags || [])).join('').toLowerCase().match(/legendary/) || 
            (pkmn.forme || '').toLowerCase().match(nameExcludes) || (pkmn.baseSpecies || '').toLowerCase().match(/arceus/)
          ) {
            return
          }
          if (pkmn.forme === 'F') {
            pkmn.forme = 'Female'
          }
          if (pkmn.forme === 'M') {
            pkmn.forme = 'Male'
          }
          const evolutions = []
          let current = pkmn.prevo || (nameToPkmn[pkmn.baseSpecies] || {}).prevo
          while(current && nameToPkmn[current]) {
            evolutions.unshift({
              name: fixName(nameToPkmn[current].name),
              id: (
                idConversionMap[normalize(nameToPkmn[current].id)] || 
                idConversionMap[normalize(nameToPkmn[current].name)] ||
                idConversionMap[normalize((nameToPkmn[current].baseSpecies || '') + (nameToPkmn[current].forme || ''))]
              ),
            })
            current = nameToPkmn[current].prevo || (nameToPkmn[current].baseSpecies || {}).prevo
          }
          evolutions.push({
            name: fixName(pkmn.name),
            id: (
              idConversionMap[normalize(nameToPkmn[pkmn.name].id)] || 
              idConversionMap[normalize(pkmn.name)] ||
              idConversionMap[normalize((pkmn.baseSpecies || '') + (pkmn.forme || ''))]
            ),
          })
          allPokemon.push({
            id: evolutions[evolutions.length - 1].id,
            name: fixName(pkmn.name),
            moves: Array.from(new Set(Object.keys(
              (Learnsets[nameToPkmn[pkmn.name].id] || {}).learnset || {}
            ).concat(Object.keys(
              (Learnsets[(nameToPkmn[pkmn.baseSpecies] || {}).id] || {}).learnset || {}
            )))).map((mv) => {
              return {name: Moves[mv].name, type: Moves[mv].type.toLowerCase()}
            }).sort((x, y) => { return strSort(x.name, y.name) }),
            types: pkmn.types.map((t) => { return t.toLowerCase() }),
            evolutions: evolutions,
            abilities: Object.values(pkmn.abilities || nameToPkmn[pkmn.baseSpecies].abilities || []).sort(strSort),
          })
        })

        if (fs.existsSync('./public/data/pokemon')) {
          fs.rmSync('./public/data/pokemon/', { recursive: true, force: true })
        }
        fs.mkdirSync('./public/data/pokemon/')
        // because its almost 1MB of data, its being split up individually since it is unlikely that a user would ever need to load all of them (or even more than 10% at one time)
        fs.writeFileSync('./public/data/all-pokemon.json', JSON.stringify(allPokemon.sort((x, y) => { return strSort(x.name, y.name) }).map((pkmn) => { return {name: pkmn.name, id: pkmn.id} }), null, 0))
        allPokemon.forEach((pkmn) => {
          fs.writeFileSync( `./public/data/pokemon/${pkmn.id}.json`, JSON.stringify(pkmn, null, 0))
        })
      })
    })
  })
})