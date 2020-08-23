const VERSION = require('./src/version.json').version;
const NwBuilder = require('nw-builder');
const fs = require('fs');
const BUILD_PATH = './desktopBuild/App/win32/';

const nw = new NwBuilder({
    files: './build/**/*',
    platforms: ['win32'],
    version: '0.36.4',
    buildDir: './desktopBuild',
    flavor: "normal",
    appName: "App",
    appVersion: VERSION,
    winIco: "./icon.ico",
    zip: false,
    winVersionString: {
        'CompanyName': 'Yvo Geldhof',
        'FileDescription': 'App',
        'ProductName': 'App',
        'LegalCopyright': VERSION,
        'OriginalFilename': 'App.exe',
        'ProductVersion': VERSION,
        'CompanyShortName': 'Yvo Geldhof',
        'ProductShortName': 'App',
        'LastChange': '',
        'InternalName': 'App_exe'
    }
});

nw.on('log', console.log);

function moveFilesToBuildDir(files, callback) {
    files.forEach(function (filename) {
        fs.createReadStream(filename).pipe(fs.createWriteStream(BUILD_PATH + filename));
    });

    callback(null);
}

nw.build().then(function () {
    const MOVE_FILES = ['app_id.txt', 'changelog.txt', 'icon.ico'];

    moveFilesToBuildDir(MOVE_FILES, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Files successfully added to build dir');
        }
    });

    console.log('Build successful');

}).catch(function (error) {
    console.error(error);
});
