'use strict';

const atom = require('atom');
const { promisify } = require('util');
const { readFile, readFileSync } = require('fs');
const { resolve } = require('path');

const readFileAsync = promisify(readFile);

module.exports = packageName => {
    const packagePath = atom.packages.resolvePackagePath(packageName);
    const filePath = resolve(packagePath, 'package.json');

    return readFileAsync(filePath, 'utf8').then(file => JSON.parse(file));
};

module.exports.sync = packageName => {
    const packagePath = atom.packages.resolvePackagePath(packageName);
    const filePath = resolve(packagePath, 'package.json');
    const file = readFileSync(filePath, 'utf8');

    return JSON.parse(file);
};
