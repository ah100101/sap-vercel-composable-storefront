"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT_CONFIGURATOR_CPQ_SCHEMATICS_CONFIG = exports.PRODUCT_CONFIGURATOR_RULEBASED_CPQ_ROOT_MODULE = exports.PRODUCT_CONFIGURATOR_RULEBASED_CPQ_MODULE = exports.PRODUCT_CONFIGURATOR_RULEBASED_SCHEMATICS_CONFIG = exports.PRODUCT_CONFIGURATOR_RULEBASED_ROOT_MODULE = exports.PRODUCT_CONFIGURATOR_RULEBASED_MODULE = exports.PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_NAME_CONSTANT = exports.PRODUCT_CONFIGURATOR_RULEBASED_MODULE_NAME = exports.PRODUCT_CONFIGURATOR_TEXTFIELD_SCHEMATICS_CONFIG = exports.PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME_CONSTANT = exports.PRODUCT_CONFIGURATOR_TEXTFIELD_MODULE_NAME = exports.PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT_MODULE = exports.PRODUCT_CONFIGURATOR_TEXTFIELD_MODULE = exports.PRODUCT_CONFIGURATOR_TRANSLATION_CHUNKS_CONFIG = exports.PRODUCT_CONFIGURATOR_TRANSLATIONS = exports.PRODUCT_CONFIGURATOR_SCSS_FILE_NAME = exports.PRODUCT_CONFIGURATOR_FOLDER_NAME = exports.PRODUCT_CONFIGURATOR_MODULE_NAME = void 0;
const libs_constants_1 = require("../libs-constants");
exports.PRODUCT_CONFIGURATOR_MODULE_NAME = 'ProductConfigurator';
exports.PRODUCT_CONFIGURATOR_FOLDER_NAME = 'product-configurator';
exports.PRODUCT_CONFIGURATOR_SCSS_FILE_NAME = 'product-configurator.scss';
exports.PRODUCT_CONFIGURATOR_TRANSLATIONS = 'configuratorTranslations';
exports.PRODUCT_CONFIGURATOR_TRANSLATION_CHUNKS_CONFIG = 'configuratorTranslationChunksConfig';
exports.PRODUCT_CONFIGURATOR_TEXTFIELD_MODULE = 'TextfieldConfiguratorModule';
exports.PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT_MODULE = 'TextfieldConfiguratorRootModule';
exports.PRODUCT_CONFIGURATOR_TEXTFIELD_MODULE_NAME = 'ProductConfiguratorTextfield';
exports.PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME_CONSTANT = 'PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE';
exports.PRODUCT_CONFIGURATOR_TEXTFIELD_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR,
        featureScope: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD,
    },
    folderName: exports.PRODUCT_CONFIGURATOR_FOLDER_NAME,
    moduleName: exports.PRODUCT_CONFIGURATOR_MODULE_NAME,
    featureModule: {
        name: exports.PRODUCT_CONFIGURATOR_TEXTFIELD_MODULE,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD,
    },
    rootModule: {
        name: exports.PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT,
        namedImports: [exports.PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.PRODUCT_CONFIGURATOR_TRANSLATIONS,
        chunks: exports.PRODUCT_CONFIGURATOR_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_ASSETS,
    },
    styles: {
        scssFileName: exports.PRODUCT_CONFIGURATOR_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR,
    },
    dependencyFeatures: [
        libs_constants_1.CART_BASE_FEATURE_NAME,
        libs_constants_1.CHECKOUT_BASE_FEATURE_NAME,
        libs_constants_1.ORDER_FEATURE_NAME,
    ],
};
exports.PRODUCT_CONFIGURATOR_RULEBASED_MODULE_NAME = 'ProductConfiguratorRulebased';
exports.PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_NAME_CONSTANT = 'PRODUCT_CONFIGURATOR_RULEBASED_FEATURE';
exports.PRODUCT_CONFIGURATOR_RULEBASED_MODULE = 'RulebasedConfiguratorModule';
exports.PRODUCT_CONFIGURATOR_RULEBASED_ROOT_MODULE = 'RulebasedConfiguratorRootModule';
exports.PRODUCT_CONFIGURATOR_RULEBASED_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.PRODUCT_CONFIGURATOR_VC_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR,
        featureScope: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
    folderName: exports.PRODUCT_CONFIGURATOR_FOLDER_NAME,
    moduleName: exports.PRODUCT_CONFIGURATOR_MODULE_NAME,
    featureModule: {
        name: exports.PRODUCT_CONFIGURATOR_RULEBASED_MODULE,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
    rootModule: {
        name: exports.PRODUCT_CONFIGURATOR_RULEBASED_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT,
        namedImports: [exports.PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.PRODUCT_CONFIGURATOR_TRANSLATIONS,
        chunks: exports.PRODUCT_CONFIGURATOR_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_ASSETS,
    },
    styles: {
        scssFileName: exports.PRODUCT_CONFIGURATOR_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR,
    },
    dependencyFeatures: [
        libs_constants_1.CART_BASE_FEATURE_NAME,
        libs_constants_1.CHECKOUT_BASE_FEATURE_NAME,
        libs_constants_1.ORDER_FEATURE_NAME,
    ],
};
exports.PRODUCT_CONFIGURATOR_RULEBASED_CPQ_MODULE = 'RulebasedCpqConfiguratorModule';
exports.PRODUCT_CONFIGURATOR_RULEBASED_CPQ_ROOT_MODULE = 'CpqConfiguratorRootModule';
exports.PRODUCT_CONFIGURATOR_CPQ_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.PRODUCT_CONFIGURATOR_CPQ_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR,
        featureScope: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_CPQ,
        b2b: true,
    },
    folderName: exports.PRODUCT_CONFIGURATOR_FOLDER_NAME,
    moduleName: exports.PRODUCT_CONFIGURATOR_MODULE_NAME,
    featureModule: {
        name: exports.PRODUCT_CONFIGURATOR_RULEBASED_CPQ_MODULE,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_CPQ,
    },
    rootModule: {
        name: exports.PRODUCT_CONFIGURATOR_RULEBASED_CPQ_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT,
    },
    dependencyFeatures: [libs_constants_1.PRODUCT_CONFIGURATOR_VC_FEATURE_NAME],
    importAfter: [
        {
            markerModuleName: exports.PRODUCT_CONFIGURATOR_RULEBASED_MODULE,
            featureModuleName: exports.PRODUCT_CONFIGURATOR_RULEBASED_CPQ_MODULE,
        },
    ],
};
//# sourceMappingURL=product-configurator-schematics-config.js.map