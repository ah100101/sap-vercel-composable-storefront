"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrateConstructorDeprecation = void 0;
var ast_utils_1 = require("@schematics/angular/utility/ast-utils");
var file_utils_1 = require("../../../shared/utils/file-utils");
var workspace_utils_1 = require("../../../shared/utils/workspace-utils");
function migrateConstructorDeprecation(tree, context, constructorDeprecations) {
    context.logger.info('Checking constructor deprecations...');
    var project = (0, workspace_utils_1.getSourceRoot)(tree, {});
    var sourceFiles = (0, file_utils_1.getAllTsSourceFiles)(tree, project);
    for (var _i = 0, sourceFiles_1 = sourceFiles; _i < sourceFiles_1.length; _i++) {
        var originalSource = sourceFiles_1[_i];
        var sourcePath = originalSource.fileName;
        for (var _a = 0, constructorDeprecations_1 = constructorDeprecations; _a < constructorDeprecations_1.length; _a++) {
            var constructorDeprecation = constructorDeprecations_1[_a];
            if (!(0, file_utils_1.isCandidateForConstructorDeprecation)(originalSource, constructorDeprecation)) {
                continue;
            }
            for (var _b = 0, _c = constructorDeprecation.addParams ||
                []; _b < _c.length; _b++) {
                var newConstructorParam = _c[_b];
                // 'source' has to be reloaded after each committed change
                var source = (0, file_utils_1.getTsSourceFile)(tree, sourcePath);
                var nodes = (0, ast_utils_1.getSourceNodes)(source);
                var constructorNode = (0, file_utils_1.findConstructor)(nodes);
                var changes = (0, file_utils_1.addConstructorParam)(source, sourcePath, constructorNode, newConstructorParam);
                (0, file_utils_1.commitChanges)(tree, sourcePath, changes, file_utils_1.InsertDirection.RIGHT);
            }
            for (var _d = 0, _e = constructorDeprecation.removeParams ||
                []; _d < _e.length; _d++) {
                var constructorParamToRemove = _e[_d];
                // 'source' has to be reloaded after each committed change
                var source = (0, file_utils_1.getTsSourceFile)(tree, sourcePath);
                var nodes = (0, ast_utils_1.getSourceNodes)(source);
                var constructorNode = (0, file_utils_1.findConstructor)(nodes);
                var changes = (0, file_utils_1.removeConstructorParam)(source, sourcePath, constructorNode, constructorParamToRemove);
                (0, file_utils_1.commitChanges)(tree, sourcePath, changes, file_utils_1.InsertDirection.RIGHT);
            }
        }
    }
    return tree;
}
exports.migrateConstructorDeprecation = migrateConstructorDeprecation;
//# sourceMappingURL=constructor-deprecations.js.map