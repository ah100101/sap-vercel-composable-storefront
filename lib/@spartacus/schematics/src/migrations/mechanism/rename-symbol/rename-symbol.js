"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrateRenamedSymbols = void 0;
var program_1 = require("../../../shared/utils/program");
var project_tsconfig_paths_1 = require("../../../shared/utils/project-tsconfig-paths");
var workspace_utils_1 = require("../../../shared/utils/workspace-utils");
function migrateRenamedSymbols(tree, renamedSymbols) {
    var project = (0, workspace_utils_1.getDefaultProjectNameFromWorkspace)(tree);
    var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, project).buildPaths;
    var basePath = process.cwd();
    for (var _i = 0, buildPaths_1 = buildPaths; _i < buildPaths_1.length; _i++) {
        var tsconfigPath = buildPaths_1[_i];
        var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
        appSourceFiles.forEach(function (sourceFile) {
            var importDeclarationStructures = [];
            sourceFile.getImportDeclarations().forEach(function (id) {
                var _a;
                (_a = id.getImportClause()) === null || _a === void 0 ? void 0 : _a.getNamedImports().forEach(function (namedImport) {
                    var _a, _b, _c;
                    var importName = namedImport.getName();
                    var renamedSymbol = renamedSymbols.find(function (symbol) {
                        return symbol.previousNode === importName &&
                            symbol.previousImportPath === id.getModuleSpecifierValue();
                    });
                    if (renamedSymbol) {
                        var newNodeName = renamedSymbol.newNode
                            ? renamedSymbol.newNode
                            : importName;
                        var oldAlias = (_a = namedImport.getAliasNode()) === null || _a === void 0 ? void 0 : _a.getText();
                        var importPath = renamedSymbol.previousImportPath;
                        if (renamedSymbol.newImportPath) {
                            importPath = renamedSymbol.newImportPath;
                        }
                        if (!oldAlias && renamedSymbol.newNode) {
                            namedImport.renameAlias(newNodeName);
                        }
                        importDeclarationStructures.push({
                            namedImports: [
                                {
                                    name: newNodeName,
                                    alias: oldAlias
                                },
                            ],
                            moduleSpecifier: importPath
                        });
                        if ((((_c = (_b = id.getImportClause()) === null || _b === void 0 ? void 0 : _b.getNamedImports()) === null || _c === void 0 ? void 0 : _c.length) || 0) > 1) {
                            namedImport.remove();
                        }
                        else {
                            id.remove();
                        }
                    }
                });
            });
            if (importDeclarationStructures.length) {
                sourceFile.addImportDeclarations(importDeclarationStructures);
                // organizeImports will remove unused imports
                (0, program_1.saveAndFormat)(sourceFile);
            }
        });
    }
    return tree;
}
exports.migrateRenamedSymbols = migrateRenamedSymbols;
//# sourceMappingURL=rename-symbol.js.map