"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.updatePackageJsonDependencies = exports.prepare3rdPartyDependencies = exports.prepareSpartacusDependencies = exports.checkIfSSRIsUsed = exports.getSpartacusCurrentFeatureLevel = exports.getPrefixedSpartacusSchematicsVersion = exports.getSpartacusSchematicsVersion = exports.getMajorVersionNumber = exports.cleanSemverVersion = exports.readPackageJson = exports.mapPackageToNodeDependencies = exports.createDependencies = exports.createSpartacusDependencies = void 0;
var schematics_1 = require("@angular-devkit/schematics");
var dependencies_1 = require("@schematics/angular/utility/dependencies");
var semver_1 = __importDefault(require("semver"));
var package_json_1 = require("../../../package.json");
var dependencies_json_1 = __importDefault(require("../../dependencies.json"));
var constants_1 = require("../constants");
var libs_constants_1 = require("../libs-constants");
var file_utils_1 = require("./file-utils");
var lib_utils_1 = require("./lib-utils");
var workspace_utils_1 = require("./workspace-utils");
function createSpartacusDependencies(dependencyObject) {
    var spartacusVersion = getPrefixedSpartacusSchematicsVersion();
    return createDependencies(dependencyObject, {
        skipScopes: libs_constants_1.CORE_SPARTACUS_SCOPES,
        onlyIncludeScopes: libs_constants_1.FEATURES_LIBS_SKIP_SCOPES,
        version: spartacusVersion
    });
}
exports.createSpartacusDependencies = createSpartacusDependencies;
function createDependencies(dependencyObject, options) {
    var _a;
    if (options === void 0) { options = {
        skipScopes: libs_constants_1.FEATURES_LIBS_SKIP_SCOPES
    }; }
    var dependencies = [];
    var _loop_1 = function (dependencyName) {
        if (!dependencyObject.hasOwnProperty(dependencyName)) {
            return "continue";
        }
        if (options.skipScopes.some(function (scope) { return dependencyName.startsWith(scope); })) {
            return "continue";
        }
        if (
        // if `onlyIncludeScopes` is not defined, always include the dependency
        !options.onlyIncludeScopes ||
            // if defined, check if the current dependency is in the given array
            options.onlyIncludeScopes.some(function (scope) {
                return dependencyName.startsWith(scope);
            })) {
            dependencies.push(mapPackageToNodeDependencies(dependencyName, (_a = options.version) !== null && _a !== void 0 ? _a : dependencyObject[dependencyName], options.overwrite));
        }
    };
    for (var dependencyName in dependencyObject) {
        _loop_1(dependencyName);
    }
    return dependencies;
}
exports.createDependencies = createDependencies;
function mapPackageToNodeDependencies(packageName, pkgVersion, overwrite) {
    if (overwrite === void 0) { overwrite = false; }
    return {
        type: packageName.includes('schematics')
            ? dependencies_1.NodeDependencyType.Dev
            : dependencies_1.NodeDependencyType.Default,
        name: packageName,
        version: pkgVersion,
        overwrite: overwrite
    };
}
exports.mapPackageToNodeDependencies = mapPackageToNodeDependencies;
function readPackageJson(tree) {
    var pkgPath = '/package.json';
    var buffer = tree.read(pkgPath);
    if (!buffer) {
        throw new schematics_1.SchematicsException('Could not find package.json');
    }
    return JSON.parse(buffer.toString(constants_1.UTF_8));
}
exports.readPackageJson = readPackageJson;
function cleanSemverVersion(versionString) {
    if (isNaN(Number(versionString.charAt(0)))) {
        return versionString.substring(1, versionString.length);
    }
    return versionString;
}
exports.cleanSemverVersion = cleanSemverVersion;
function getMajorVersionNumber(versionString) {
    var cleanVersion = cleanSemverVersion(versionString);
    return Number(cleanVersion.charAt(0));
}
exports.getMajorVersionNumber = getMajorVersionNumber;
function getSpartacusSchematicsVersion() {
    return package_json_1.version;
}
exports.getSpartacusSchematicsVersion = getSpartacusSchematicsVersion;
function getPrefixedSpartacusSchematicsVersion() {
    return "~".concat(getSpartacusSchematicsVersion());
}
exports.getPrefixedSpartacusSchematicsVersion = getPrefixedSpartacusSchematicsVersion;
function getSpartacusCurrentFeatureLevel() {
    return package_json_1.version.split('.').slice(0, 2).join('.');
}
exports.getSpartacusCurrentFeatureLevel = getSpartacusCurrentFeatureLevel;
function checkIfSSRIsUsed(tree) {
    var projectName = (0, workspace_utils_1.getDefaultProjectNameFromWorkspace)(tree);
    var buffer = tree.read('angular.json');
    if (!buffer) {
        throw new schematics_1.SchematicsException('Could not find angular.json');
    }
    var angularFileBuffer = buffer.toString(constants_1.UTF_8);
    var angularJson = JSON.parse(angularFileBuffer);
    var isServerConfiguration = !!angularJson.projects[projectName].architect['server'];
    var serverFileLocation = (0, file_utils_1.getServerTsPath)(tree);
    if (!serverFileLocation) {
        return false;
    }
    var serverBuffer = tree.read(serverFileLocation);
    var serverFileBuffer = serverBuffer === null || serverBuffer === void 0 ? void 0 : serverBuffer.toString(constants_1.UTF_8);
    var isServerSideAvailable = serverFileBuffer && !!serverFileBuffer.length;
    return !!(isServerConfiguration && isServerSideAvailable);
}
exports.checkIfSSRIsUsed = checkIfSSRIsUsed;
function prepareSpartacusDependencies() {
    var spartacusVersion = getPrefixedSpartacusSchematicsVersion();
    var spartacusDependencies = [
        {
            type: dependencies_1.NodeDependencyType.Default,
            version: spartacusVersion,
            name: libs_constants_1.SPARTACUS_CORE
        },
        {
            type: dependencies_1.NodeDependencyType.Default,
            version: spartacusVersion,
            name: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            type: dependencies_1.NodeDependencyType.Default,
            version: spartacusVersion,
            name: libs_constants_1.SPARTACUS_ASSETS
        },
        {
            type: dependencies_1.NodeDependencyType.Default,
            version: spartacusVersion,
            name: libs_constants_1.SPARTACUS_STYLES
        },
    ];
    return spartacusDependencies;
}
exports.prepareSpartacusDependencies = prepareSpartacusDependencies;
function prepare3rdPartyDependencies() {
    var thirdPartyDependencies = createDependencies(__assign(__assign(__assign(__assign({}, dependencies_json_1["default"][libs_constants_1.SPARTACUS_CORE]), dependencies_json_1["default"][libs_constants_1.SPARTACUS_STOREFRONTLIB]), dependencies_json_1["default"][libs_constants_1.SPARTACUS_STYLES]), dependencies_json_1["default"][libs_constants_1.SPARTACUS_ASSETS]));
    return thirdPartyDependencies;
}
exports.prepare3rdPartyDependencies = prepare3rdPartyDependencies;
function updatePackageJsonDependencies(dependencies, packageJson) {
    return function (tree, context) {
        var dependenciesToAdd = [];
        for (var _i = 0, dependencies_2 = dependencies; _i < dependencies_2.length; _i++) {
            var dependency = dependencies_2[_i];
            var currentVersion = getCurrentDependencyVersion(dependency, packageJson);
            if (!currentVersion) {
                dependenciesToAdd.push(dependency);
                continue;
            }
            if (semver_1["default"].satisfies(currentVersion, dependency.version)) {
                continue;
            }
            var versionToUpdate = semver_1["default"].parse(cleanSemverVersion(dependency.version));
            if (!versionToUpdate || semver_1["default"].eq(versionToUpdate, currentVersion)) {
                continue;
            }
            (0, dependencies_1.addPackageJsonDependency)(tree, __assign(__assign({}, dependency), { overwrite: true }));
            var change = semver_1["default"].gt(versionToUpdate, currentVersion)
                ? 'Upgrading'
                : 'Downgrading';
            context.logger.info("\uD83E\uDE79 ".concat(change, " '").concat(dependency.name, "' to ").concat(dependency.version, " (was ").concat(currentVersion.raw, ")"));
        }
        return (0, lib_utils_1.addPackageJsonDependencies)(dependenciesToAdd, packageJson);
    };
}
exports.updatePackageJsonDependencies = updatePackageJsonDependencies;
function getCurrentDependencyVersion(dependency, packageJson) {
    if (!(0, lib_utils_1.dependencyExists)(dependency, packageJson)) {
        return null;
    }
    var dependencies = packageJson[dependency.type];
    var currentVersion = dependencies[dependency.name];
    return semver_1["default"].parse(cleanSemverVersion(currentVersion));
}
//# sourceMappingURL=package-utils.js.map