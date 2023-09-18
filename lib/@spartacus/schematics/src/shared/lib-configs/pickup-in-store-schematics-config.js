"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PICKUP_IN_STORE_SCHEMATICS_CONFIG = exports.PICKUP_IN_STORE_SCSS_FILE_NAME = exports.PICKUP_IN_STORE_TRANSLATION_CHUNKS_CONFIG = exports.PICKUP_IN_STORE_TRANSLATIONS = exports.PICKUP_IN_STORE_ROOT_MODULE = exports.PICKUP_IN_STORE_MODULE = exports.PICKUP_IN_STORE_FEATURE_NAME_CONSTANT = exports.PICKUP_IN_STORE_MODULE_NAME = exports.PICKUP_IN_STORE_FOLDER_NAME = void 0;
const libs_constants_1 = require("../libs-constants");
exports.PICKUP_IN_STORE_FOLDER_NAME = 'pickup-in-store';
exports.PICKUP_IN_STORE_MODULE_NAME = 'PickupInStore';
exports.PICKUP_IN_STORE_FEATURE_NAME_CONSTANT = 'PICKUP_IN_STORE_FEATURE';
exports.PICKUP_IN_STORE_MODULE = 'PickupInStoreModule';
exports.PICKUP_IN_STORE_ROOT_MODULE = 'PickupInStoreRootModule';
exports.PICKUP_IN_STORE_TRANSLATIONS = 'pickupInStoreTranslations';
exports.PICKUP_IN_STORE_TRANSLATION_CHUNKS_CONFIG = 'pickupInStoreTranslationChunksConfig';
exports.PICKUP_IN_STORE_SCSS_FILE_NAME = 'pickup-in-store.scss';
exports.PICKUP_IN_STORE_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.PICKUP_IN_STORE_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_PICKUP_IN_STORE,
    },
    folderName: exports.PICKUP_IN_STORE_FOLDER_NAME,
    moduleName: exports.PICKUP_IN_STORE_MODULE_NAME,
    featureModule: {
        name: exports.PICKUP_IN_STORE_MODULE,
        importPath: libs_constants_1.SPARTACUS_PICKUP_IN_STORE,
    },
    rootModule: {
        name: exports.PICKUP_IN_STORE_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_PICKUP_IN_STORE_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_PICKUP_IN_STORE_ROOT,
        namedImports: [exports.PICKUP_IN_STORE_FEATURE_NAME_CONSTANT],
    },
    styles: {
        scssFileName: exports.PICKUP_IN_STORE_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_PICKUP_IN_STORE,
    },
    i18n: {
        resources: exports.PICKUP_IN_STORE_TRANSLATIONS,
        chunks: exports.PICKUP_IN_STORE_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_PICKUP_IN_STORE_ASSETS,
    },
    dependencyFeatures: [
        libs_constants_1.CART_BASE_FEATURE_NAME,
        libs_constants_1.ORDER_FEATURE_NAME,
        libs_constants_1.STOREFINDER_FEATURE_NAME,
        libs_constants_1.USER_PROFILE_FEATURE_NAME,
    ],
};
//# sourceMappingURL=pickup-in-store-schematics-config.js.map