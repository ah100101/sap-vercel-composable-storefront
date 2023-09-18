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
exports.getAppModule = exports.getTemplateInfo = exports.buildRelativePath = exports.addToModuleImportsAndCommitChanges = exports.addToMetadata = exports.addToModuleProviders = exports.addToModuleExports = exports.addToModuleDeclarations = exports.addToModuleImports = exports.createImportChange = exports.addImport = exports.stripTsFromImport = void 0;
var core_1 = require("@angular-devkit/core");
var schematics_1 = require("@angular-devkit/schematics");
var ast_utils_1 = require("@schematics/angular/utility/ast-utils");
var change_1 = require("@schematics/angular/utility/change");
var ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
var typescript_1 = __importDefault(require("typescript"));
var constants_1 = require("../constants");
var file_utils_1 = require("./file-utils");
var workspace_utils_1 = require("./workspace-utils");
function stripTsFromImport(importPath) {
    if (!importPath.endsWith('.ts')) {
        return importPath;
    }
    return importPath.slice(0, importPath.length - 3);
}
exports.stripTsFromImport = stripTsFromImport;
function addImport(host, filePath, importText, importPath) {
    var moduleSource = (0, file_utils_1.getTsSourceFile)(host, filePath);
    if (!(0, ast_utils_1.isImported)(moduleSource, importText, importPath)) {
        var change = (0, ast_utils_1.insertImport)(moduleSource, filePath, importText, importPath);
        (0, file_utils_1.commitChanges)(host, filePath, [change], file_utils_1.InsertDirection.LEFT);
    }
}
exports.addImport = addImport;
function createImportChange(host, filePath, importText, importPath) {
    var source = (0, file_utils_1.getTsSourceFile)(host, filePath);
    if ((0, ast_utils_1.isImported)(source, importText, importPath)) {
        return new change_1.NoopChange();
    }
    return (0, ast_utils_1.insertImport)(source, filePath, importText, importPath);
}
exports.createImportChange = createImportChange;
function addToModuleImports(host, modulePath, importText, moduleSource) {
    return addToMetadata(host, modulePath, importText, 'imports', moduleSource);
}
exports.addToModuleImports = addToModuleImports;
function addToModuleDeclarations(host, modulePath, declarations, moduleSource) {
    return addToMetadata(host, modulePath, declarations, 'declarations', moduleSource);
}
exports.addToModuleDeclarations = addToModuleDeclarations;
function addToModuleExports(host, modulePath, exportsText, moduleSource) {
    return addToMetadata(host, modulePath, exportsText, 'exports', moduleSource);
}
exports.addToModuleExports = addToModuleExports;
function addToModuleProviders(host, modulePath, importText, moduleSource) {
    return addToMetadata(host, modulePath, importText, 'providers', moduleSource);
}
exports.addToModuleProviders = addToModuleProviders;
function addToMetadata(host, modulePath, text, metadataType, moduleSource) {
    moduleSource = moduleSource || (0, file_utils_1.getTsSourceFile)(host, modulePath);
    return (0, ast_utils_1.addSymbolToNgModuleMetadata)(moduleSource, modulePath, metadataType, text);
}
exports.addToMetadata = addToMetadata;
function addToModuleImportsAndCommitChanges(host, modulePath, importText) {
    var metadataChanges = addToModuleImports(host, modulePath, importText);
    (0, file_utils_1.commitChanges)(host, modulePath, metadataChanges, file_utils_1.InsertDirection.RIGHT);
}
exports.addToModuleImportsAndCommitChanges = addToModuleImportsAndCommitChanges;
// as this is copied from angular source, no need to test it
/**
 * Build a relative path from one file path to another file path.
 */
function buildRelativePath(from, to) {
    from = (0, core_1.normalize)(from);
    to = (0, core_1.normalize)(to);
    // Convert to arrays.
    var fromParts = from.split('/');
    var toParts = to.split('/');
    // Remove file names (preserving destination)
    fromParts.pop();
    var toFileName = toParts.pop();
    var relativePath = (0, core_1.relative)((0, core_1.normalize)(fromParts.join('/') || '/'), (0, core_1.normalize)(toParts.join('/') || '/'));
    var pathPrefix = '';
    // Set the path prefix for same dir or child dir, parent dir starts with `..`
    if (!relativePath) {
        pathPrefix = '.';
    }
    else if (!relativePath.startsWith('.')) {
        pathPrefix = "./";
    }
    if (pathPrefix && !pathPrefix.endsWith('/')) {
        pathPrefix += '/';
    }
    return pathPrefix + (relativePath ? relativePath + '/' : '') + toFileName;
}
exports.buildRelativePath = buildRelativePath;
function getTemplateInfo(source) {
    var fileUrlResult = getTemplateUrlOrInlineTemplate(source, 'templateUrl');
    if (fileUrlResult) {
        return { templateUrl: fileUrlResult.contentOrUrl };
    }
    // if the 'templateUrl' is not specified, check for the inline template
    var inlineTemplateResult = getTemplateUrlOrInlineTemplate(source, 'template');
    if (inlineTemplateResult) {
        return {
            inlineTemplateContent: inlineTemplateResult.contentOrUrl,
            inlineTemplateStart: inlineTemplateResult.start
        };
    }
    return undefined;
}
exports.getTemplateInfo = getTemplateInfo;
function getTemplateUrlOrInlineTemplate(source, templateOrTemplateUrl) {
    var decorator = (0, ast_utils_1.getDecoratorMetadata)(source, 'Component', constants_1.ANGULAR_CORE)[0];
    if (!decorator) {
        return undefined;
    }
    var templateMetadata = (0, file_utils_1.getMetadataProperty)(decorator, templateOrTemplateUrl);
    if (!templateMetadata) {
        return undefined;
    }
    var stringNode;
    stringNode = stringNode = (0, ast_utils_1.findNodes)(templateMetadata, typescript_1["default"].SyntaxKind.NoSubstitutionTemplateLiteral)[0];
    if (!stringNode) {
        // fallback to single/double quotes
        stringNode = (0, ast_utils_1.findNodes)(templateMetadata, typescript_1["default"].SyntaxKind.StringLiteral)[0];
    }
    if (!stringNode) {
        return undefined;
    }
    var result = stringNode.text.trim();
    if (templateOrTemplateUrl === 'templateUrl') {
        var url = result.replace('./', '');
        return { contentOrUrl: url };
    }
    return {
        contentOrUrl: result,
        start: stringNode.getStart() + 1
    };
}
function getAppModule(host, project) {
    var projectTargets = (0, workspace_utils_1.getProjectTargets)(host, project);
    if (!projectTargets.build) {
        throw new schematics_1.SchematicsException("Project target \"build\" not found.");
    }
    var mainPath = projectTargets.build.options.main;
    return (0, ng_ast_utils_1.getAppModulePath)(host, mainPath);
}
exports.getAppModule = getAppModule;
//# sourceMappingURL=module-file-utils.js.map