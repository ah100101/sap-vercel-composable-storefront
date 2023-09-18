"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrateMissingPackage = void 0;
var dependencies_1 = require("@schematics/angular/utility/dependencies");
var program_1 = require("../../../shared/utils/program");
var project_tsconfig_paths_1 = require("../../../shared/utils/project-tsconfig-paths");
var workspace_utils_1 = require("../../../shared/utils/workspace-utils");
function migrateMissingPackage(tree, context, missingPackageConfig) {
    var project = (0, workspace_utils_1.getDefaultProjectNameFromWorkspace)(tree);
    var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, project).buildPaths;
    var basePath = process.cwd();
    var foundImport = false;
    for (var _i = 0, buildPaths_1 = buildPaths; _i < buildPaths_1.length; _i++) {
        var tsconfigPath = buildPaths_1[_i];
        var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
        for (var _a = 0, appSourceFiles_1 = appSourceFiles; _a < appSourceFiles_1.length; _a++) {
            var sourceFile = appSourceFiles_1[_a];
            var importDeclarations = sourceFile.getImportDeclarations();
            for (var _b = 0, importDeclarations_1 = importDeclarations; _b < importDeclarations_1.length; _b++) {
                var id = importDeclarations_1[_b];
                if (id.getModuleSpecifierValue().startsWith(missingPackageConfig.package)) {
                    foundImport = true;
                    break;
                }
            }
            if (foundImport) {
                break;
            }
        }
    }
    if (foundImport) {
        warnIfPackageNotPresent();
    }
    return tree;
    function warnIfPackageNotPresent() {
        var _a;
        var packagePresent = (0, dependencies_1.getPackageJsonDependency)(tree, missingPackageConfig.package);
        if (!packagePresent) {
            var comment = (_a = missingPackageConfig === null || missingPackageConfig === void 0 ? void 0 : missingPackageConfig.comment) !== null && _a !== void 0 ? _a : "We've found imports from ".concat(missingPackageConfig.package, " package which is not installed. If you are using feature from this library you can configure it by running schematics `ng add ").concat(missingPackageConfig.package, "`. If you only need to install package add it with npm (`npm i ").concat(missingPackageConfig.package, "`) or yarn (`yarn add ").concat(missingPackageConfig.package, "`). If you are not using this package check why you have imports from this library.");
            context.logger.warn("".concat(comment, "\n"));
        }
    }
}
exports.migrateMissingPackage = migrateMissingPackage;
//# sourceMappingURL=missing-packages.js.map