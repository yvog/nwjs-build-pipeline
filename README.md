# NW.js desktop build pipeline for Circle Rally Party using nw-build

This project provides the desktop build pipeline as written for my little local multiplayer party game: [Circle Rally Party](https://store.steampowered.com/app/992950/Circle_Rally_Party/)

### Versions
```
webpack				4.x.x
TypeScript 			3.x.x
node: 				10.15.3 LTS
nw.js:				0.36.4
```

### Production build
1. Use the following commands to create a desktop build:
``` 
npm install
npm run prod
```
2. The build files will be placed in `desktopBuild`

### Caveats
* (!) .bin en .node files aren't usable between different NW.js versions






