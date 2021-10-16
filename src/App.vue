<template>
  <div id="app">
    <b-navbar sticky type="dark" style="background: rgb(82, 44, 166); padding: 10px 20px">
      <b-navbar-brand href="#">Pokemon Unite Designer</b-navbar-brand>
    </b-navbar>
    <div id="content">
      <div id="design" ref="design">
        <div :class="'banner ' + this.pokemon.types[0]">
          <div :class="'profile-image circle ' + pokemon.types.concat('')[1]">
            <b-img
              v-if="this.pokemon.id != 0"
              width="180px" 
              height="180px" 
              :src="`${this.imageUrl}${this.pokemon.id}.png`" 
              :alt="this.pokemon.name" 
            />
          </div>
          <div class="title">{{ this.pokemon.name }}</div>
        </div>
        <div class="btn-container">
          <b-btn v-for="type in this.pokemon.types.filter(x => x)" :key="type" disabled pill :class="'type-btn ' + type" style="opacity: 1 !important">{{type}}</b-btn>
          <b-btn disabled pill :class="'archetype-btn ' + archetype.split('/').slice(-1)[0].toLowerCase()" style="opacity: 1 !important">{{ archetype }}</b-btn>
        </div>
        <div class="info-grid">
          <b-card :header-class="pokemon.types[0]">
            <template v-slot:header>
              <div style="">
                <b-icon icon="x-diamond" /> Basic Attack
              </div>
            </template>
            {{ basicDescription }}
          </b-card>
          <div class="stats-container">
            <b-card v-for="(value, stat) in stats" :key="stat">
              <div class="stat">
                <div style="text-transform: capitalize">{{ stat }}:</div>
                <div style="color: rgb(245, 221, 66)">
                  <b-icon v-for="x in 5" :key="'offense' + x" :icon="value > x? 'star-fill': (value + 1 - x > 0? 'star-half': 'star')" style="margin-right: 5px" />
                </div>
              </div>
            </b-card>
          </div>
          <div v-if="this.pokemon.evolutions.length > 1" class="evolutions-container" :style="{'grid-template-columns': '1fr '.repeat((this.pokemon.evolutions.length || 1)*3 -1)}">
            <template v-for="(evol, idx) in this.pokemon.evolutions">
              <div class="evolution" :key="evol.name" v-if="pokemon.evolutions.length > 1">
                <div :class="'circle ' + pokemon.types[0]">
                  <b-img center :src="imageUrl + evol.id + '.png'" width="70px" height="70px" />   
                </div>
                <div class="text-center evolution-text">{{evol.name}}</div>
              </div>
              <div class="text-center" :key="evol.name + 'level'" v-if="idx < evolutions.length" style="margin-bottom: 50px"> 
                <div>Lvl. {{ evolutions[idx] }}</div>
                <div>
                  <b-icon icon="arrow-right-square-fill" />
                </div>
              </div>
            </template>
          </div>
          <b-card :header-class="pokemon.types[0]">
            <template v-slot:header>
              <div style="">
                <b-icon icon="gear" /> Ability: {{ ability.name }}
              </div>
            </template>
            {{ ability.description }}
          </b-card>
          <b-card :style="evolutions.length < 1? {'grid-row':'1 / span 2','grid-column':'3','margin':'75px 0'}: {}" :header-class="pokemon.types[0]">
            <template v-slot:header>
              <div style="">
                <b-icon icon="star-fill" /> Unite Move: {{ uniteMove.name }}
              </div>
            </template>
            {{ uniteMove.description }}
          </b-card>
        </div>
        <div class="moves">
          <template v-for="(move, idx) in this.moves">
            <b-card :key="'move' + idx" :header-class="move.move.type">
              <template v-slot:header>
                <div style="">
                  <b-img 
                    width="30px" 
                    height="30px" 
                    :src="`https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/img/${move.move.type}.webp`" 
                  /> 
                  {{ move.move.name }}
                </div>
              </template>
              {{ move.description }}
            </b-card>
            <div :key="'arrow' + idx" style="font-size:20px; margin-top:70px" class="text-center align-middle">
              <b-icon icon="arrow-right-square-fill" />
            </div>
            <template v-for="(option, oidx) in move.options">
              <b-card :key="'move-option-' + idx + '-' + oidx" :header-class="option.move.type">
                <template v-slot:header>
                  <div style="">
                    <b-img 
                      width="30px" 
                      height="30px" 
                      :src="`https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/img/${option.move.type}.webp`" 
                    /> 
                    {{ option.move.name }}
                  </div>
                </template>
                {{ option.description }}
              </b-card>
              <div :key="'or-' + idx + '-' + oidx" v-if="oidx + 1 != move.options.length" style="font-size:20px; margin-top:70px">OR</div>
            </template>
          </template>
        </div>
      </div>
      <b-container id="designer">
        <b-form @submit="previewDesign">
          <div>
            <h5>Pokemon</h5>
            <b-form-select
              v-model="pokemon.id"
              :options="pokemonOptions"
              required
              @change="onPokemonSelect"
              value="0"
            >
              <template #first>
                <b-form-select-option value="0" disabled>Choose a pokemon</b-form-select-option>
              </template>
            </b-form-select>
          </div>
          <div v-if="pokemon.id != 0">
            <div>
              <h5>Archetype</h5>
              <b-form-select
                v-model="archetype"
                :options="archetypeOptions"
                required
                value=""
              >
                <template #first>
                  <b-form-select-option value="" disabled>Choose an archetype</b-form-select-option>
                </template>
              </b-form-select>
            </div>
            <div v-if="pokemon.evolutions.length > 2">
              <h5>Evolutions</h5>
              <b-form-select
                v-model="evolutions"
                placeholder="Choose evolution levels"
                :options="evolutionOptions"
                required
                :value="evolutions"
              ></b-form-select>
            </div>
            <hr>
            <div v-for="(value, stat) in stats" :key="stat + 'picker'">
              <h5 style="text-transform: capitalize">{{stat}} Rating</h5>
              <b-form-select
                v-model="$data.stats[stat]"
                :options="[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]"
                required
                :value="value"
              ></b-form-select>
            </div>
            <hr>
            <div>
              <h5>Basic attack description</h5>
              <b-form-textarea
                v-model="basicDescription"
                placeholder="Basic Attack description goes here..."
                no-resize
                maxlength="280"
              ></b-form-textarea>
            </div>
            <hr>
            <div>
              <h5>Ability</h5>
              <b-form-select
                v-model="ability.name"
                placeholder="Choose an ability"
                :options="pokemon.abilities"
                required
                :value="ability.name"
              ></b-form-select>
            </div>
            <div>
              <h5>Ability description</h5>
              <b-form-textarea
                v-model="ability.description"
                placeholder="Ability description goes here..."
                no-resize
                maxlength="280"
              ></b-form-textarea>
            </div>
            <hr>
            <template v-for="(move, index) in moves">
              <div :key="`move${index}select`">
                <h5>Move {{ index  + 1 }}</h5>
                <b-form-select
                  v-model="move.move"
                  placeholder="Choose an ability"
                  :options="pokemon.moves"
                  required
                  :value="{name: '', type: ''}"
                >
                  <template #first>
                    <b-form-select-option :value="{name: '', type: ''}" disabled>Choose a move</b-form-select-option>
                  </template>
                </b-form-select>
              </div>
              <div :key="`move${index}description`">
                <h5>Move {{ index  + 1 }} description</h5>
                <b-form-textarea
                  v-model="move.description"
                  placeholder="Move description goes here..."
                  no-resize
                  maxlength="280"
                ></b-form-textarea>
                <hr>
              </div>
              <template v-for="(move, oidx) in move.options">
                <div :key="`move${index}option${oidx}select`">
                  <h5>Move {{ index  + 1 }} option {{ oidx + 1 }}</h5>
                  <b-form-select
                    v-model="move.move"
                    placeholder="Choose an ability"
                    :options="pokemon.moves"
                    required
                    :value="{name: '', type: ''}"
                  >
                    <template #first>
                      <b-form-select-option :value="{name: '', type: ''}" disabled>Choose a move</b-form-select-option>
                    </template>
                  </b-form-select>
                </div>
                <div :key="`move${index}option${oidx}description`">
                  <h5>Move {{ index  + 1 }} option {{ oidx + 1 }} description</h5>
                  <b-form-textarea
                    v-model="move.description"
                    placeholder="Move description goes here..."
                    no-resize
                    maxlength="280"
                  ></b-form-textarea>
                  <hr>
                </div>
              </template>
            </template>
            <div>
              <h5>Unite move name</h5>
              <b-form-textarea
                v-model="uniteMove.name"
                placeholder="Unite move name..."
                no-resize
                maxlength="25"
                style="height: 20px"
              ></b-form-textarea>
            </div>
            <div>
              <h5>Unite move description</h5>
              <b-form-textarea
                v-model="uniteMove.description"
                placeholder="Unite move description..."
                no-resize
                maxlength="280"
              ></b-form-textarea>
            </div>
          </div>
          <hr>
          <div style="float: right; padding-bottom: 10px">
            <b-button type="submit" variant="primary">Generate</b-button>
          </div>
        </b-form>
      </b-container>
    </div>
    <b-modal id="preview" centered size="lg" title="Build Preview" @ok="downloadDesign" ok-title="Download" cancel-title="Close">
        <img id="buildImg" style="width:100%; height:100%">
      </b-modal>
    <footer style="height: 60px; background: rgb(82, 44, 166); margin-bottom: -60px;"></footer>
  </div>
