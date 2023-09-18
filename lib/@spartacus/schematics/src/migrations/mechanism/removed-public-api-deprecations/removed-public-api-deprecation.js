"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.removedPublicApiDeprecation = void 0;
var constants_1 = require("../../../shared/constants");
var file_utils_1 = require("../../../shared/utils/file-utils");
var workspace_utils_1 = require("../../../shared/utils/workspace-utils");
function removedPublicApiDeprecation(tree, context, removedNodes) {
    var _a;
    context.logger.info('Checking removed public api...');
    var project = (0, workspace_utils_1.getSourceRoot)(tree, {});
    var sourceFiles = (0, file_utils_1.getAllTsSourceFiles)(tree, project);
    for (var _i = 0, sourceFiles_1 = sourceFiles; _i < sourceFiles_1.length; _i++) {
        var originalSource = sourceFiles_1[_i];
        var sourcePath = originalSource.fileName;
        for (var _b = 0, removedNodes_1 = removedNodes; _b < removedNodes_1.length; _b++) {
            var removedNode = removedNodes_1[_b];
            // 'source' has to be reloaded after each committed change
            var source = (0, file_utils_1.getTsSourceFile)(tree, sourcePath);
            var changes = (0, file_utils_1.insertCommentAboveImportIdentifier)(sourcePath, source, removedNode.node, removedNode.importPath, buildComment((_a = removedNode.comment) !== null && _a !== void 0 ? _a : "'".concat(removedNode.node, "' is no longer part of the public API. Please look into migration guide for more information")));
            (0, file_utils_1.commitChanges)(tree, sourcePath, changes, file_utils_1.InsertDirection.RIGHT);
        }
    }
    return tree;
}
exports.removedPublicApiDeprecation = removedPublicApiDeprecation;
function buildComment(content) {
    return "// ".concat(constants_1.TODO_SPARTACUS, " ").concat(content, "\n");
}
//# sourceMappingURL=removed-public-api-deprecation.js.map