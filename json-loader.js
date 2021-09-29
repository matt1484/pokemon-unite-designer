const gql = require('graphql-request')
const fs = require('fs')

fs.readFile(__dirname + '/all.gql', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  gql.request('https://beta.pokeapi.co/graphql/v1beta', data).then((data) => {
    const moveMap = {}
    const typeMap = {}
    const abilityMap = {}
    const allSpecies = {}

    function getBySpecies(spec) {
      return data.species[spec.index[0]].pokemon[spec.index[1]]
    }

    function formatString(str) {
      return str.split('-').map((s) => { 
        return s.length > 0? s[0].toUpperCase() + s.substring(1): '-'
      }).join(' ')
    }

    function strSort(x, y) {
      return x.localeCompare(y)
    }

    data.types.forEach((type) => {
      typeMap[String(type.id)] = type.name
    })
    data.abilities.forEach((ability) => {
      abilityMap[String(ability.id)] = formatString(ability.name)
    })
    data.moves.forEach((move) => {
      moveMap[String(move.id)] = {name: formatString(move.name), type: typeMap[String(move.type)]}
    })
    data.species.forEach((species, index) => {
      if (species.evolvesFrom !== null) {
        return
      }
      species.pokemon.forEach((pkmn, subIndex) => {
        pkmn.forms.forEach((form) => {
          if (species.id === 412) {
            console.log(String(species.id) + form.name)
          }
          allSpecies[String(species.id) + form.name] = {children: 0, index: [index, subIndex], parent: 'null', form: form.name}
        })
      })
    })
    data.species.forEach((species, index) => {
      if (species.evolvesFrom === null) {
        return
      }
      species.pokemon.forEach((pkmn, subIndex) => {
        pkmn.forms.forEach((form) => {
          let id = String(species.id) + form.name
          let parentId = String(species.evolvesFrom) + form.name
          if (allSpecies[id]) {
            id += subIndex
          }
          allSpecies[id] = {children: (allSpecies[id] || {}).children || 0, index: [index, subIndex], parent: parentId, form: form.name}
          if (species.evolvesFrom !== null) {
            if (species.evolvesFrom === 412) {
              console.log(id, parentId, allSpecies[parentId], getBySpecies(allSpecies[id]).name)
            }
            if (!allSpecies[parentId]){
              parentId = String(species.evolvesFrom) 
              allSpecies[id].parent = parentId
            }
            allSpecies[parentId].children++
          }
        })
      })
    })

    let allPokemon = []
    const allNames = new Set()
    const allIds = new Set()
    for (const spec of Object.values(allSpecies)) { 
      if (spec.children === 0) {
        const pkmn = getBySpecies(spec)
        if (allIds.has(pkmn.id)) {
          continue
        }
        allIds.add(pkmn.id)
        const pokemon = {
          id: pkmn.id,
          name: formatString(pkmn.name),
          evolutions: [{name: formatString(pkmn.name), id: pkmn.id}],
          moves: pkmn.moves.map((m) => { return moveMap[String(m.id)] }).sort((x, y) => { return strSort(x.name, y.name) }),
          types: pkmn.types.map((t) => { return typeMap[String(t.id)] }).sort(strSort),
          abilities: pkmn.abilities.map((a) => { return abilityMap[String(a.id)] }).sort(strSort),
        }
        if (allNames.has(pokemon.name) && spec.form.length > 0) {
          pokemon.name += ' (' + formatString(spec.form) + ')'
          pokemon.evolutions[0].name = pokemon.name
        }
        allNames.add(pokemon.name)
        let parent = spec.parent
        while(parent && !parent.match(/^null/)) {
          pokemon.evolutions.unshift({name: formatString(getBySpecies(allSpecies[parent]).name), id: getBySpecies(allSpecies[parent]).id})
          parent = allSpecies[parent]? allSpecies[parent].parent: 'null'
        }
        allPokemon.push(pokemon)
      }
    }
    allPokemon = allPokemon.sort((x, y) => { return strSort(x.name, y.name) })

    if (fs.existsSync(__dirname + '/public/data/pokemon')) {
      fs.rmSync(__dirname + '/public/data/pokemon/', { recursive: true, force: true })
    }
    fs.mkdirSync(__dirname + '/public/data/pokemon/')

    // because its almost 1MB of data, its being split up individually since it is unlikely that a user would ever need to load all of them (or even more than 10% at one time)
    fs.writeFileSync(__dirname + '/public/data/all-pokemon.json', JSON.stringify(allPokemon.map((pkmn) => { return {name: pkmn.name, id: pkmn.id} }), null, 0))
    allPokemon.forEach((pkmn) => {
      fs.writeFileSync(__dirname + `/public/data/pokemon/${pkmn.id}.json`, JSON.stringify(pkmn, null, 0))
    })
  })
})