</template>

<script>
const axios = require('axios')
const html2canvas = require('html2canvas')

export default {
  name: 'App',
  data: () => { 
    return {
      archetypeOptions: ['Attacker', 'Speedster', 'Defender', 'Support', 'All-rounder'].reduce(
        (x, y) => {
          return x.concat(['Melee', 'Ranged'].map(
            (z) => {
              return { value: `${z} / ${y}`, text: `${z} / ${y}` } 
            }
          )) 
        }, []
      ),
      evolutionOptions: [
        { text: 'Lvl 4 / Lvl 8', value: [4, 8] },
        { text: 'Lvl 4 / Lvl 9', value: [4, 9] },
        { text: 'Lvl 5 / Lvl 7', value: [5, 7] },
        { text: 'Lvl 5 / Lvl 8', value: [5, 8] },
        { text: 'Lvl 5 / Lvl 9', value: [5, 9] },
        { text: 'Lvl 6 / Lvl 10', value: [6, 10] },
      ],
      pokemonOptions: [],
      imageUrl: 'https://cdn.statically.io/gh/PokeAPI/sprites/master/sprites/pokemon/other/home/',
      pokemon: {
        id: 0,
        name: '',
        types: ['', ''],
        abilities: [],
        evolutions: [],
      }, 
      evolutions: [],
      ability: {
        name: '',
        description: '',
      },
      uniteMove: {
        name: '',
        description: '',
      },
      archetype: '',
      basicDescription: '',
      moves: [{
        move: {
          name: '',
          type: '',
        },
        description: '',
        options: [{
          move: {
            name: '',
            type: '',
          },
          description: '',
        }, {
          move: {
            name: '',
            type: '',
          },
          description: '',
        }]
      }, {
        move: {
          name: '',
          type: '',
        },
        description: '',
        options: [{
          move: {
            name: '',
            type: '',
          },
          description: '',
        }, {
          move: {
            name: '',
            type: '',
          },
          description: '',
        }]
      }],
      stats: {
        offense: 3,
        endurance: 3,
        mobility: 3,
        scoring: 3,
        support: 3,
      },
    } 
  },
  created() {
    axios.get('https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/data/all-pokemon.json').then((resp) => {
      this.pokemonOptions = resp.data.map((pkmn) => {
        return {
          value: pkmn.id,
          text: pkmn.name,
        }
      })
    })
  },
  methods: {
    previewDesign(e) {
      e.preventDefault()
      e.stopPropagation()
      this.$bvModal.show('preview')
      html2canvas(document.getElementById('design'), { 
        useCORS: true, 
        logging : true, 
        width: 1300, 
        height: 1000, 
        windowWidth: 1300,
        windowHeight: 1000,
        scale: 4,
        onclone: (document) => {
          document.getElementById('design').style.display = 'block'
          if (window.innerWidth < 400) {
            document.querySelector('.title').style.marginTop = '-120px'  
          }
        },
      }).then((canvas) => {
        document.getElementById('buildImg').src = canvas.toDataURL('image/jpeg')
        
      })
    },
    downloadDesign() {
      let a = document.createElement('a')
      a.href = document.getElementById('buildImg').src.replace('image/jpeg', 'image/octet-stream')
      a.download = `${this.pokemon.name}-build.jpg`
      a.click()
      a.remove()
    },
    onPokemonSelect() {
      axios.get(`https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/data/pokemon/${this.pokemon.id}.json`).then((resp) => {
        resp.data.abilities = resp.data.abilities.map((ab) => { return { value: ab, text: ab }})
        resp.data.moves = resp.data.moves.map((mv) => { return { value: mv, text: mv.name }})
        this.pokemon = resp.data
        this.archetype = ''
        this.evolutions = [4, 8].slice(0, this.pokemon.evolutions.length -1)
        this.ability.name = this.pokemon.abilities[0].value
        this.ability.description = ''
        this.moves.forEach((mv) => {
          mv.move.name = ''
          mv.move.type = ''
          mv.description = ''
          mv.options.forEach((opt) => {
            opt.move.name = ''
            opt.move.type = ''
            opt.description = ''
          })
        })
        this.stats = {
          offense: 3,
          endurance: 3,
          mobility: 3,
          scoring: 3,
          support: 3,
        }
        this.$refs.design.querySelectorAll("img").forEach((img) => {
          img.onerror = () => {
            if (img.src.match(/other\/official-artwork\//)) {
              this.$refs.design.querySelectorAll("img").forEach((img) => {
                if (img.src.match(/other\/official-artwork\//)) {
                  img.src = img.src.replace('other/home/', '')
                }
              })
            }
            this.onerror = () => {}
          }
        })
      })
    }
  }
}
</script>

<style>

body {
  font-weight: 600 !important;
  font-family: 'Exo 2' !important;
}

.profile-image {
  width: 200px;
  height:200px;
  margin-top: 10px;
  display: inline-block;
  background: white;
  padding-top:5px;
}

.card-header {
  background: rgb(155, 161, 167) !important;
  font-size: 20px !important;
  color: white;
  padding: 8px 12px !important;
}

.card-body {
  font-size: 12px !important;
  padding: 8px 12px !important;
}

.circle {
  border-radius: 50%;
  border: 3px solid black;
  text-align: center;
  box-shadow: 0 3px 9px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.24);
}

.type-btn {
  width: 90px;
  margin-right: 30px;
  opacity: 100% !important;
  border: 3px solid black !important;
  box-shadow: 0 3px 9px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.24);
}

