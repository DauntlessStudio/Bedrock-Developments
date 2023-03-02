const fs = require('fs');
let package = JSON.parse(fs.readFileSync('./package.json'));
let version = package['version'];
let index = String(fs.readFileSync('./ts/index.ts'));
index = index.replace(/const version = .+/, `const version = '${version}'`);
fs.writeFileSync('./ts/index.ts', index);