'use strict';

const { join, relative, resolve } = require('path');
const { promisify } = require('util');
const { readFile, readFileSync } = require('fs');
const callerCallsite = require('caller-callsite');
const findUp = require('find-up');

const readFileAsync = promisify(readFile);

async function readManifest(packageName: string = ''): Promise<Object> {
  const filePath = resolveFilePath(packageName);

  try {
    const fileContents: string = await readFileAsync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (err) {
    return null;
  }
}

function readManifestSync (packageName: string = ''): Object {
  const filePath = resolveFilePath(packageName);

  try {
    const fileContents: string = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (err) {
    return null;
  }
}

function resolveFilePath(packageName: string) {
  packageName = packageName?.length ? packageName : getPackageName();

  const packagePath: string = atom.packages.resolvePackagePath(packageName);
  const filePath: string | undefined = resolve(packagePath, 'package.json');

  return filePath;
}

function getPackageName(): string {
  const callerPath: string = callerCallsite().getFileName();
  const packageDirPaths: string[] = atom.packages.getPackageDirPaths();

  const intersection: string[] = packageDirPaths.filter(packageDirPath => {
    return callerPath.startsWith(packageDirPath);
  });

  if (intersection?.length) {
    return callerPath
      .replace(intersection[0], '')
      .split('/')
      .filter(fragment => fragment)[0] || '';
  }
}

export {
  readManifest,
  readManifestSync
};