.archetype-btn {
  width: 190px;
  opacity: 100% !important;
  border: 3px solid black !important;
  box-shadow: 0 3px 9px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.24);
}

.white {
  background: white !important;
}

.defender {
  background: rgb(144, 190, 83) !important;
}

.attacker {
  background: rgb(201, 93, 54) !important;
}

.speedster {
  background: rgb(52, 137, 192) !important;
}

.support {
  background: rgb(222, 176, 80) !important;
}

.all-rounder {
  background: rgb(82, 44, 166) !important;
}

.none {
  background: rgb(199, 199, 199) !important;
}

.normal {
  background: rgb(157, 157, 114) !important;
  color: white !important;
}

.fighting {
  background: rgb(174, 54, 42) !important;
  color: white !important;
}

.flying {
  background: rgb(153, 137, 231) !important;
  color: white !important;
}

.poison {
  background: rgb(141, 65, 145) !important;
  color: white !important;
}

.ground {
  background: rgb(217, 184, 105) !important;
  color: white !important;
}

.rock {
  background: rgb(174, 149, 65) !important;
  color: white !important;
}

.bug {
  background: rgb(162, 173, 57) !important;
  color: white !important;
}

.ghost {
  background: rgb(97, 81, 137) !important;
  color: white !important;
}

.steel {
  background: rgb(175, 176, 200) !important;
  color: white !important;
}

