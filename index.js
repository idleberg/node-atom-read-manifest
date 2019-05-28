'use strict';

const findUp = require('find-up');
const { promisify } = require('util');
const { readFile, readFileSync } = require('fs');
const { join, resolve } = require('path');

const readFileAsync = promisify(readFile);

module.exports = async (packageName = '') => {
    let filePath;

    if (packageName) {
        const packagePath = atom.packages.resolvePackagePath(packageName);
        filePath = resolve(packagePath, 'package.json');
    } else {
        filePath = await findUp('package.json', { cwd: join(__dirname, '..') });
    }

    return readFileAsync(filePath, 'utf8').then(file => JSON.parse(file));
};

module.exports.sync = (packageName = '') => {
    let filePath;

    if (packageName) {
        const packagePath = atom.packages.resolvePackagePath(packageName);
        filePath = resolve(packagePath, 'package.json');
    } else {
        filePath = findUp.sync('package.json', { cwd: join(__dirname, '..') });
    }

    return JSON.parse(readFileSync(filePath, 'utf8'));
};
