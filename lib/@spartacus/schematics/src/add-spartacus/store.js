"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.setupStoreModules = void 0;
var schematics_1 = require("@angular-devkit/schematics");
var constants_1 = require("../shared/constants");
var new_module_utils_1 = require("../shared/utils/new-module-utils");
var program_1 = require("../shared/utils/program");
var project_tsconfig_paths_1 = require("../shared/utils/project-tsconfig-paths");
/** Migration that ensures that we have correct Store modules set */
function setupStoreModules(options) {
    return function (tree, context) {
        if (options.debug) {
            context.logger.info("\u231B\uFE0F Setting up store module...");
        }
        var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, options.project).buildPaths;
        if (!buildPaths.length) {
            throw new schematics_1.SchematicsException('Could not find any tsconfig file. Cannot set Store modules.');
        }
        var basePath = process.cwd();
        for (var _i = 0, buildPaths_1 = buildPaths; _i < buildPaths_1.length; _i++) {
            var tsconfigPath = buildPaths_1[_i];
            configureStoreModules(tree, tsconfigPath, basePath);
        }
        if (options.debug) {
            context.logger.info("\u2705 Store module setup complete");
        }
        return tree;
    };
}
exports.setupStoreModules = setupStoreModules;
function configureStoreModules(tree, tsconfigPath, basePath) {
    var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
    for (var _i = 0, appSourceFiles_1 = appSourceFiles; _i < appSourceFiles_1.length; _i++) {
        var sourceFile = appSourceFiles_1[_i];
        if (!sourceFile.getFilePath().includes('app.module.ts')) {
            continue;
        }
        (0, new_module_utils_1.addModuleImport)(sourceFile, {
            "import": {
                moduleSpecifier: constants_1.NGRX_STORE,
                namedImports: ['StoreModule']
            },
            content: "StoreModule.forRoot({})"
        });
        (0, new_module_utils_1.addModuleImport)(sourceFile, {
            "import": {
                moduleSpecifier: constants_1.NGRX_EFFECTS,
                namedImports: ['EffectsModule']
            },
            content: "EffectsModule.forRoot([])"
        });
        (0, program_1.saveAndFormat)(sourceFile);
        break;
    }
}
//# sourceMappingURL=store.js.map