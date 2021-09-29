(function(e){function t(t){for(var i,r,s=t[0],l=t[1],c=t[2],d=0,u=[];d<s.length;d++)r=s[d],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&u.push(n[r][0]),n[r]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);p&&p(t);while(u.length)u.shift()();return a.push.apply(a,c||[]),o()}function o(){for(var e,t=0;t<a.length;t++){for(var o=a[t],i=!0,s=1;s<o.length;s++){var l=o[s];0!==n[l]&&(i=!1)}i&&(a.splice(t--,1),e=r(r.s=o[0]))}return e}var i={},n={app:0},a=[];function r(t){if(i[t])return i[t].exports;var o=i[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=i,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(o,i,function(t){return e[t]}.bind(null,i));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/docs/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var p=l;a.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"034f":function(e,t,o){"use strict";o("85ec")},"56d7":function(e,t,o){"use strict";o.r(t);o("e260"),o("e6cf"),o("cca6"),o("a79d"),o("ac1f"),o("5319"),o("d3b7");var i=o("2b0e"),n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("b-navbar",{staticStyle:{background:"rgb(82, 44, 166)",padding:"10px 20px"},attrs:{sticky:"",type:"dark"}},[o("b-navbar-brand",{attrs:{href:"#"}},[e._v("Pokemon Unite Designer")])],1),o("div",{attrs:{id:"content"}},[o("div",{ref:"design",attrs:{id:"design"}},[o("div",{class:"banner "+this.pokemon.types[0]},[o("div",{class:"profile-image circle "+e.pokemon.types.concat("")[1]},[0!=this.pokemon.id?o("b-img",{attrs:{width:"180px",height:"180px",src:""+this.imageUrl+this.pokemon.id+".png",alt:this.pokemon.name}}):e._e()],1),o("div",{staticClass:"title"},[e._v(e._s(this.pokemon.name))])]),o("div",{staticClass:"btn-container"},[o("div",e._l(this.pokemon.types.filter((function(e){return e})),(function(t){return o("b-btn",{key:t,class:"type-btn "+t,attrs:{disabled:"",pill:""}},[e._v(e._s(t))])})),1),o("div",[o("b-btn",{class:"archetype-btn "+e.archetype.split("/").slice(-1)[0].toLowerCase(),attrs:{disabled:"",pill:""}},[e._v(e._s(e.archetype))])],1)]),o("div",{staticClass:"evolutions-container",style:{"grid-template-columns":"1fr ".repeat(3*(this.pokemon.evolutions.length||1)-1)}},[e._l(this.pokemon.evolutions,(function(t,i){return[e.pokemon.evolutions.length>1?o("div",{key:t.name,staticClass:"evolution"},[o("div",{class:"circle "+e.pokemon.types[0]},[o("b-img",{attrs:{center:"",src:e.imageUrl+t.id+".png",width:"70px",height:"70px"}})],1),o("div",{staticClass:"text-center evolution-text"},[e._v(e._s(t.name))])]):e._e(),i<e.evolutions.length?o("div",{key:t.name+"level",staticClass:"text-center",staticStyle:{"margin-bottom":"40px"}},[o("div",[e._v("Level "+e._s(e.evolutions[i]))]),o("div",[o("b-icon",{attrs:{icon:"arrow-right-square-fill"}})],1)]):e._e()]}))],2),o("div",{staticClass:"basic-ability"},[o("b-card",{attrs:{"header-class":e.pokemon.types[0]},scopedSlots:e._u([{key:"header",fn:function(){return[o("div",{},[o("b-icon",{attrs:{icon:"x-diamond"}}),e._v(" Basic Attack ")],1)]},proxy:!0}])},[e._v(" "+e._s(e.basicDescription)+" ")]),o("b-card",{attrs:{"header-class":e.pokemon.types[0]},scopedSlots:e._u([{key:"header",fn:function(){return[o("div",{},[o("b-icon",{attrs:{icon:"gear"}}),e._v(" Ability: "+e._s(e.ability.name)+" ")],1)]},proxy:!0}])},[e._v(" "+e._s(e.ability.description)+" ")])],1),o("div",{staticClass:"moves"},[e._l(this.moves,(function(t,i){return[o("b-card",{key:"move"+i,attrs:{"header-class":t.move.type},scopedSlots:e._u([{key:"header",fn:function(){return[o("div",{},[o("b-img",{attrs:{width:"30px",height:"30px",src:"/img/"+t.move.type+".webp"}}),e._v(" "+e._s(t.move.name)+" ")],1)]},proxy:!0}],null,!0)},[e._v(" "+e._s(t.description)+" ")]),o("div",{key:"arrow"+i,staticClass:"text-center align-middle",staticStyle:{"font-size":"20px","margin-top":"70px"}},[o("b-icon",{attrs:{icon:"arrow-right-square-fill"}})],1),e._l(t.options,(function(n,a){return[o("b-card",{key:"move-option-"+i+"-"+a,attrs:{"header-class":n.move.type},scopedSlots:e._u([{key:"header",fn:function(){return[o("div",{},[o("b-img",{attrs:{width:"30px",height:"30px",src:"/img/"+n.move.type+".webp"}}),e._v(" "+e._s(n.move.name)+" ")],1)]},proxy:!0}],null,!0)},[e._v(" "+e._s(n.description)+" ")]),a+1!=t.options.length?o("div",{key:"or-"+i+"-"+a,staticStyle:{"font-size":"16px","margin-top":"70px","font-weight":"500"}},[e._v("OR")]):e._e()]}))]}))],2),o("div",{staticStyle:{margin:"0 300px"}},[o("b-card",{staticStyle:{height:"120px"},attrs:{"header-class":e.pokemon.types[0]},scopedSlots:e._u([{key:"header",fn:function(){return[o("div",{},[o("b-icon",{attrs:{icon:"star-fill"}}),e._v(" Unite Move: "+e._s(e.uniteMove.name)+" ")],1)]},proxy:!0}])},[e._v(" "+e._s(e.uniteMove.description)+" ")])],1)]),o("b-container",{attrs:{id:"designer"}},[o("b-form",{on:{submit:e.previewDesign}},[o("div",[o("h5",[e._v("Pokemon")]),o("b-form-select",{attrs:{options:e.pokemonOptions,required:"",value:"0"},on:{change:e.onPokemonSelect},scopedSlots:e._u([{key:"first",fn:function(){return[o("b-form-select-option",{attrs:{value:"0",disabled:""}},[e._v("Choose a pokemon")])]},proxy:!0}]),model:{value:e.pokemon.id,callback:function(t){e.$set(e.pokemon,"id",t)},expression:"pokemon.id"}})],1),0!=e.pokemon.id?o("div",[o("div",[o("h5",[e._v("Archetype")]),o("b-form-select",{attrs:{options:e.archetypeOptions,required:"",value:""},scopedSlots:e._u([{key:"first",fn:function(){return[o("b-form-select-option",{attrs:{value:"",disabled:""}},[e._v("Choose an archetype")])]},proxy:!0}],null,!1,2941862548),model:{value:e.archetype,callback:function(t){e.archetype=t},expression:"archetype"}})],1),e.pokemon.evolutions.length>2?o("div",[o("h5",[e._v("Evolutions")]),o("b-form-select",{attrs:{placeholder:"Choose evolution levels",options:e.evolutionOptions,required:"",value:e.evolutions},model:{value:e.evolutions,callback:function(t){e.evolutions=t},expression:"evolutions"}})],1):e._e(),o("div",[o("h5",[e._v("Basic attack description")]),o("b-form-textarea",{attrs:{placeholder:"Basic Attack description goes here...","no-resize":"",maxlength:"300"},model:{value:e.basicDescription,callback:function(t){e.basicDescription=t},expression:"basicDescription"}})],1),o("hr"),o("div",[o("h5",[e._v("Ability")]),o("b-form-select",{attrs:{placeholder:"Choose an ability",options:e.pokemon.abilities,required:"",value:e.ability.name},model:{value:e.ability.name,callback:function(t){e.$set(e.ability,"name",t)},expression:"ability.name"}})],1),o("div",[o("h5",[e._v("Ability description")]),o("b-form-textarea",{attrs:{placeholder:"Ability description goes here...","no-resize":"",maxlength:"300"},model:{value:e.ability.description,callback:function(t){e.$set(e.ability,"description",t)},expression:"ability.description"}})],1),o("hr"),e._l(e.moves,(function(t,i){return[o("div",{key:"move"+i+"select"},[o("h5",[e._v("Move "+e._s(i+1))]),o("b-form-select",{attrs:{placeholder:"Choose an ability",options:e.pokemon.moves,required:"",value:{name:"",type:""}},scopedSlots:e._u([{key:"first",fn:function(){return[o("b-form-select-option",{attrs:{value:{name:"",type:""},disabled:""}},[e._v("Choose a move")])]},proxy:!0}],null,!0),model:{value:t.move,callback:function(o){e.$set(t,"move",o)},expression:"move.move"}})],1),o("div",{key:"move"+i+"description"},[o("h5",[e._v("Move "+e._s(i+1)+" description")]),o("b-form-textarea",{attrs:{placeholder:"Move description goes here...","no-resize":"",maxlength:"300"},model:{value:t.description,callback:function(o){e.$set(t,"description",o)},expression:"move.description"}}),o("hr")],1),e._l(t.options,(function(t,n){return[o("div",{key:"move"+i+"option"+n+"select"},[o("h5",[e._v("Move "+e._s(i+1)+" option "+e._s(n+1))]),o("b-form-select",{attrs:{placeholder:"Choose an ability",options:e.pokemon.moves,required:"",value:{name:"",type:""}},scopedSlots:e._u([{key:"first",fn:function(){return[o("b-form-select-option",{attrs:{value:{name:"",type:""},disabled:""}},[e._v("Choose a move")])]},proxy:!0}],null,!0),model:{value:t.move,callback:function(o){e.$set(t,"move",o)},expression:"move.move"}})],1),o("div",{key:"move"+i+"option"+n+"description"},[o("h5",[e._v("Move "+e._s(i+1)+" option "+e._s(n+1)+" description")]),o("b-form-textarea",{attrs:{placeholder:"Move description goes here...","no-resize":"",maxlength:"300"},model:{value:t.description,callback:function(o){e.$set(t,"description",o)},expression:"move.description"}}),o("hr")],1)]}))]})),o("div",[o("h5",[e._v("Unite move name")]),o("b-form-textarea",{staticStyle:{height:"20px"},attrs:{placeholder:"Unite move name...","no-resize":"",maxlength:"25"},model:{value:e.uniteMove.name,callback:function(t){e.$set(e.uniteMove,"name",t)},expression:"uniteMove.name"}})],1),o("div",[o("h5",[e._v("Unite move description")]),o("b-form-textarea",{attrs:{placeholder:"Unite move description...","no-resize":"",maxlength:"300"},model:{value:e.uniteMove.description,callback:function(t){e.$set(e.uniteMove,"description",t)},expression:"uniteMove.description"}})],1)],2):e._e(),o("hr"),o("div",{staticStyle:{float:"right","padding-bottom":"10px"}},[o("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Generate")])],1)])],1)],1),o("b-modal",{attrs:{id:"preview",centered:"",size:"lg",title:"Build Preview","ok-title":"Download","cancel-title":"Close"},on:{ok:e.downloadDesign}},[o("img",{staticStyle:{width:"100%",height:"100%"},attrs:{id:"buildImg"}})]),o("footer",{staticStyle:{height:"60px",background:"rgb(82, 44, 166)","margin-bottom":"-60px"}})],1)},a=[],r=(o("99af"),o("d81d"),o("b0c0"),o("a4d3"),o("e01a"),o("159b"),o("466d"),o("bc3a")),s=o("c0e9"),l={name:"App",data:function(){return{archetypeOptions:["Attacker","Speedster","Defender","Support"].reduce((function(e,t){return e.concat(["Melee","Ranged"].map((function(e){return{value:"".concat(e," / ").concat(t),text:"".concat(e," / ").concat(t)}})))}),[]),evolutionOptions:[{text:"Lvl 4 / Lvl 8",value:[4,8]},{text:"Lvl 4 / Lvl 9",value:[4,9]},{text:"Lvl 5 / Lvl 7",value:[5,7]},{text:"Lvl 5 / Lvl 8",value:[5,8]},{text:"Lvl 5 / Lvl 9",value:[5,9]},{text:"Lvl 6 / Lvl 10",value:[6,10]}],pokemonOptions:[],imageUrl:"https://cdn.statically.io/gh/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/",pokemon:{id:0,name:"",types:["",""],abilities:[],evolutions:[]},evolutions:[],ability:{name:"",description:""},uniteMove:{name:"",description:""},archetype:"",basicDescription:"",moves:[{move:{name:"",type:""},description:"",options:[{move:{name:"",type:""},description:""},{move:{name:"",type:""},description:""}]},{move:{name:"",type:""},description:"",options:[{move:{name:"",type:""},description:""},{move:{name:"",type:""},description:""}]}]}},created:function(){var e=this;r.get("https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/data/all-pokemon.json").then((function(t){e.pokemonOptions=t.data.map((function(e){return{value:e.id,text:e.name}}))}))},methods:{previewDesign:function(e){e.preventDefault(),e.stopPropagation(),this.$bvModal.show("preview"),s(document.getElementById("design"),{useCORS:!0,logging:!0,width:1200,height:1e3,windowWidth:1200,windowHeight:1e3,onclone:function(e){e.getElementById("design").style.display="block",window.innerWidth<400&&(e.querySelector(".title").style.marginTop="-120px")}}).then((function(e){document.getElementById("buildImg").src=e.toDataURL("image/jpeg")}))},downloadDesign:function(){var e=document.createElement("a");e.href=document.getElementById("buildImg").src.replace("image/jpeg","image/octet-stream"),e.download="".concat(this.pokemon.name,"-build.jpg"),e.click(),e.remove()},onPokemonSelect:function(){var e=this;r.get("https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public/data/pokemon/".concat(this.pokemon.id,".json")).then((function(t){t.data.abilities=t.data.abilities.map((function(e){return{value:e,text:e}})),t.data.moves=t.data.moves.map((function(e){return{value:e,text:e.name}})),e.pokemon=t.data,e.archetype="",e.evolutions=e.pokemon.evolutions.length>1?[4,8]:[],e.ability.name=e.pokemon.abilities[0].value,e.ability.description="",e.moves.forEach((function(e){e.move.name="",e.move.type="",e.description=""})),e.$refs.design.querySelectorAll("img").forEach((function(t){t.onerror=function(){t.src.match(/other\/official-artwork\//)&&e.$refs.design.querySelectorAll("img").forEach((function(e){e.src.match(/other\/official-artwork\//)&&(e.src=e.src.replace("other/official-artwork/",""))})),e.onerror=function(){}}}))}))}}},c=l,p=(o("034f"),o("2877")),d=Object(p["a"])(c,n,a,!1,null,null,null),u=d.exports,v=o("5f5b"),m=o("b1e0");o("f9e3"),o("2dd8"),o("bc3a");i["default"].use(v["a"]),i["default"].use(m["a"]),i["default"].config.productionTip=!1,new i["default"]({render:function(e){return e(u)}}).$mount("#app")},"85ec":function(e,t,o){}});
//# sourceMappingURL=app.da6e06b9.js.map