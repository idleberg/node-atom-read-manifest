# atom-read-manifest

[![npm](https://flat.badgen.net/npm/license/atom-read-manifest)](https://www.npmjs.org/package/atom-read-manifest)
[![npm](https://flat.badgen.net/npm/v/atom-read-manifest)](https://www.npmjs.org/package/atom-read-manifest)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/node-atom-read-manifest)](https://circleci.com/gh/idleberg/node-atom-read-manifest)
[![David](https://flat.badgen.net/david/dep/idleberg/node-atom-read-manifest)](https://david-dm.org/idleberg/node-atom-read-manifest)

Read the manifest (`package.json`) of any installed Atom package

## Installation

`npm install atom-read-manifest -S`

## Usage

`readManifest(packageID?: string)`

**Example**:

```js
const readManifest = require('atom-read-manifest');

// Unique package identifier
const packageID = 'teletype';

// Asynchronous
(async () => {
    const manifest = await readManifest(packageID);
    console.log(manifest);
})();

// Synchronous
const manifest = readManifest.sync(packageID);
console.log(manifest);
```

## Related

- [vscode-read-manifest](https://www.npmjs.com/package/vscode-read-manifest)

## License

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)

## Donate

You are welcome to support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/node-atom-read-manifest) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
