"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModulePropertyInitializer = exports.getModule = exports.addModuleProvider = exports.addModuleDeclaration = exports.addModuleExport = exports.addModuleImport = exports.ensureModuleExists = void 0;
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const schematics_1 = require("@angular-devkit/schematics");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const ts_morph_1 = require("ts-morph");
const constants_1 = require("../constants");
const config_utils_1 = require("./config-utils");
const file_utils_1 = require("./file-utils");
const import_utils_1 = require("./import-utils");
const workspace_utils_1 = require("./workspace-utils");
function ensureModuleExists(options) {
    return (host) => {
        const modulePath = `${(0, workspace_utils_1.getSourceRoot)(host, { project: options.project })}/${options.path}`;
        const filePath = `${modulePath}/${(0, strings_1.dasherize)(options.name)}.module.ts`;
        if (host.exists(filePath)) {
            const moduleFile = (0, file_utils_1.getTsSourceFile)(host, filePath);
            const metadata = (0, ast_utils_1.getDecoratorMetadata)(moduleFile, 'NgModule', constants_1.ANGULAR_CORE)[0];
            if (metadata) {
                return (0, schematics_1.noop)();
            }
        }
        return (0, schematics_1.externalSchematic)(constants_1.ANGULAR_SCHEMATICS, 'module', {
            project: options.project,
            name: (0, strings_1.dasherize)(options.name),
            flat: true,
            commonModule: false,
            path: modulePath,
            module: options.module,
        });
    };
}
exports.ensureModuleExists = ensureModuleExists;
function addModuleImport(sourceFile, insertOptions, createIfMissing = true) {
    return addToModuleInternal(sourceFile, 'imports', insertOptions, createIfMissing);
}
exports.addModuleImport = addModuleImport;
function addModuleExport(sourceFile, insertOptions, createIfMissing = true) {
    return addToModuleInternal(sourceFile, 'exports', insertOptions, createIfMissing);
}
exports.addModuleExport = addModuleExport;
function addModuleDeclaration(sourceFile, insertOptions, createIfMissing = true) {
    return addToModuleInternal(sourceFile, 'declarations', insertOptions, createIfMissing);
}
exports.addModuleDeclaration = addModuleDeclaration;
function addModuleProvider(sourceFile, insertOptions, createIfMissing = true) {
    return addToModuleInternal(sourceFile, 'providers', insertOptions, createIfMissing);
}
exports.addModuleProvider = addModuleProvider;
function addToModuleInternal(sourceFile, propertyName, insertOptions, createIfMissing = true) {
    const initializer = getModulePropertyInitializer(sourceFile, propertyName, createIfMissing);
    if (!initializer) {
        return undefined;
    }
    if (isDuplication(initializer, propertyName, insertOptions.content)) {
        return undefined;
    }
    const imports = [].concat(insertOptions.import);
    (0, import_utils_1.createImports)(sourceFile, imports);
    let createdNode;
    if (insertOptions.order || insertOptions.order === 0) {
        initializer.insertElement(insertOptions.order, insertOptions.content);
    }
    else {
        createdNode = initializer.addElement(insertOptions.content);
    }
    return createdNode;
}
function isDuplication(initializer, propertyName, content) {
    if (propertyName !== 'providers') {
        return isTypeTokenDuplicate(initializer, content);
    }
    return (0, config_utils_1.isSpartacusConfigDuplicate)(content, initializer);
}
function isTypeTokenDuplicate(initializer, typeToken) {
    typeToken = normalizeTypeToken(typeToken);
    for (const element of initializer.getElements()) {
        const elementText = normalizeTypeToken(element.getText());
        if (elementText === typeToken) {
            return true;
        }
    }
    return false;
}
function getModule(sourceFile) {
    let moduleNode;
    function visitor(node) {
        if (ts_morph_1.Node.isCallExpression(node)) {
            const expression = node.getExpression();
            if (ts_morph_1.Node.isIdentifier(expression) &&
                expression.getText() === 'NgModule' &&
                (0, import_utils_1.isImportedFrom)(expression, constants_1.ANGULAR_CORE)) {
                moduleNode = node;
            }
        }
        node.forEachChild(visitor);
    }
    sourceFile.forEachChild(visitor);
    return moduleNode;
}
exports.getModule = getModule;
const COMMENT_REG_EXP = /\/\/.+/gm;
function normalizeTypeToken(token) {
    let newToken = token;
    newToken = newToken.replace(COMMENT_REG_EXP, '');
    newToken = newToken.trim();
    // strip down the trailing comma
    if (newToken.charAt(newToken.length - 1) === ',') {
        newToken = newToken.substring(0, newToken.length - 1);
    }
    return newToken;
}
function getModulePropertyInitializer(source, propertyName, createIfMissing = true) {
    const property = getModuleProperty(source, propertyName, createIfMissing);
    if (!property || !ts_morph_1.Node.isPropertyAssignment(property)) {
        return undefined;
    }
    return property.getInitializerIfKind(ts_morph_1.ts.SyntaxKind.ArrayLiteralExpression);
}
exports.getModulePropertyInitializer = getModulePropertyInitializer;
function getModuleProperty(source, propertyName, createIfMissing = true) {
    const moduleNode = getModule(source);
    if (!moduleNode) {
        return undefined;
    }
    const arg = moduleNode.getArguments()[0];
    if (!arg || !ts_morph_1.Node.isObjectLiteralExpression(arg)) {
        return undefined;
    }
    const property = arg.getProperty(propertyName);
    if (!property && createIfMissing) {
        arg.addPropertyAssignment({
            name: propertyName,
            initializer: '[]',
        });
    }
    return arg.getProperty(propertyName);
}
//# sourceMappingURL=new-module-utils.js.map