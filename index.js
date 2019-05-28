'use strict';

const atom = require('atom');
const findUp = require('find-up');
const { promisify } = require('util');
const { readFile, readFileSync } = require('fs');
const { resolve } = require('path');

const readFileAsync = promisify(readFile);

module.exports = (packageName = false) => {
    let filePath;

    if (packageName) {
        const packagePath = atom.packages.resolvePackagePath(packageName);
        filePath = resolve(packagePath, 'package.json');
    } else {
        filePath = findUp('package.json');
    }

    return readFileAsync(filePath, 'utf8').then(file => JSON.parse(file));
};

module.exports.sync = (packageName = false) => {
    let filePath;

    if (packageName) {
        const packagePath = atom.packages.resolvePackagePath(packageName);
        filePath = resolve(packagePath, 'package.json');
    } else {
        filePath = findUp.sync('package.json');
    }
    const file = readFileSync(filePath, 'utf8');

    return JSON.parse(file);
};
