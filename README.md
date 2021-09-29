# pokemon-unite-designer

This project is for building custom designs for pokemon that are not currently in Pokemon Unite. Feel free to make PRs for changes to the UI or whatever.

It uses PokeAPI data and images with heavy usage of statically.io for caching/serving everything

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for github pages
```
yarn build --dest docs
```

### Lints and fixes files
```
yarn lint
```

### Reloads JSON files
For convenient caching of the JSON data required for each pokemon just run 
```
node json-loader.js
```
This should really only be a requirement when new pokemon come out and avoids this project having to interact with PokeAPI every time it is run. 
Eventually this may want to be its own repo to avoid cluterring this one up, but it works for now.
