import { promises as fs, readFileSync } from 'fs';
import { resolve, sep } from 'path';
import callerCallsite from 'caller-callsite';
import readPkgUp from 'read-pkg-up';

async function readManifest(packageName = ''): Promise<unknown> {
  const filePath: string = await resolvePackagePath(packageName);

  try {
    const fileContents: string = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (err) {
    return null;
  }
}

function readManifestSync (packageName = ''): unknown {
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

  const packagePath: string | undefined = atom.packages.resolvePackagePath(packageName);

  if (packagePath) {
    return resolve(packagePath, 'package.json');
  }

  const manifest = await readPkgUp({cwd: __dirname});

  return manifest?.packageJson
    ? await resolvePackagePath(manifest.packageJson.name)
    : '';
}

function resolvePackagePathSync(packageName: string): string {
  packageName = packageName?.length
    ? packageName
    : getPackageName();

  const packagePath: string | undefined = atom.packages.resolvePackagePath(packageName);

  if (packagePath) {
    return resolve(packagePath, 'package.json');
  }

  const manifest = readPkgUp.sync({cwd: __dirname});

  return manifest?.packageJson
    ? resolvePackagePathSync(manifest.packageJson.name)
    : '';
}

function getPackageName(): string {
  const callerPath: string | null | undefined = callerCallsite()?.getFileName();
  const packageDirPaths: string[] = atom.packages.getPackageDirPaths();

  const intersection: string[] = packageDirPaths.filter(packageDirPath => {
    return callerPath?.startsWith(packageDirPath);
  });

  if (callerPath && intersection?.length) {
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
