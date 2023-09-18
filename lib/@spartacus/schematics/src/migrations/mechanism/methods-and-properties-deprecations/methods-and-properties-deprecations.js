"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.buildMethodComment = exports.migrateMethodPropertiesDeprecation = void 0;
var ast_utils_1 = require("@schematics/angular/utility/ast-utils");
var constants_1 = require("../../../shared/constants");
var file_utils_1 = require("../../../shared/utils/file-utils");
var workspace_utils_1 = require("../../../shared/utils/workspace-utils");
function migrateMethodPropertiesDeprecation(tree, _context, methodProperties) {
    var project = (0, workspace_utils_1.getSourceRoot)(tree, {});
    var sourceFiles = (0, file_utils_1.getAllTsSourceFiles)(tree, project);
    for (var _i = 0, sourceFiles_1 = sourceFiles; _i < sourceFiles_1.length; _i++) {
        var originalSource = sourceFiles_1[_i];
        var sourcePath = originalSource.fileName;
        for (var _a = 0, methodProperties_1 = methodProperties; _a < methodProperties_1.length; _a++) {
            var data = methodProperties_1[_a];
            // 'source' has to be reloaded after each committed change
            var source = (0, file_utils_1.getTsSourceFile)(tree, sourcePath);
            if ((0, ast_utils_1.isImported)(source, data["class"], data.importPath)) {
                var changes = (0, file_utils_1.insertCommentAboveIdentifier)(sourcePath, source, data.deprecatedNode, data.comment
                    ? "".concat(data.comment, "\n")
                    : "".concat(buildMethodComment(data.deprecatedNode, data.newNode), "\n"));
                (0, file_utils_1.commitChanges)(tree, sourcePath, changes, file_utils_1.InsertDirection.RIGHT);
            }
        }
    }
    return tree;
}
exports.migrateMethodPropertiesDeprecation = migrateMethodPropertiesDeprecation;
function buildMethodComment(oldApiMethod, newApiMethod) {
    var comment = "// ".concat(constants_1.TODO_SPARTACUS, " '").concat(oldApiMethod, "' has been removed.");
    return newApiMethod
        ? "".concat(comment, " Please try using '").concat(newApiMethod, "' instead.")
        : comment;
}
exports.buildMethodComment = buildMethodComment;
//# sourceMappingURL=methods-and-properties-deprecations.js.map