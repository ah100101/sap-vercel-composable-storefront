"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrateComponentMigration = void 0;
var ast_utils_1 = require("@schematics/angular/utility/ast-utils");
var change_1 = require("@schematics/angular/utility/change");
var constants_1 = require("../../../shared/constants");
var file_utils_1 = require("../../../shared/utils/file-utils");
var module_file_utils_1 = require("../../../shared/utils/module-file-utils");
var workspace_utils_1 = require("../../../shared/utils/workspace-utils");
function migrateComponentMigration(tree, context, componentData, angularCompiler) {
    context.logger.info('Checking component selectors...');
    var project = (0, workspace_utils_1.getSourceRoot)(tree, {});
    var sourceFiles = (0, file_utils_1.getAllTsSourceFiles)(tree, project);
    for (var _i = 0, sourceFiles_1 = sourceFiles; _i < sourceFiles_1.length; _i++) {
        var originalSource = sourceFiles_1[_i];
        var nodes = (0, ast_utils_1.getSourceNodes)(originalSource);
        var sourcePath = originalSource.fileName;
        for (var _a = 0, componentData_1 = componentData; _a < componentData_1.length; _a++) {
            var deprecatedComponent = componentData_1[_a];
            // check for usages of inputs / outputs of the deprecated component
            var sourceRoot = (0, workspace_utils_1.getSourceRoot)(tree);
            var allHtmlFiles = (0, file_utils_1.getHtmlFiles)(tree, '.html', sourceRoot);
            for (var _b = 0, allHtmlFiles_1 = allHtmlFiles; _b < allHtmlFiles_1.length; _b++) {
                var htmlFile = allHtmlFiles_1[_b];
                overwriteRemovedProperties(tree, context, htmlFile, deprecatedComponent);
            }
            // check for usages of the deprecated component properties in the .ts and the corresponding template (.html) files
            if ((0, file_utils_1.isInheriting)(nodes, deprecatedComponent.componentClassName)) {
                overwriteInheritedRemovedProperties(tree, context, angularCompiler, sourcePath, sourceRoot, deprecatedComponent);
            }
        }
    }
    return tree;
}
exports.migrateComponentMigration = migrateComponentMigration;
function overwriteRemovedProperties(tree, context, htmlFile, deprecatedComponent) {
    for (var _i = 0, _a = deprecatedComponent.removedInputOutputProperties ||
        []; _i < _a.length; _i++) {
        var removedProperty = _a[_i];
        var buffer = tree.read(htmlFile);
        if (!buffer) {
            context.logger.warn("Could not read file (".concat(htmlFile, ")."));
            continue;
        }
        var content = buffer.toString(constants_1.UTF_8);
        var contentChange = (0, file_utils_1.insertComponentSelectorComment)(content, deprecatedComponent.selector, removedProperty);
        overwriteChanges(tree, htmlFile, contentChange);
    }
}
function overwriteInheritedRemovedProperties(tree, context, angularCompiler, sourcePath, sourceRoot, deprecatedComponent) {
    for (var _i = 0, _a = deprecatedComponent.removedProperties || []; _i < _a.length; _i++) {
        var removedProperty = _a[_i];
        // 'source' has to be reloaded after each committed change
        var source = (0, file_utils_1.getTsSourceFile)(tree, sourcePath);
        var changes = (0, file_utils_1.insertCommentAboveIdentifier)(sourcePath, source, removedProperty.name, (0, file_utils_1.buildSpartacusComment)(removedProperty.comment));
        var templateInfo = (0, module_file_utils_1.getTemplateInfo)(source);
        if (!templateInfo) {
            (0, file_utils_1.commitChanges)(tree, sourcePath, changes, file_utils_1.InsertDirection.RIGHT);
            continue;
        }
        var htmlFileName = templateInfo.templateUrl;
        if (htmlFileName) {
            var htmlFilePath = (0, file_utils_1.getHtmlFiles)(tree, htmlFileName, sourceRoot)[0];
            var buffer = tree.read(htmlFilePath);
            if (!buffer) {
                context.logger.warn("Could not read file (".concat(htmlFilePath, ")."));
                (0, file_utils_1.commitChanges)(tree, sourcePath, changes, file_utils_1.InsertDirection.RIGHT);
                continue;
            }
            var content = buffer.toString(constants_1.UTF_8);
            var contentChange = (0, file_utils_1.insertHtmlComment)(content, removedProperty, angularCompiler);
            overwriteChanges(tree, htmlFilePath, contentChange);
        }
        else if (templateInfo.inlineTemplateContent) {
            var oldContent = templateInfo.inlineTemplateContent;
            var contentChange = (0, file_utils_1.insertHtmlComment)(oldContent, removedProperty, angularCompiler);
            if (contentChange) {
                var replaceChange = new change_1.ReplaceChange(sourcePath, templateInfo.inlineTemplateStart || 0, oldContent, contentChange);
                changes.push(replaceChange);
            }
        }
        (0, file_utils_1.commitChanges)(tree, sourcePath, changes, file_utils_1.InsertDirection.RIGHT);
    }
}
function overwriteChanges(tree, htmlFile, contentChange) {
    if (contentChange) {
        tree.overwrite(htmlFile, contentChange);
    }
}
//# sourceMappingURL=component-deprecations.js.map