.fire {
  background: rgb(228, 122, 58) !important;
  color: white !important;
}

.water {
  background: rgb(95, 135, 230) !important;
  color: white !important;
}

.grass {
  background: rgb(123, 188, 85) !important;
  color: white !important;
}

.electric {
  background: rgb(244, 201, 72) !important;
  color: white !important;
}

.psychic {
  background: rgb(233, 91, 125) !important;
  color: white !important;
}

.ice {
  background: rgb(151, 208, 210) !important;
  color: white !important;
}

.dragon {
  background: rgb(91, 63, 237) !important;
  color: white !important;
}

.dark {
  background: rgb(99, 79, 65) !important;
  color: white !important;
}

.fairy {
  background: rgb(226, 147, 162) !important;
  color: white !important;
}

.banner {
  height: 140px;
  border-bottom: 3px solid black;
  padding-top: 25px;
  padding-left: 40px;
}

.title {
  display: inline-block;
  padding-left: 25px;
  color: white;
  font-size: 80px;
  vertical-align: top;
  text-transform:capitalize;
  width: 1000px;
}

.card {
  border-radius: 16px !important;
  border-color: black !important;
  border-width: 3px !important;
  box-shadow: 0 3px 9px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.24);
}

.card-header {
  border-color: black !important;
  border-radius: 12px 12px 0 0 !important;
  font-size: 20px;
  border-width: 3px !important;
}

