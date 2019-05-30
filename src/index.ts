'use strict';

const findUp = require('find-up');
const { promisify } = require('util');
const { readFile, readFileSync } = require('fs');
const { join, resolve } = require('path');

const readFileAsync = promisify(readFile);

const readManifest = async (packageName = '') => {
  let filePath;

  if (packageName) {
    // @ts-ignore
    const packagePath = atom.packages.resolvePackagePath(packageName);
    filePath = resolve(packagePath, 'package.json');
  } else {
    const selfRoot = await findUp('package.json', { cwd: __dirname });
    filePath = await findUp('package.json', { cwd: join(selfRoot, '../..') });
  }

  return readFileAsync(filePath, 'utf8').then(file => JSON.parse(file));
};

const readManifestSync = (packageName = '') => {
  let filePath;

  if (packageName) {
    // @ts-ignore
    const packagePath = atom.packages.resolvePackagePath(packageName);
    filePath = resolve(packagePath, 'package.json');
  } else {
    const selfRoot = findUp.sync('package.json', { cwd: __dirname });
    filePath = findUp.sync('package.json', { cwd: join(selfRoot, '../..') });
  }

  return JSON.parse(readFileSync(filePath, 'utf8'));
};

export {
  readManifest,
  readManifestSync
};
