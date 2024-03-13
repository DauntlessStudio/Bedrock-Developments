const fs = require('fs');
let package = JSON.parse(fs.readFileSync('./package.json'));
let version = package['version'];
let index = String(fs.readFileSync('./ts/app/commands/base.ts'));
index = index.replace(/const version = .+/, `const version = '${version}';`);
fs.writeFileSync('./ts/app/commands/base.ts', index);