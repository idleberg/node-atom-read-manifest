'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var path = require('path');
var callerCallsite = require('caller-callsite');
var readPkgUp = require('read-pkg-up');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var callerCallsite__default = /*#__PURE__*/_interopDefaultLegacy(callerCallsite);
var readPkgUp__default = /*#__PURE__*/_interopDefaultLegacy(readPkgUp);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function readManifest(packageName) {
    if (packageName === void 0) { packageName = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var filePath, fileContents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, resolvePackagePath(packageName)];
                case 1:
                    filePath = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, fs.promises.readFile(filePath, 'utf8')];
                case 3:
                    fileContents = _a.sent();
                    return [2 /*return*/, JSON.parse(fileContents)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function readManifestSync(packageName) {
    if (packageName === void 0) { packageName = ''; }
    var filePath = resolvePackagePathSync(packageName);
    try {
        var fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    }
    catch (err) {
        return null;
    }
}
function resolvePackagePath(packageName) {
    return __awaiter(this, void 0, void 0, function () {
        var packagePath, manifest, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    packageName = (packageName === null || packageName === void 0 ? void 0 : packageName.length)
                        ? packageName
                        : getPackageName();
                    packagePath = atom.packages.resolvePackagePath(packageName);
                    if (packagePath) {
                        return [2 /*return*/, path.resolve(packagePath, 'package.json')];
                    }
                    return [4 /*yield*/, readPkgUp__default['default']({ cwd: __dirname })];
                case 1:
                    manifest = _b.sent();
                    if (!(manifest === null || manifest === void 0 ? void 0 : manifest.packageJson)) return [3 /*break*/, 3];
                    return [4 /*yield*/, resolvePackagePath(manifest.packageJson.name)];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = '';
                    _b.label = 4;
                case 4: return [2 /*return*/, _a];
            }
        });
    });
}
function resolvePackagePathSync(packageName) {
    packageName = (packageName === null || packageName === void 0 ? void 0 : packageName.length)
        ? packageName
        : getPackageName();
    var packagePath = atom.packages.resolvePackagePath(packageName);
    if (packagePath) {
        return path.resolve(packagePath, 'package.json');
    }
    var manifest = readPkgUp__default['default'].sync({ cwd: __dirname });
    return (manifest === null || manifest === void 0 ? void 0 : manifest.packageJson)
        ? resolvePackagePathSync(manifest.packageJson.name)
        : '';
}
function getPackageName() {
    var _a;
    var callerPath = (_a = callerCallsite__default['default']()) === null || _a === void 0 ? void 0 : _a.getFileName();
    var packageDirPaths = atom.packages.getPackageDirPaths();
    var intersection = packageDirPaths.filter(function (packageDirPath) {
        return callerPath === null || callerPath === void 0 ? void 0 : callerPath.startsWith(packageDirPath);
    });
    if (callerPath && (intersection === null || intersection === void 0 ? void 0 : intersection.length)) {
        return callerPath
            .replace(intersection[0], '')
            .split(path.sep)
            .filter(function (fragment) { return fragment; })[0];
    }
    return '';
}

exports.readManifest = readManifest;
exports.readManifestSync = readManifestSync;
