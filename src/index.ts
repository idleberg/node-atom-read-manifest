'use strict';

const findUp = require('find-up');
const { promisify } = require('util');
const { readFile, readFileSync } = require('fs');
const { join, resolve } = require('path');

const readFileAsync = promisify(readFile);

const readManifest = async (packageName: string): Promise<Object> => {
  let filePath: string | undefined;

  const packagePath: string = atom.packages.resolvePackagePath(packageName);
  filePath = resolve(packagePath, 'package.json');

  try {
    const fileContents = await readFileAsync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (err) {
    return null;
  }
};

const readManifestSync = (packageName: string): Object => {
  let filePath: string | undefined;

  const packagePath: string = atom.packages.resolvePackagePath(packageName);
  filePath = resolve(packagePath, 'package.json');

  try {
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (err) {
    return null;
  }
};

export {
  readManifest,
  readManifestSync
};
