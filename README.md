# NW.js desktop build configuration

This project provides the desktop build configuration as written for my little local multiplayer party game: [Circle Rally Party](https://store.steampowered.com/app/992950/Circle_Rally_Party/)

### Versions

```
webpack                4.x.x
TypeScript             3.x.x
node:                  11.10.1
nw.js:                 0.36.4 (32-bit)
Steam API:             1.42
```

### Production build

1. Copy Steam API files to the `greenworks` directory

2. Use the following commands to create a desktop build:

```
npm install
npm run prod:{steam | itchio}
```

3. The build files will be placed in `desktop-build`

### Development build

1. Use the following commands to create a development build:

```
npm install
npm run dev
```

2. The project will run on [localhost:3000](http://localhost:3000)

### Caveats

- .bin en .node files aren't usable between different NW.js versions
