"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHECKOUT_SCHEDULED_REPLENISHMENT_SCHEMATICS_CONFIG = exports.CHECKOUT_SCHEDULED_REPLENISHMENT_TRANSLATION_CHUNKS_CONFIG = exports.CHECKOUT_SCHEDULED_REPLENISHMENT_TRANSLATIONS = exports.CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE = exports.CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE = exports.CHECKOUT_B2B_SCHEMATICS_CONFIG = exports.CHECKOUT_B2B_TRANSLATION_CHUNKS_CONFIG = exports.CHECKOUT_B2B_TRANSLATIONS = exports.CHECKOUT_B2B_ROOT_MODULE = exports.CHECKOUT_B2B_MODULE = exports.CHECKOUT_BASE_SCHEMATICS_CONFIG = exports.CHECKOUT_BASE_TRANSLATION_CHUNKS_CONFIG = exports.CHECKOUT_BASE_TRANSLATIONS = exports.CHECKOUT_BASE_ROOT_MODULE = exports.CHECKOUT_BASE_MODULE = exports.CHECKOUT_BASE_MODULE_NAME = exports.CHECKOUT_BASE_FEATURE_NAME_CONSTANT = exports.CHECKOUT_SCSS_FILE_NAME = exports.CHECKOUT_FOLDER_NAME = void 0;
const libs_constants_1 = require("../libs-constants");
exports.CHECKOUT_FOLDER_NAME = 'checkout';
exports.CHECKOUT_SCSS_FILE_NAME = 'checkout.scss';
exports.CHECKOUT_BASE_FEATURE_NAME_CONSTANT = 'CHECKOUT_FEATURE';
exports.CHECKOUT_BASE_MODULE_NAME = 'Checkout';
exports.CHECKOUT_BASE_MODULE = 'CheckoutModule';
exports.CHECKOUT_BASE_ROOT_MODULE = 'CheckoutRootModule';
exports.CHECKOUT_BASE_TRANSLATIONS = 'checkoutTranslations';
exports.CHECKOUT_BASE_TRANSLATION_CHUNKS_CONFIG = 'checkoutTranslationChunksConfig';
exports.CHECKOUT_BASE_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.CHECKOUT_BASE_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_CHECKOUT,
        featureScope: libs_constants_1.SPARTACUS_CHECKOUT_BASE,
    },
    folderName: exports.CHECKOUT_FOLDER_NAME,
    moduleName: exports.CHECKOUT_BASE_MODULE_NAME,
    featureModule: {
        name: exports.CHECKOUT_BASE_MODULE,
        importPath: libs_constants_1.SPARTACUS_CHECKOUT_BASE,
    },
    rootModule: {
        name: exports.CHECKOUT_BASE_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_CHECKOUT_BASE_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_CHECKOUT_BASE_ROOT,
        namedImports: [exports.CHECKOUT_BASE_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.CHECKOUT_BASE_TRANSLATIONS,
        chunks: exports.CHECKOUT_BASE_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_CHECKOUT_BASE_ASSETS,
    },
    styles: {
        scssFileName: exports.CHECKOUT_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_CHECKOUT,
    },
    dependencyFeatures: [libs_constants_1.ORDER_FEATURE_NAME],
};
exports.CHECKOUT_B2B_MODULE = 'CheckoutB2BModule';
exports.CHECKOUT_B2B_ROOT_MODULE = 'CheckoutB2BRootModule';
exports.CHECKOUT_B2B_TRANSLATIONS = 'checkoutB2BTranslations';
exports.CHECKOUT_B2B_TRANSLATION_CHUNKS_CONFIG = 'checkoutB2BTranslationChunksConfig';
exports.CHECKOUT_B2B_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.CHECKOUT_B2B_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_CHECKOUT,
        featureScope: libs_constants_1.SPARTACUS_CHECKOUT_B2B,
        b2b: true,
    },
    folderName: exports.CHECKOUT_FOLDER_NAME,
    moduleName: exports.CHECKOUT_BASE_MODULE_NAME,
    featureModule: {
        name: exports.CHECKOUT_B2B_MODULE,
        importPath: libs_constants_1.SPARTACUS_CHECKOUT_B2B,
    },
    rootModule: {
        name: exports.CHECKOUT_B2B_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_CHECKOUT_B2B_ROOT,
    },
    i18n: {
        resources: exports.CHECKOUT_B2B_TRANSLATIONS,
        chunks: exports.CHECKOUT_B2B_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_CHECKOUT_B2B_ASSETS,
    },
    styles: {
        scssFileName: exports.CHECKOUT_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_CHECKOUT,
    },
    dependencyFeatures: [libs_constants_1.ORDER_FEATURE_NAME, libs_constants_1.CHECKOUT_BASE_FEATURE_NAME],
    importAfter: [
        {
            markerModuleName: exports.CHECKOUT_BASE_MODULE,
            featureModuleName: exports.CHECKOUT_B2B_MODULE,
        },
    ],
};
exports.CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE = 'CheckoutScheduledReplenishmentModule';
exports.CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE = 'CheckoutScheduledReplenishmentRootModule';
exports.CHECKOUT_SCHEDULED_REPLENISHMENT_TRANSLATIONS = 'checkoutScheduledReplenishmentTranslations';
exports.CHECKOUT_SCHEDULED_REPLENISHMENT_TRANSLATION_CHUNKS_CONFIG = 'checkoutScheduledReplenishmentTranslationChunksConfig';
exports.CHECKOUT_SCHEDULED_REPLENISHMENT_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_CHECKOUT,
        featureScope: libs_constants_1.SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT,
        b2b: true,
    },
    folderName: exports.CHECKOUT_FOLDER_NAME,
    moduleName: exports.CHECKOUT_BASE_MODULE_NAME,
    featureModule: {
        name: exports.CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE,
        importPath: libs_constants_1.SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT,
    },
    rootModule: {
        name: exports.CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT,
    },
    i18n: {
        resources: exports.CHECKOUT_SCHEDULED_REPLENISHMENT_TRANSLATIONS,
        chunks: exports.CHECKOUT_SCHEDULED_REPLENISHMENT_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_ASSETS,
    },
    styles: {
        scssFileName: exports.CHECKOUT_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_CHECKOUT,
    },
    dependencyFeatures: [libs_constants_1.ORDER_FEATURE_NAME, libs_constants_1.CHECKOUT_B2B_FEATURE_NAME],
    importAfter: [
        {
            markerModuleName: exports.CHECKOUT_BASE_MODULE,
            featureModuleName: exports.CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE,
        },
    ],
};
//# sourceMappingURL=checkout-schematics-config.js.map