.btn-container {
  padding-top: 15px;
  padding-left: 265px;
  display: inline-block;
  width: 900px;
  vertical-align: top;
}

.stats-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px; 
  grid-row: span 2;
}

.stat {
  font-size: 20px;
  display:grid;
  grid-template-columns: 120px 1fr;
}

#design {
  height: 1000px;
  width: 1300px;
  opacity: 1.0;
  background: rgb(238, 236, 236);
  display: none;
}

.evolutions-container {
  margin-top: 10px;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  display: inline-grid;
  font-size:20px;
  height: 160px;
}

.evolution {
  grid-column: span 2;
  margin-top: 10px;
}

.evolution-text {
  text-transform: capitalize;
  height:60px;
  margin-top:10px;
  line-height: 20px;
}

.evolution > .circle {
  width: 80px;
  height: 80px;
  margin-left: calc(50% - 40px);
}

.info-grid {
  margin-top: 60px; 
  display: grid; 
  width: 100%; 
  grid-template-rows: 145px 145px; 
  grid-template-columns: 450px 280px 450px; 
  gap: 30px 20px; 
  padding-left: 40px; 
  padding-right:40px;
}

.moves {
  display: grid;
  margin: 30px 40px;
  gap: 30px 7px;
  grid-template-columns: 1fr 24px 1fr 24px 1fr;
  grid-template-rows: 160px 160px;
}

#designer {
  font-size: 20px !important;
  max-width: 800px;
}

#designer select {
  width: 100%;
}

#designer h5 {
  margin-top: 10px;
}

#designer textarea {
  height: 80px;
}

#app {
  height: 100%;
}

#content {
  height: calc(100% - 120px);
  padding: 10px;
  padding-bottom: 30px;
  overflow: scroll;
}

html, body {
  height: 100%;
}
</style>
