const NwBuilder = require("nw-builder");
const fs = require("fs");

/* This command creates the NW.js build. */

const VERSION = require("./src/version.json").version;
const BUILD_PATH = "./desktop-build/Game/win32/";
const MOVE_FILES = ["icon.ico", "_EULA.txt", "steam_appid.txt"];

const builder = new NwBuilder({
  files: "./webpack-build/**/*",
  platforms: ["win32"],
  version: "0.36.4",
  buildDir: "./desktop-build",
  flavor: "normal", // sdk = debug, normal = production
  appName: "Game",
  appVersion: VERSION,
  winIco: "./public/assets/images/icon.ico",
  zip: true,
  winVersionString: {
    CompanyName: "Yvo Geldhof",
    FileDescription: "Game",
    ProductName: "Game",
    LegalCopyright: VERSION,
    OriginalFilename: "Game.exe",
    ProductVersion: VERSION,
    CompanyShortName: "Yvo Geldhof",
    ProductShortName: "Game",
    LastChange: "",
    InternalName: "Game_exe",
  },
});

builder.on("log", console.log);

function moveFilesToBuildDir(files, callback) {
  files.forEach(function (filename) {
    fs.createReadStream(filename).pipe(
      fs.createWriteStream(BUILD_PATH + filename)
    );
  });

  callback(null);
}

builder
  .build()
  .then(function () {
    moveFilesToBuildDir(MOVE_FILES, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Files successfully added to build dir");
      }
    });

    console.log("Build successful");
  })
  .catch(function (error) {
    console.error(error);
  });
