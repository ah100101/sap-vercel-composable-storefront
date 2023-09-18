"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrateConfigDeprecation = void 0;
var file_utils_1 = require("../../../shared/utils/file-utils");
var workspace_utils_1 = require("../../../shared/utils/workspace-utils");
function migrateConfigDeprecation(tree, _context, configDeprecations) {
    var project = (0, workspace_utils_1.getSourceRoot)(tree);
    var sourceFiles = (0, file_utils_1.getAllTsSourceFiles)(tree, project);
    for (var _i = 0, sourceFiles_1 = sourceFiles; _i < sourceFiles_1.length; _i++) {
        var source = sourceFiles_1[_i];
        var sourcePath = source.fileName;
        for (var _a = 0, configDeprecations_1 = configDeprecations; _a < configDeprecations_1.length; _a++) {
            var configDeprecation = configDeprecations_1[_a];
            var changes = (0, file_utils_1.insertCommentAboveConfigProperty)(sourcePath, source, configDeprecation.propertyName, configDeprecation.comment);
            (0, file_utils_1.commitChanges)(tree, sourcePath, changes, file_utils_1.InsertDirection.RIGHT);
        }
    }
    return tree;
}
exports.migrateConfigDeprecation = migrateConfigDeprecation;
//# sourceMappingURL=config-deprecation.js.map