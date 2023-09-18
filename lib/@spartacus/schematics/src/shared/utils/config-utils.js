"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getB2bConfiguration = exports.removeProperty = exports.normalizeObject = exports.isSpartacusConfigDuplicate = exports.getSpartacusProviders = void 0;
const ts_morph_1 = require("ts-morph");
const constants_1 = require("../constants");
const libs_constants_1 = require("../libs-constants");
const import_utils_1 = require("./import-utils");
const new_module_utils_1 = require("./new-module-utils");
function getSpartacusProviders(sourceFile, createIfMissing = true) {
    const moduleNode = (0, new_module_utils_1.getModule)(sourceFile);
    if (!moduleNode) {
        return [];
    }
    const initializer = (0, new_module_utils_1.getModulePropertyInitializer)(sourceFile, 'providers', createIfMissing);
    const providers = [];
    initializer === null || initializer === void 0 ? void 0 : initializer.getElements().forEach((element) => {
        if (ts_morph_1.Node.isCallExpression(element) || ts_morph_1.Node.isSpreadElement(element)) {
            const expression = element.getExpression();
            if (ts_morph_1.Node.isIdentifier(expression) &&
                (0, import_utils_1.isImportedFromSpartacusLibs)(expression)) {
                providers.push(element);
            }
        }
    });
    return providers;
}
exports.getSpartacusProviders = getSpartacusProviders;
function isSpartacusConfigDuplicate(newContent, initializer) {
    const normalizedContent = normalizeConfiguration(newContent);
    const configs = getSpartacusProviders(initializer.getSourceFile());
    for (const config of configs) {
        const normalizedConfig = normalizeConfiguration(config);
        if (normalizedContent === normalizedConfig) {
            return true;
        }
    }
    return false;
}
exports.isSpartacusConfigDuplicate = isSpartacusConfigDuplicate;
const EMPTY_SPACE_REG_EXP = /\s+/gm;
const COMMA_REG_EXP = /,+/gm;
function normalizeConfiguration(config) {
    let newConfig = typeof config === 'string' ? config : config.getText();
    newConfig = newConfig.trim();
    newConfig = newConfig.replace(COMMA_REG_EXP, '');
    if (newConfig.startsWith(constants_1.PROVIDE_CONFIG_FUNCTION)) {
        newConfig = newConfig.replace(`${constants_1.PROVIDE_CONFIG_FUNCTION}(`, '');
        newConfig = newConfig.substring(0, newConfig.length - 1);
    }
    newConfig = newConfig.replace(EMPTY_SPACE_REG_EXP, '');
    return newConfig;
}
function normalizeObject(obj) {
    return obj.replace(EMPTY_SPACE_REG_EXP, '');
}
exports.normalizeObject = normalizeObject;
/**
 * Removes the config for the given property name.
 * If the object is empty after removal, the object
 * itself is removed.
 */
function removeProperty(objectLiteral, propertyName) {
    var _a, _b;
    const properties = objectLiteral.getProperties();
    for (const property of properties) {
        if (!ts_morph_1.Node.isPropertyAssignment(property)) {
            continue;
        }
        if (property.getName() === propertyName) {
            property.remove();
            return;
        }
        const nestedConfigObject = property.getFirstDescendantByKind(ts_morph_1.SyntaxKind.ObjectLiteralExpression);
        if (nestedConfigObject) {
            removeProperty(nestedConfigObject, propertyName);
        }
        if (normalizeObject((_b = (_a = property.getInitializer()) === null || _a === void 0 ? void 0 : _a.getText()) !== null && _b !== void 0 ? _b : '') === '{}') {
            property.remove();
        }
    }
}
exports.removeProperty = removeProperty;
function getB2bConfiguration() {
    return [
        {
            import: [
                {
                    moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                    namedImports: [constants_1.PROVIDE_CONFIG_FUNCTION],
                },
                {
                    moduleSpecifier: libs_constants_1.SPARTACUS_SETUP,
                    namedImports: ['defaultB2bOccConfig'],
                },
            ],
            content: `provideConfig(defaultB2bOccConfig)`,
        },
    ];
}
exports.getB2bConfiguration = getB2bConfiguration;
//# sourceMappingURL=config-utils.js.map