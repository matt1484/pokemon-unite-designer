<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      style="font-weight: 600; font-size: 24px; color: white"
    >
      Pokemon Unite Designer
    </v-app-bar>
    <v-main>
      <v-container class="mt-5" style="max-width: 600px;">
        <v-row dense>
          <v-col>
            <v-autocomplete label="Pokemon" :items="pokemonOptions" v-model="pokemon.id" dense outlined @change="onPokemonSelect" />
          </v-col>
        </v-row>
        <div v-if="pokemon.id">
          <v-row dense>
            <v-col>
              <v-select label="Attack Type" :items="attackTypes" v-model="attackType" dense outlined />
            </v-col>
            <v-col>
              <v-select label="Range" :items="rangeTypes" v-model="range" dense outlined />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-select label="Role" :items="roleTypes" v-model="role" dense outlined />
            </v-col>
            <v-col>
              <v-select label="Difficulty" :items="difficultyOptions" v-model="difficulty" dense outlined />
            </v-col>
          </v-row>
          <v-row dense v-if="pokemon.evolutions.length === 3">
            <v-col>
              <v-select label="Evolutions" :items="evolutionOptions" v-model="evolutions" dense outlined />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
          <v-row v-for="stat in Object.keys(stats)" :key="stat" dense>
            <v-col class="pt-3">{{stat[0].toUpperCase()}}{{stat.substring(1)}}</v-col>
            <v-col>
              <v-rating v-model="stats[stat]" half-increments hover />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
          <v-row>
            <v-col>
              <v-textarea label="Basic Attack Description" v-model="basicDescription" dense outlined no-resize :counter="280" maxlength="280" />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
          <v-row dense>
            <v-col>
              <v-combobox label="Ability Name" :items="pokemon.abilities" v-model="ability.name" dense no-resize outlined :counter="50" maxlength="50" />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-textarea label="Ability Description" v-model="ability.description" dense no-resize outlined :counter="280" maxlength="280" />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
          <template v-for="(m, index) in moves">
            <v-row dense :key="`move-${index}-name`">
              <v-col cols="8">
                <v-autocomplete :label="`Move ${index + 1}`" :items="pokemon.moves" outlined dense v-model="m.move" />
              </v-col>
              <v-col> 
                <v-text-field :label="`Cooldown`" type="number" min="1" step="1" outlined dense v-model="m.cooldown" />
              </v-col>
            </v-row>
            <v-row dense :key="`move-${index}-tags`">
              <v-col> 
                <v-select :label="`Move ${index + 1} Tags`" :items="moveTags" multiple outlined dense v-model="m.tags" />
              </v-col>
            </v-row>
            <v-row dense :key="`move-${index}-desc`">
              <v-col>
                <v-textarea :label="`Move ${index + 1} Description`" v-model="m.description" dense no-resize outlined :counter="280" maxlength="280" />
              </v-col>
            </v-row>
            <template v-for="(o, i) in m.options">
              <v-row dense :key="`move-${index}-option-${i}-name`">
                <v-col cols="8">
                  <v-autocomplete :label="`Move ${index+1} Option ${i+1}`" :items="pokemon.moves" outlined dense v-model="o.move" />
                </v-col>
                <v-col> 
                  <v-text-field :label="`Cooldown`" type="number" min="1" step="1" outlined dense v-model="o.cooldown" />
                </v-col>
              </v-row>
              <v-row dense :key="`move-${index}-option-${i}-tags`">
                <v-col> 
                  <v-select :label="`Move ${index + 1} Option ${i+1} Tags`" :items="moveTags" multiple outlined dense v-model="o.tags" />
                </v-col>
              </v-row>
              <v-row dense :key="`move-${index}-option-${i}-desc`">
                <v-col>
                  <v-textarea :label="`Move ${index+1} Option ${i+1} Description`" v-model="o.description" dense no-resize outlined :counter="280" maxlength="280" />
                </v-col>
              </v-row>
            </template>
            <v-divider class="my-3" :key="`move-${index}-divider`" />
          </template>
          <v-row dense>
            <v-col>
              <v-text-field label="Unite Move" v-model="uniteMove.name" dense no-resize outlined :counter="50" maxlength="50" />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-textarea label="Unite Move Description" v-model="uniteMove.description" dense no-resize outlined :counter="280" maxlength="280" />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
          <v-row dense>
            <v-col></v-col>
            <v-col cols="auto">
              <v-dialog v-model="dialogOpen">
                <template #activator="{ on, attrs }">
                  <v-btn color="primary" @click="buildDesign" v-bind="attrs" v-on="on" small>Generate</v-btn>
                </template>
                <v-card>
                  <div class="px-16 py-8">
                    <v-row dense>
                      <v-spacer />
                      <v-col>
                        <div style="width: 60vw; height: 33.75vw">
                          <v-img v-if="builtImage" contain eager :src="builtImage" />
                          <v-row v-else>
                            <v-spacer />
                            <v-col cols="auto">
                              <v-progress-circular size="200" width="15" indeterminate color="primary" />
                            </v-col>
                            <v-spacer />
                          </v-row>
                        </div>
                      </v-col>
                      <v-spacer />
                    </v-row>
                    <v-row dense><v-col><v-divider /></v-col></v-row>
                    <v-row dense>
                      <v-spacer />
                      <v-col cols="auto">
                        <v-btn @click="dialogOpen = false; builtImage = ''" small>Cancel</v-btn>
                      </v-col>
                      <v-col cols="auto">
                        <a :href="builtImage.replace('image/jpeg', 'image/octet-stream')" :download="`${pokemon.name}.jpg`">
                          <v-btn color="primary" small>
                            <v-icon>{{icons.mdiDownload}}</v-icon> Download
                          </v-btn>
                        </a>
                      </v-col>
                    </v-row>
                  </div>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
    <div id="design" ref="design" class="full-width full-height" style="background-image: url('https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/img/background.png'); background-size: 1650px 900px;">
      <div class="full-width ma-5">
        <v-row dense>
          <v-col cols="4">
            <v-row>
              <v-col>
                <v-toolbar color="primary" dense shaped class="mb-2">
                  <h1 style="color: white; width: 100% !important" class="text-center">{{pokemon.name}}</h1>
                </v-toolbar>
              </v-col>
            </v-row>
            <v-row no-gutters dense>
              <v-col></v-col>
              <v-col cols="auto">
                <div class="character-card-border mt-0 pa-1 elevation-4">
                  <div :class="`character-card ${role.toLowerCase()}`">
                    <v-img :src="`${imageUrl}${pokemon.id}.png`" eager contain style="filter: drop-shadow(-15px 15px 2px black); margin: auto;" max-height="100%" max-width="100%" width="100%" height="100%"></v-img>
                  </div>
                  <div class="character-card-footer">
                    <v-row dense no-gutters>
                      <v-col cols="3">
                        <div class="elevation-1" style="height:25px; width: 5px; background: linear-gradient(rgb(116, 115, 115), rgb(200, 200, 200)); margin-top: 6px; margin-left: 6px; border-radius: 4px;"></div>
                      </v-col>
                      <v-col cols="8">
                        <div style="border: solid rgb(240, 240, 240); border-width: 0px 6px 6px 6px; width: 92px; margin-left: 14px;">
                          <div :class="`character-card-circle ${role.toLowerCase()} elevation-2`"></div>
                        </div>
                      </v-col>
                    </v-row>
                    <div style="height: 6px; background: rgb(116, 115, 115); width: 100px; margin-left: 67px; margin-top: 2px; border-radius: 6px 6px 0 0 "></div>
                  </div>
                </div>
              </v-col>
              <v-col></v-col>
            </v-row>
            <v-row dense class="mt-5">
              <v-col cols="auto">
                <v-chip color="primary" label>
                  <div class="text-center" style="color:white; width: 100px; font-size: 14px">{{attackType}}</div>
                </v-chip>
              </v-col>
              <v-col></v-col>
              <v-col cols="auto">
                <v-chip color="primary" label>
                  <div class="text-center" style="color:white; width: 100px; font-size: 14px">{{range}}</div>
                </v-chip>
              </v-col>
              <v-col></v-col>
              <v-col  cols="auto">
                <v-chip color="primary" label>
                  <div class="text-center" style="color:white; width: 100px; font-size: 14px">{{role}}</div>
                </v-chip>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col></v-col>
              <v-col cols="auto">
                <v-chip color="primary" label>
                  <div class="text-center" style="color:white; width: 150px; font-size: 14px">Difficulty: {{difficulty}}</div>
                </v-chip>
              </v-col>
              <v-col></v-col>
            </v-row>
            <v-row dense no-gutters class="mt-5">
              <v-col></v-col>
              <template v-for="(evo, index) in pokemon.evolutions">
                <v-col cols="auto" v-if="index > 0" :key="`evolution-${index}-divider`">
                  <v-icon color="primary" style="margin-top: 35px">{{icons.mdiChevronRightCircle}}</v-icon>
                </v-col>
                <v-col cols="auto" :key="`evolution-${index}-img`">
                  <div style="background-image: url('https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/img/level.png'); background-size: contain; position: relative; height: 134px;" class="fill-width">
                    <img :src="`${imageUrl}${evo.id}.png`" contain style="padding-left:10%; max-width: 110px" />
                    <div style="position: absolute; bottom: 0; padding-left: 60px; padding-bottom: 17px; color: white; font-size: 12px; font-weight: 800" >
                      {{evolutions[index]}}
                    </div>
                  </div>
                </v-col>
              </template>
              <v-col></v-col>
            </v-row>
            <v-card shaped class="pl-8">
              <v-row v-for="stat in Object.keys(stats)" :key="stat" dense no-gutters>
                <v-col class="pt-3">{{stat[0].toUpperCase()}}{{stat.substring(1)}}</v-col>
                <v-col>
                  <v-rating v-model="stats[stat]" half-increments color="yellow" disabled />
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="auto">
            <v-divider vertical class="ml-5 mr-4" color="black" />
          </v-col>
          <v-col style="width: 1000px !important">
            <v-row dense class="mb-2" style="max-width: 1000px !important">
              <v-col>
                <v-card outlined shaped elevation="2">
                  <v-toolbar shaped color="primary" style="color: white; border-bottom-right-radius: 0" elevation="1" dense>
                    <v-avatar color="white" size="32" class="mr-2">
                      <v-icon>{{icons.mdiHexagonMultiple}}</v-icon>
                    </v-avatar>
                    <h3 style="padding: none !important">Ability: {{ability.name.value || ability.name}}</h3>
                  </v-toolbar>
                  <div style="height: 3em; font-size: 14px; line-height: 15px" class="pa-2">
                    {{ability.description}}
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col style="max-width: 495px !important">
                <v-card class="mr-3" outlined shaped elevation="2">
                  <v-toolbar shaped :class="moves[0].move.type" style="color: white; border-bottom-right-radius: 0" elevation="1" dense>
                    <v-avatar color="white" size="32" class="mr-2">
                      <img v-if="moves[0].move.type" :src="`https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/img/${moves[0].move.type}.webp`" />
                    </v-avatar>
                    <div style="margin-top: -8px">
                      <h3 style="padding: none !important">{{moves[0].move.name}}</h3>
                      <div style="height: 20px; margin-top: -8px; margin-bottom: 4px !important">
                        <v-chip color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon small class="pb-1">{{icons.mdiTimerOutline}}</v-icon>
                            {{moves[0].cooldown}}s
                          </div>
                        </v-chip>
                        <v-chip v-if="moves[0].tags.includes('Area')" color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon x-small class="pb-1">{{icons.mdiArrowExpandAll}}</v-icon>
                            Area
                          </div>
                        </v-chip>
                        <v-chip v-if="moves[0].tags.includes('Buff')" color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon x-small class="pb-1">{{icons.mdiChevronDoubleUp}}</v-icon>
                            Buff
                          </div>
                        </v-chip>
                        <v-chip v-if="moves[0].tags.includes('Debuff')" color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon small class="pb-1">{{icons.mdiChevronDoubleDown}}</v-icon>
                            Debuff
                          </div>
                        </v-chip>
                        <v-chip v-if="moves[0].tags.includes('Dash')" color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon small class="pb-1">{{icons.mdiShare}}</v-icon>
                            Dash
                          </div>
                        </v-chip>
                        <v-chip v-if="moves[0].tags.includes('Hindrance')" color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon small class="pb-1">{{icons.mdiLinkVariant}}</v-icon>
                            Hindrance
                          </div>
                        </v-chip>
                        <v-chip v-if="moves[0].tags.includes('Recovery')" color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon small class="pb-1">{{icons.mdiBottleTonicPlusOutline}}</v-icon>
                            Recovery
                          </div>
                        </v-chip>
                        <v-chip v-if="moves[0].tags.includes('Sure Hit')" color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon small class="pb-1">{{icons.mdiTarget}}</v-icon>
                            Sure Hit
                          </div>
                        </v-chip>
                      </div>
                    </div>
                  </v-toolbar>
                  <div style="height: 7em; font-size: 14px !important; line-height: 15px" class="pa-2">
                    {{moves[0].description}}
                  </div>
                </v-card>
              </v-col>
              <v-col style="max-width: 495px !important">
                <v-card class="ml-3" outlined shaped elevation="2">
                  <v-toolbar shaped color="primary" style="color: white; border-bottom-right-radius: 0" elevation="1" dense>
                    <v-avatar color="white" size="32" class="mr-2">
                      <v-icon>
                        {{icons.mdiOctagramOutline}}
                      </v-icon>
                    </v-avatar>
                    <h3 style="padding: none !important">Basic Attack</h3>
                  </v-toolbar>
                  <div style="height: 7em; font-size: 14px !important; line-height: 15px" class="pa-2">
                    {{basicDescription}}
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col></v-col>
              <v-col cols="auto">
                <v-avatar size="30" color="primary">
                  <v-icon class="text-center" style="color: white">{{icons.mdiChevronDoubleDown}}</v-icon>
                </v-avatar>
              </v-col>
              <v-col></v-col>
              <v-col cols="auto">
                <v-avatar size="30" color="primary">
                  <v-icon class="text-center" style="color: white">{{icons.mdiChevronDoubleDown}}</v-icon>
                </v-avatar>
              </v-col>
              <v-col></v-col>
              <v-col cols="auto">
                <v-avatar size="30" color="primary">
                  <v-icon class="text-center" style="color: white">{{icons.mdiChevronDoubleDown}}</v-icon>
                </v-avatar>
              </v-col>
              <v-col></v-col>
              <v-col cols="6" class="ml-3"></v-col>
            </v-row>
            <v-row dense>
              <v-col style="max-width: 1000px !important">
                <v-card outlined shaped elevation="2" class="mr-2">
                  <v-toolbar shaped :class="moves[0].options[0].move.type + ' option-toolbar'" style="color: white; border-bottom-right-radius: 0; max-width: 1000px !important" elevation="1" dense>
                    <v-row dense class="fill-height pl-0" style="max-width: 1000px !important">
                      <template v-for="(option, index) in moves[0].options">
                        <v-col cols="auto" v-if="index > 0" class="pa-0 ma-0" :key="`move-0-option-${index}-tool-divider`" style="width: 1px !important; background: black !important;">
                        </v-col>
                        <v-col :key="`move-0-option-${index}-tool`" :class="`v-toolbar__content ma-0 pa-0  ${option.move.type}`">
                          <v-avatar color="white" size="32" class="mr-2">
                            <img v-if="option.move.type" :src="`https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/img/${option.move.type}.webp`" />
                          </v-avatar>
                          <div style="margin-top: -8px">
                            <h3 style="padding: none !important">{{option.move.name}}</h3>
                            <div style="height: 20px; margin-top: -8px; margin-bottom: 4px !important">
                              <v-chip color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiTimerOutline}}</v-icon>
                                  {{option.cooldown}}s
                                </div>
                              </v-chip>
                              <v-chip v-if="option.tags.includes('Area')" color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiArrowExpandAll}}</v-icon>
                                  Area
                                </div>
                              </v-chip>
                              <v-chip v-if="option.tags.includes('Buff')" color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiChevronDoubleUp}}</v-icon>
                                  Buff
                                </div>
                              </v-chip>
                              <v-chip v-if="option.tags.includes('Debuff')" color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiChevronDoubleDown}}</v-icon>
                                  Debuff
                                </div>
                              </v-chip>
                              <v-chip v-if="option.tags.includes('Dash')" color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiShare}}</v-icon>
                                  Dash
                                </div>
                              </v-chip>
                              <v-chip v-if="option.tags.includes('Hindrance')" color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiLinkVariant}}</v-icon>
                                  Hindrance
                                </div>
                              </v-chip>
                              <v-chip v-if="option.tags.includes('Recovery')" color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiBottleTonicPlusOutline}}</v-icon>
                                  Recovery
                                </div>
                              </v-chip>
                              <v-chip v-if="option.tags.includes('Sure Hit')" color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiTarget}}</v-icon>
                                  Sure Hit
                                </div>
                              </v-chip>
                            </div>
                          </div>
                        </v-col>
                      </template>
                    </v-row>
                  </v-toolbar>
                  <v-row class="full-width pl-3" style="max-width: 994px !important">
                    <template v-for="(option, index) in moves[0].options">
                      <!-- <v-col cols="auto" v-if="index > 0" class="pa-0 ma-0" :key="`move-0-option-${index}-desc-divider`" style="width: 1px !important; background: black !important;">
                      </v-col> -->
                      <v-col :key="`move-0-option-${index}-description`" :style="index > 0? {borderLeft: '1px solid black !important'}: {}" class="mb-3">
                        <div style="height: 7em; font-size: 14px !important; line-height: 15px" class="">
                          {{option.description}}
                        </div>
                      </v-col>
                    </template>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            <v-divider class="my-5" color="black"></v-divider>
            <v-row dense>
              <v-col style="max-width: 495px !important">
                <v-card outlined shaped elevation="2" class="mr-3">
                  <v-toolbar shaped :class="moves[1].move.type" style="color: white; border-bottom-right-radius: 0" elevation="1" dense>
                    <v-avatar color="white" size="32" class="mr-2">
                      <img v-if="moves[1].move.type" :src="`https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/img/${moves[1].move.type}.webp`" />
                    </v-avatar>
                    <div style="margin-top: -8px">
                      <h3 style="padding: none !important">{{moves[1].move.name}}</h3>
                      <div style="height: 20px; margin-top: -8px; margin-bottom: 4px !important">
                        <v-chip color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon small class="pb-1">{{icons.mdiTimerOutline}}</v-icon>
                            {{moves[1].cooldown}}s
                          </div>
                        </v-chip>
                        <v-chip v-if="moves[1].tags.includes('Area')" color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon small class="pb-1">{{icons.mdiArrowExpandAll}}</v-icon>
                            Area
                          </div>
                        </v-chip>
                        <v-chip v-if="moves[1].tags.includes('Buff')" color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon small class="pb-1">{{icons.mdiChevronDoubleUp}}</v-icon>
                            Buff
                          </div>
                        </v-chip>
                        <v-chip v-if="moves[1].tags.includes('Debuff')" color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon small class="pb-1">{{icons.mdiChevronDoubleDown}}</v-icon>
                            Debuff
                          </div>
                        </v-chip>
                        <v-chip v-if="moves[1].tags.includes('Dash')" color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon small class="pb-1">{{icons.mdiShare}}</v-icon>
                            Dash
                          </div>
                        </v-chip>
                        <v-chip v-if="moves[1].tags.includes('Hindrance')" color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon small class="pb-1">{{icons.mdiLinkVariant}}</v-icon>
                            Hindrance
                          </div>
                        </v-chip>
                        <v-chip v-if="moves[1].tags.includes('Recovery')" color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon small class="pb-1">{{icons.mdiBottleTonicPlusOutline}}</v-icon>
                            Recovery
                          </div>
                        </v-chip>
                        <v-chip v-if="moves[1].tags.includes('Sure Hit')" color="primary" class="mr-2" label x-small style="height: 20px">
                          <div style="font-size: 14px !important">
                            <v-icon small class="pb-1">{{icons.mdiTarget}}</v-icon>
                            Sure Hit
                          </div>
                        </v-chip>
                      </div>
                    </div>
                  </v-toolbar>
                  <div style="height: 7em; font-size: 14px !important; line-height: 15px" class="pa-2">
                    {{moves[1].description}}
                  </div>
                </v-card>
              </v-col>
              <v-col style="max-width: 495px !important">
                <v-card outlined shaped elevation="2" class="ml-3">
                  <v-toolbar shaped color="primary" style="color: white; border-bottom-right-radius: 0" elevation="1" dense>
                    <v-avatar color="white" size="32" class="mr-2">
                      <v-icon>
                        {{icons.mdiBrightness7}}
                      </v-icon>
                    </v-avatar>
                    <h3 style="padding: none !important">Unite Move: {{uniteMove.name}}</h3>
                  </v-toolbar>
                  <div style="height: 7em; font-size: 14px !important; line-height: 15px" class="pa-2">
                    {{uniteMove.description}}
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col></v-col>
              <v-col cols="auto">
                <v-avatar size="30" color="primary">
                  <v-icon class="text-center" style="color: white">{{icons.mdiChevronDoubleDown}}</v-icon>
                </v-avatar>
              </v-col>
              <v-col></v-col>
              <v-col cols="auto">
                <v-avatar size="30" color="primary">
                  <v-icon class="text-center" style="color: white">{{icons.mdiChevronDoubleDown}}</v-icon>
                </v-avatar>
              </v-col>
              <v-col></v-col>
              <v-col cols="auto">
                <v-avatar size="30" color="primary">
                  <v-icon class="text-center" style="color: white">{{icons.mdiChevronDoubleDown}}</v-icon>
                </v-avatar>
              </v-col>
              <v-col></v-col>
              <v-col cols="6" class="ml-3"></v-col>
            </v-row>
            <v-row dense>
              <v-col style="max-width: 1000px !important">
                <v-card outlined shaped elevation="2" class="mr-2">
                  <v-toolbar shaped :class="moves[1].options[0].move.type + ' option-toolbar'" style="color: white; border-bottom-right-radius: 0; max-width: 1000px !important" elevation="1" dense>
                    <v-row dense class="fill-height pl-0" style="max-width: 1000px !important">
                      <template v-for="(option, index) in moves[1].options">
                        <v-col cols="auto" v-if="index > 0" class="pa-0 ma-0" :key="`move-1-option-${index}-tool-divider`" style="width: 1px !important; background: black !important">
                          <!-- <v-avatar color="primary" size="24" style="margin-left: -12px; margin-right: -12px; z-index: 10; margin-top: 12px; font-size: 14px">OR</v-avatar> -->
                        </v-col>
                        <v-col :key="`move-1-option-${index}-tool`" :class="`v-toolbar__content ma-0 pa-0  ${option.move.type}`">
                          <v-avatar color="white" size="32" class="mr-2">
                            <img v-if="option.move.type" :src="`https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/img/${option.move.type}.webp`" />
                          </v-avatar>
                          <div style="margin-top: -8px">
                            <h3 style="padding: none !important">{{option.move.name}}</h3>
                            <div style="height: 20px; margin-top: -8px; margin-bottom: 4px !important">
                              <v-chip color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiTimerOutline}}</v-icon>
                                  {{option.cooldown}}s
                                </div>
                              </v-chip>
                              <v-chip v-if="option.tags.includes('Area')" color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiArrowExpandAll}}</v-icon>
                                  Area
                                </div>
                              </v-chip>
                              <v-chip v-if="option.tags.includes('Buff')" color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiChevronDoubleUp}}</v-icon>
                                  Buff
                                </div>
                              </v-chip>
                              <v-chip v-if="option.tags.includes('Debuff')" color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiChevronDoubleDown}}</v-icon>
                                  Debuff
                                </div>
                              </v-chip>
                              <v-chip v-if="option.tags.includes('Dash')" color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiShare}}</v-icon>
                                  Dash
                                </div>
                              </v-chip>
                              <v-chip v-if="option.tags.includes('Hindrance')" color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiLinkVariant}}</v-icon>
                                  Hindrance
                                </div>
                              </v-chip>
                              <v-chip v-if="option.tags.includes('Recovery')" color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiBottleTonicPlusOutline}}</v-icon>
                                  Recovery
                                </div>
                              </v-chip>
                              <v-chip v-if="option.tags.includes('Sure Hit')" color="primary" class="mr-2" label x-small style="height: 20px">
                                <div style="font-size: 14px !important">
                                  <v-icon small class="pb-1">{{icons.mdiTarget}}</v-icon>
                                  Sure Hit
                                </div>
                              </v-chip>
                            </div>
                          </div>
                        </v-col>
                      </template>
                    </v-row>
                  </v-toolbar>
                  <v-row class="full-width pl-3" style="max-width: 994px !important">
                    <template v-for="(option, index) in moves[1].options">
                      <v-col :key="`move-1-option-${index}-description`" :style="index > 0? {borderLeft: '1px solid black !important'}: {}" class="mb-3">
                        <div style="height: 7em; font-size: 14px !important; line-height: 15px" class="pa-2">
                          {{option.description}}
                        </div>
                      </v-col>
                    </template>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-app>
