"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDynamicImport = exports.isRelative = exports.staticImportExists = exports.createImports = exports.getDynamicImportPropertyAccess = exports.getDynamicImportImportPath = exports.getDynamicImportCallExpression = exports.collectDynamicImports = exports.getImportDeclaration = exports.getImportPath = exports.isImportedFrom = exports.isImportedFromSpartacusCoreLib = exports.isImportedFromSpartacusLibs = void 0;
const ts_morph_1 = require("ts-morph");
const libs_constants_1 = require("../libs-constants");
const config_utils_1 = require("./config-utils");
/**
 * Checks if the provided import is a Spartacus library.
 */
function isImportedFromSpartacusLibs(node) {
    return isImportedFrom(node, libs_constants_1.SPARTACUS_SCOPE);
}
exports.isImportedFromSpartacusLibs = isImportedFromSpartacusLibs;
/**
 * Checks if the provided imports is a core Spartacus library.
 */
function isImportedFromSpartacusCoreLib(node) {
    for (const coreScope of libs_constants_1.CORE_SPARTACUS_SCOPES) {
        if (isImportedFrom(node, coreScope)) {
            return true;
        }
    }
    return false;
}
exports.isImportedFromSpartacusCoreLib = isImportedFromSpartacusCoreLib;
function isImportedFrom(node, toCheck) {
    var _a;
    let moduleImportPath;
    if (typeof node === 'string') {
        moduleImportPath = node;
    }
    else {
        moduleImportPath = (_a = getImportPath(node)) !== null && _a !== void 0 ? _a : '';
    }
    return moduleImportPath.startsWith(toCheck);
}
exports.isImportedFrom = isImportedFrom;
function getImportPath(node) {
    const declaration = getImportDeclaration(node);
    if (declaration) {
        return declaration.getModuleSpecifierValue();
    }
    return undefined;
}
exports.getImportPath = getImportPath;
function getImportDeclaration(node) {
    const references = node.findReferencesAsNodes();
    for (const reference of references) {
        const importDeclaration = reference === null || reference === void 0 ? void 0 : reference.getFirstAncestorByKind(ts_morph_1.ts.SyntaxKind.ImportDeclaration);
        if (importDeclaration) {
            return importDeclaration;
        }
    }
    return undefined;
}
exports.getImportDeclaration = getImportDeclaration;
/**
 * Collects the higher-order arrow functions.
 * E.g. `() => import('@spartacus/cart/base/components/add-to-cart').then((m) => m.AddToCartModule)`,
 * but not the inner one `(m) => m.AddToCartModule`.
 */
function collectDynamicImports(source) {
    const providers = (0, config_utils_1.getSpartacusProviders)(source, false);
    let arrowFunctions = [];
    for (const element of providers) {
        const higherArrowFunctions = element
            .getDescendantsOfKind(ts_morph_1.ts.SyntaxKind.ArrowFunction)
            .filter((arrowFn) => arrowFn.getParentIfKind(ts_morph_1.ts.SyntaxKind.PropertyAssignment));
        arrowFunctions = arrowFunctions.concat(higherArrowFunctions);
    }
    return arrowFunctions;
}
exports.collectDynamicImports = collectDynamicImports;
/**
 * Returns the call expression of the dynamic import (if any).
 * E.g. for the given `() => import('@spartacus/cart/base').then((m) => m.CartBaseModule)` it returns `import('@spartacus/cart/base')`
 */
function getDynamicImportCallExpression(arrowFunction) {
    var _a;
    return (_a = arrowFunction
        .getFirstDescendantByKind(ts_morph_1.ts.SyntaxKind.ImportKeyword)) === null || _a === void 0 ? void 0 : _a.getParentIfKind(ts_morph_1.ts.SyntaxKind.CallExpression);
}
exports.getDynamicImportCallExpression = getDynamicImportCallExpression;
/**
 * Returns the import path, e.g. @spartacus/cart/base
 */
