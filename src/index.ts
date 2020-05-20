'use strict';

const { resolve, sep } = require('path');
const fs = require('fs');
const callerCallsite = require('caller-callsite');

async function readManifest(packageName: string = ''): Promise<Object> {
  const filePath: string = resolveFilePath(packageName);

  try {
    const fileContents: string = await fs.promise.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (err) {
    return null;
  }
}

function readManifestSync (packageName: string = ''): Object {
  const filePath: string = resolveFilePath(packageName);

  try {
    const fileContents: string = fs.readFileSync(filePath, 'utf8');
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
      .split(sep)
      .filter(fragment => fragment)[0] || '';
  }
}

export {
  readManifest,
  readManifestSync
};