</template>

<script>
const axios = require('axios')
const html2canvas = require('html2canvas')

import { 
  mdiChevronDoubleDown, 
  mdiChevronDoubleUp, 
  mdiChevronRightCircle, 
  mdiHexagonMultiple,
  mdiTimerOutline,
  mdiArrowExpandAll,
  mdiShare,
  mdiLinkVariant,
  mdiBottleTonicPlusOutline,
  mdiTarget,
  mdiOctagramOutline,
  mdiBrightness7,
  mdiDownload,
} from '@mdi/js'

export default {
  name: 'App',
  data: () => { 
    return {
      dialogOpen: false,
      icons: {
        mdiChevronDoubleDown, 
        mdiChevronDoubleUp, 
        mdiChevronRightCircle, 
        mdiHexagonMultiple,
        mdiTimerOutline,
        mdiArrowExpandAll,
        mdiShare,
        mdiLinkVariant,
        mdiBottleTonicPlusOutline,
        mdiTarget,
        mdiOctagramOutline,
        mdiBrightness7,
        mdiDownload,
      },
      loading: false,
      builtImage: '',
      attackTypes: ['Physical', 'Special'],
      rangeTypes: ['Melee', 'Ranged'],
      roleTypes: ['Attacker', 'Speedster', 'Defender', 'Support', 'All-rounder'],
      difficultyOptions: ['Novice', 'Intermediate', 'Expert'],
      evolutionOptions: [
        { text: 'Lvl 4 / Lvl 8', value: [1, 4, 8] },
        { text: 'Lvl 4 / Lvl 9', value: [1, 4, 9] },
        { text: 'Lvl 5 / Lvl 7', value: [1, 5, 7] },
        { text: 'Lvl 5 / Lvl 8', value: [1, 5, 8] },
        { text: 'Lvl 5 / Lvl 9', value: [1, 5, 9] },
        { text: 'Lvl 6 / Lvl 10', value: [1, 6, 10] },
      ],
      moveTags: [
        { text: 'Area', value: 'Area' },
        { text: 'Buff', value: 'Buff' },
        { text: 'Debuff', value: 'Debuff' },
        { text: 'Dash', value: 'Dash' },
        { text: 'Hindrance', value: 'Hindrance' },
        { text: 'Recovery', value: 'Recovery' },
        { text: 'Sure Hit', value: 'Sure Hit' },
      ],
      pokemonOptions: [],
      imageUrl: 'https://cdn.statically.io/gh/PokeAPI/sprites/master/sprites/pokemon/other/home/',
      pokemon: {
        id: 0,
        name: '',
        types: ['', ''],
        abilities: [],
        evolutions: [],
        moves: [],
      }, 
      difficulty: '',
      evolutions: [],
      ability: {
        name: '',
        description: '',
      },
      uniteMove: {
        name: '',
        description: '',
      },
      attackType: '',
      range: '',
      role: '',
      basicDescription: '',
      moves: [{
        move: {
          name: '',
          type: '',
        },
        tags: [],
        description: '',
        cooldown: 1,
        options: [{
          move: {
            name: '',
            type: '',
          },
          description: '',
          tags: [],
          cooldown: 1,
        }, {
          move: {
            name: '',
            type: '',
          },
          description: '',
          tags: [],
          cooldown: 1,
        }]
      }, {
        move: {
          name: '',
          type: '',
        },
        description: '',
        tags: [],
        cooldown: 1,
        options: [{
          move: {
            name: '',
            type: '',
          },
          description: '',
          tags: [],
          cooldown: 1,
        }, {
          move: {
            name: '',
            type: '',
          },
          description: '',
          tags: [],
          cooldown: 1,
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
    buildDesign() {
      html2canvas(document.getElementById('design'), { 
        useCORS: true, 
        logging : true, 
        width: 1600, 
        height: 900, 
        windowWidth: 1600,
        windowHeight: 900,
        scale: window.devicePixelRatio,
        onclone: (document) => {
          document.getElementById('design').style.display = 'block'
        },
      }).then((canvas) => {
        this.builtImage = canvas.toDataURL('image/jpeg', 1.0)
      })
    },
    onPokemonSelect() {
      axios.get(`https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/data/pokemon/${this.pokemon.id}.json`).then((resp) => {
        resp.data.abilities = resp.data.abilities.map((ab) => { return { value: ab, text: ab }})
        resp.data.moves = resp.data.moves.map((mv) => { return { value: mv, text: mv.name }})
        this.pokemon = resp.data
        this.evolutions = [1, 4, 8].slice(0, this.pokemon.evolutions.length)
        this.ability.name = this.pokemon.abilities[0].value
        this.ability.description = ''
        this.attackType = this.attackTypes[0]
        this.range = this.rangeTypes[0]
        this.role = this.roleTypes[0]
        this.difficulty = this.difficultyOptions[0]
        this.moves.forEach((mv) => {
          mv.move.name = ''
          mv.move.type = ''
          mv.description = ''
          mv.tags = []
          mv.cooldown = 1
          mv.options.forEach((opt) => {
            opt.move.name = ''
            opt.move.type = ''
            opt.description = ''
            opt.tags = []
            opt.cooldown = 1
          })
        })
        this.stats = {
          offense: 3,
          endurance: 3,
          mobility: 3,
          scoring: 3,
          support: 3,
        }
      })
    },
  },
};
</script>
<style>
* {
  /* font-weight: 600 !important; */
  font-family: 'Exo 2' !important;
}
.v-icon {
  font:"Material Design Icons" !important;
}
.v-text-field__details {
  display: none !important;
}
#design {
  height: 900px;
  width: 1600px;
  opacity: 1.0;
  display: none;
  /* font-weight: 600 !important; */
}
#design * {
  box-shadow: none !important;
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
.character-card {
  border-top-right-radius: 30%;
  /* border-bottom-right-radius: 10%;
  border-bottom-left-radius: 10%; */
  width: 240px;
  height: 285px;
  background-repeat: repeat !important;
  background-size: 80px 80px !important;
}
@media not all and (min-resolution:.001dpcm)
{ @supports (-webkit-appearance:none) and (stroke-color:transparent) {
.character-card-border { 
background: rgb(240, 240, 240) 0 292px !important;
}
}}
@media not all and (min-resolution:.001dpcm){ 
@supports (-webkit-appearance:none) and (not (stroke-color:transparent)) {
.character-card-border { 
background: rgb(240, 240, 240) 0 292px !important;
}
}}
@media screen and (min-color-index:0) and(-webkit-min-device-pixel-ratio:0){ 
.character-card-border { 
background: rgb(240, 240, 240) 0 292px !important;
}
}
.character-card-border {
  border-top-right-radius: 80px;
  border-bottom-right-radius: 10%;
  border-bottom-left-radius: 10%;
  width: 248px;
  height: 350px;
  background: linear-gradient(
    rgb(240, 240, 240) 0 292px,
    rgb(116, 115, 115) 292px 312px,
    rgb(222, 220, 220) 312px 350px
  );
  background: -moz-linear-gradient(
    rgb(240, 240, 240) 0 292px,
    rgb(116, 115, 115) 292px 312px,
    rgb(222, 220, 220) 312px 350px
  );
  background: -webkit-linear-gradient(
    to bottom,
    rgb(240, 240, 240) 0 292px,
    rgb(116, 115, 115) 292px 312px,
    rgb(222, 220, 220) 312px 350px
  );
  background: -o-linear-gradient(
    rgb(240, 240, 240) 0 292px,
    rgb(116, 115, 115) 292px 312px,
    rgb(222, 220, 220) 312px 350px
  );
  /* transform: rotateY(0deg) rotate(10deg);  */
}
.character-card.attacker {
  background-image: url("https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/img/attacker.png");
  /* background-image: conic-gradient(
    from -55deg,
    darkorange 0deg 20deg,
    orangered 30deg 80deg,
    orange 170deg 180deg,
    darkorange 170deg 210deg,
    orangered 250deg 260deg,
    darkorange 280deg 320deg,
    orange) !important; */
}
.character-card.speedster {
  background-image: url("https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/img/speedster.png");
  /* background-image: conic-gradient(
    from -55deg,
    deepskyblue 0deg 20deg,
    royalblue 30deg 80deg,
    dodgerblue 170deg 180deg,
    deepskyblue 170deg 210deg,
    royalblue 250deg 260deg,
    deepskyblue 280deg 320deg,
    dodgerblue) !important; */
}
.character-card.defender {
  background-image: url("https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/img/defender.png");
  /* background-image: conic-gradient(
    from -55deg,
    lawngreen 0deg 20deg,
    limegreen 30deg 80deg,
    palegreen 170deg 180deg,
    lawngreen 170deg 210deg,
    limegreen 250deg 260deg,
    lawngreen 280deg 320deg,
    palegreen) !important; */
}
.character-card.all-rounder {
  background-image: url("https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/img/all-rounder.png");
  /* background-image: conic-gradient(
    from -55deg,
    mediumpurple 0deg 20deg,
    rebeccapurple 30deg 80deg,
    mediumorchid 170deg 180deg,
    mediumpurple 170deg 210deg,
    rebeccapurple 250deg 260deg,
    mediumpurple 280deg 320deg,
    mediumorchid) !important; */
}
.character-card.support {
  background-image: url("https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/img/support.png");
  /* background-image: conic-gradient(
    from -55deg,
    rgb(254, 246, 0) 0deg 20deg,
    rgb(255, 196, 0) 30deg 80deg,
    rgb(255, 225, 0) 170deg 180deg,
    rgb(254, 246, 0) 170deg 210deg,
    rgb(255, 196, 0) 250deg 260deg,
    rgb(254, 246, 0) 280deg 320deg,
    rgb(255, 225, 0)) !important; */
}
.character-card-footer {
  height: 58px;
  border: solid rgb(116, 115, 115);
  border-width: 3px;
  background-color: rgb(240, 240, 240); 
  border-radius: 0 0 30px 30px;
}
.character-card-circle {
  height: 40px; 
  width: 80px; 
  border-radius: 0 0 40px 40px; 
  border-width: 0px 18px 18px 18px !important; 
  background: rgb(240, 240, 240);
}
.character-card-circle.attacker {
  border: solid darkorange;
}
.character-card-circle.speedster {
  border: solid deepskyblue;
}
.character-card-circle.defender {
  border: solid lawngreen;
}
.character-card-circle.all-rounder {
  border: solid mediumpurple;
}
.character-card-circle.support {
  border: solid rgb(255, 204, 0);
}
.option-toolbar > .v-toolbar__content {
  padding-right: 4px !important;
}
.option-toolbar > .v-toolbar__content .v-toolbar__content:last-of-type {
  border-top-right-radius: 3px;
  padding-left: 16px !important;
}
.option-toolbar > .v-toolbar__content .v-toolbar__content:first-of-type {
  border-top-left-radius: 18px;
  padding-left: 4px !important;
}
h3 {
  margin-bottom: 4px !important;
}
</style>