function getDynamicImportImportPath(arrowFunction) {
    var _a, _b;
    return (_b = (_a = getDynamicImportCallExpression(arrowFunction)) === null || _a === void 0 ? void 0 : _a.getFirstDescendantByKind(ts_morph_1.ts.SyntaxKind.StringLiteral)) === null || _b === void 0 ? void 0 : _b.getLiteralValue();
}
exports.getDynamicImportImportPath = getDynamicImportImportPath;
/**
 * Returns the import module of the dynamic import (if any).
 * E.g. for the given `() => import('@spartacus/cart/base').then((m) => m.CartBaseModule)` it returns `m.CartBaseModule`
 */
function getDynamicImportPropertyAccess(arrowFunction) {
    var _a;
    return (_a = arrowFunction
        .getFirstDescendantByKind(ts_morph_1.ts.SyntaxKind.ArrowFunction)) === null || _a === void 0 ? void 0 : _a.getFirstDescendantByKind(ts_morph_1.ts.SyntaxKind.PropertyAccessExpression);
}
exports.getDynamicImportPropertyAccess = getDynamicImportPropertyAccess;
/**
 * Creates the import statement in the given source file.
 */
function createImports(sourceFile, imports) {
    const importDeclarations = [];
    [].concat(imports).forEach((specifiedImport) => {
        const importDeclaration = sourceFile.addImportDeclaration({
            moduleSpecifier: specifiedImport.moduleSpecifier,
            namedImports: specifiedImport.namedImports,
        });
        importDeclarations.push(importDeclaration);
    });
    return importDeclarations;
}
exports.createImports = createImports;
/**
 * Searches through the given module's imports
 * for the given import path and import name.
 */
function staticImportExists(sourceFile, importPathToFind, moduleNameToFind) {
    var _a, _b;
    const importDeclarations = sourceFile.getImportDeclarations();
    for (const importDeclaration of importDeclarations) {
        const importPath = importDeclaration.getModuleSpecifierValue();
        if (importPathToFind === importPath) {
            const namedImports = (_b = (_a = importDeclaration.getImportClause()) === null || _a === void 0 ? void 0 : _a.getNamedImports()) !== null && _b !== void 0 ? _b : [];
            for (const namedImport of namedImports) {
                if (namedImport.getName() === moduleNameToFind) {
                    return true;
                }
            }
        }
    }
    return false;
}
exports.staticImportExists = staticImportExists;
/**
 * Returns true if the given path is relative
 */
function isRelative(path) {
    return path.startsWith('./') || path.startsWith('../');
}
exports.isRelative = isRelative;
/**
 * Analyzes the dynamic imports of the given module.
 * If both dynamic import's import path and module name
 * are found in the given config, it returns it.
 */
function findDynamicImport(sourceFile, importToFind) {
    var _a, _b, _c, _d;
    const collectedDynamicImports = collectDynamicImports(sourceFile);
    for (const dynamicImport of collectedDynamicImports) {
        const importPath = (_a = getDynamicImportImportPath(dynamicImport)) !== null && _a !== void 0 ? _a : '';
        if (isRelative(importPath)) {
            if (!importPath.includes(importToFind.moduleSpecifier)) {
                continue;
            }
        }
        else {
            if (importPath !== importToFind.moduleSpecifier) {
                continue;
            }
        }
        const importModule = (_d = (_c = (_b = getDynamicImportPropertyAccess(dynamicImport)) === null || _b === void 0 ? void 0 : _b.getLastChildByKind(ts_morph_1.ts.SyntaxKind.Identifier)) === null || _c === void 0 ? void 0 : _c.getText()) !== null && _d !== void 0 ? _d : '';
        if (importToFind.namedImports.includes(importModule)) {
            return dynamicImport;
        }
    }
    return undefined;
}
exports.findDynamicImport = findDynamicImport;
//# sourceMappingURL=import-utils.js.map