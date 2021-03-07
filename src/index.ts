import { promises as fs, readFileSync } from 'fs';
import { resolve, sep } from 'path';
import callerCallsite = require('caller-callsite');
import readPkgUp = require('read-pkg-up');

async function readManifest(packageName: string = ''): Promise<Object> {
  const filePath: string = await resolvePackagePath(packageName);

  try {
    const fileContents: string = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (err) {
    return null;
  }
}

function readManifestSync (packageName: string = ''): Object {
  const filePath: string = resolvePackagePathSync(packageName);

  try {
    const fileContents: string = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (err) {
    return null;
  }
}

async function resolvePackagePath(packageName: string): Promise<string> {
  packageName = packageName?.length
    ? packageName
    : getPackageName();

  const packagePath: string | null = atom.packages.resolvePackagePath(packageName);

  if (packagePath) {
    return resolve(packagePath, 'package.json');
  }

  const { packageJson } = await readPkgUp({cwd: __dirname});

  return await resolvePackagePath(packageJson.name);
}

function resolvePackagePathSync(packageName: string): string {
  packageName = packageName?.length
    ? packageName
    : getPackageName();

  const packagePath: string | null = atom.packages.resolvePackagePath(packageName);

  if (packagePath) {
    return resolve(packagePath, 'package.json');
  }

  const { packageJson } = readPkgUp.sync({cwd: __dirname});

  return resolvePackagePathSync(packageJson.name);
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
      .filter(fragment => fragment)[0];
  }

  return '';
}

export {
  readManifest,
  readManifestSync
};
