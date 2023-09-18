"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.migrateDependencies = void 0;
var schematics_1 = require("@angular-devkit/schematics");
var dependencies_json_1 = __importDefault(require("../../../dependencies.json"));
var libs_constants_1 = require("../../../shared/libs-constants");
var dependency_utils_1 = require("../../../shared/utils/dependency-utils");
var lib_utils_1 = require("../../../shared/utils/lib-utils");
var package_utils_1 = require("../../../shared/utils/package-utils");
function migrateDependencies(tree, context, removedDependencies) {
    var packageJson = (0, package_utils_1.readPackageJson)(tree);
    var _a = collectSpartacusLibraryDependencies(packageJson), spartacusPeerDeps = _a.spartacusPeerDeps, installedLibs = _a.installedLibs;
    var allSpartacusDeps = installedLibs.concat(spartacusPeerDeps);
    checkAndLogRemovedDependencies(packageJson, allSpartacusDeps, removedDependencies, context.logger);
    var dependencies = createSpartacusLibraryDependencies(allSpartacusDeps, installedLibs)
        .filter(function (d) { return d.name !== libs_constants_1.SPARTACUS_SCHEMATICS; })
        .sort(function (d1, d2) { return d1.name.localeCompare(d2.name); });
    return (0, schematics_1.chain)([
        (0, package_utils_1.updatePackageJsonDependencies)(dependencies, packageJson),
        (0, lib_utils_1.installPackageJsonDependencies)(),
    ]);
}
exports.migrateDependencies = migrateDependencies;
function collectSpartacusLibraryDependencies(packageJson) {
    var dependencies = packageJson.dependencies;
    var installedLibs = Object.keys(dependencies).filter(function (dependency) {
        return dependency.startsWith(libs_constants_1.SPARTACUS_SCOPE);
    });
    var spartacusPeerDeps = (0, dependency_utils_1.analyzeCrossLibraryDependenciesByLibraries)(installedLibs);
    return {
        installedLibs: installedLibs,
        spartacusPeerDeps: spartacusPeerDeps
    };
}
function createSpartacusLibraryDependencies(allSpartacusLibraries, skipScopes) {
    var dependenciesToAdd = [];
    for (var _i = 0, allSpartacusLibraries_1 = allSpartacusLibraries; _i < allSpartacusLibraries_1.length; _i++) {
        var libraryName = allSpartacusLibraries_1[_i];
        var spartacusLibrary = dependencies_json_1["default"][libraryName];
        var newDependencies = (0, package_utils_1.createDependencies)(spartacusLibrary, {
            skipScopes: skipScopes,
            overwrite: true
        });
        // ensure no duplicates are created
        newDependencies.forEach(function (newDependency) {
            if (!dependenciesToAdd.some(function (existingDependency) { return existingDependency.name === newDependency.name; })) {
                dependenciesToAdd.push(newDependency);
            }
        });
    }
    return dependenciesToAdd;
}
function checkAndLogRemovedDependencies(packageJson, installedSpartacusLibs, removedDependencies, logger) {
    var _a;
    var allSpartacusDeps = [];
    for (var _i = 0, installedSpartacusLibs_1 = installedSpartacusLibs; _i < installedSpartacusLibs_1.length; _i++) {
        var libraryName = installedSpartacusLibs_1[_i];
        var spartacusLibrary = dependencies_json_1["default"][libraryName];
        allSpartacusDeps = allSpartacusDeps.concat(Object.keys(spartacusLibrary));
    }
    var dependencies = (_a = packageJson.dependencies) !== null && _a !== void 0 ? _a : {};
    var removed = [];
    for (var _b = 0, removedDependencies_1 = removedDependencies; _b < removedDependencies_1.length; _b++) {
        var removedDependency = removedDependencies_1[_b];
        if (!dependencies[removedDependency]) {
            continue;
        }
        if (!allSpartacusDeps.includes(removedDependency)) {
            removed.push(removedDependency);
        }
    }
    if (removed.length) {
        logger.warn("Spartacus libraries no longer require the following dependencies: ".concat(removed.join(','), ". If you don't use these dependencies in your application, you might want to consider removing them from your dependencies list."));
    }
}
//# sourceMappingURL=dependency-management.js.map