"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CART_WISHLIST_SCHEMATICS_CONFIG = exports.CART_WISHLIST_TRANSLATION_CHUNKS_CONFIG = exports.CART_WISHLIST_TRANSLATIONS = exports.ADD_TO_WISHLIST_FEATURE_NAME_CONSTANT = exports.CART_WISHLIST_FEATURE_NAME_CONSTANT = exports.CART_WISHLIST_ROOT_MODULE = exports.ADD_TO_WISHLIST_MODULE = exports.CART_WISHLIST_MODULE = exports.CART_WISHLIST_FEATURE_MODULE_NAME = exports.CART_SAVED_CART_SCHEMATICS_CONFIG = exports.SAVED_CART_TRANSLATION_CHUNKS_CONFIG = exports.SAVED_CART_TRANSLATIONS = exports.CART_SAVED_CART_FEATURE_NAME_CONSTANT = exports.CART_SAVED_CART_MODULE_NAME = exports.SAVED_CART_ROOT_MODULE = exports.SAVED_CART_MODULE = exports.CART_QUICK_ORDER_SCHEMATICS_CONFIG = exports.QUICK_ORDER_TRANSLATION_CHUNKS_CONFIG = exports.QUICK_ORDER_TRANSLATIONS = exports.CART_QUICK_ORDER_FEATURE_NAME_CONSTANT = exports.CART_QUICK_ORDER_MODULE_NAME = exports.QUICK_ORDER_ROOT_MODULE = exports.QUICK_ORDER_MODULE = exports.CART_IMPORT_EXPORT_SCHEMATICS_CONFIG = exports.CART_IMPORT_EXPORT_TRANSLATION_CHUNKS_CONFIG = exports.CART_IMPORT_EXPORT_TRANSLATIONS = exports.CART_IMPORT_EXPORT_FEATURE_NAME_CONSTANT = exports.CART_IMPORT_EXPORT_MODULE_NAME = exports.CART_IMPORT_EXPORT_ROOT_MODULE = exports.CART_IMPORT_EXPORT_MODULE = exports.CART_BASE_SCHEMATICS_CONFIG = exports.CART_BASE_TRANSLATION_CHUNKS_CONFIG = exports.CART_BASE_TRANSLATIONS = exports.MINI_CART_FEATURE_NAME_CONSTANT = exports.ADD_TO_CART_FEATURE_NAME_CONSTANT = exports.CART_BASE_FEATURE_NAME_CONSTANT = exports.CART_BASE_FEATURE_MODULE_NAME = exports.ADD_TO_CART_MODULE = exports.MINI_CART_MODULE = exports.CART_BASE_ROOT_MODULE = exports.CART_BASE_MODULE = exports.CART_SCSS_FILE_NAME = exports.CART_FOLDER_NAME = void 0;
const libs_constants_1 = require("../libs-constants");
exports.CART_FOLDER_NAME = 'cart';
exports.CART_SCSS_FILE_NAME = 'cart.scss';
exports.CART_BASE_MODULE = 'CartBaseModule';
exports.CART_BASE_ROOT_MODULE = 'CartBaseRootModule';
exports.MINI_CART_MODULE = 'MiniCartModule';
exports.ADD_TO_CART_MODULE = 'AddToCartModule';
exports.CART_BASE_FEATURE_MODULE_NAME = 'CartBase';
exports.CART_BASE_FEATURE_NAME_CONSTANT = 'CART_BASE_FEATURE';
exports.ADD_TO_CART_FEATURE_NAME_CONSTANT = 'ADD_TO_CART_FEATURE';
exports.MINI_CART_FEATURE_NAME_CONSTANT = 'MINI_CART_FEATURE';
exports.CART_BASE_TRANSLATIONS = 'cartBaseTranslations';
exports.CART_BASE_TRANSLATION_CHUNKS_CONFIG = 'cartBaseTranslationChunksConfig';
exports.CART_BASE_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.CART_BASE_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_CART,
        featureScope: libs_constants_1.SPARTACUS_CART_BASE,
    },
    folderName: exports.CART_FOLDER_NAME,
    moduleName: exports.CART_BASE_FEATURE_MODULE_NAME,
    featureModule: [
        {
            name: exports.CART_BASE_MODULE,
            importPath: libs_constants_1.SPARTACUS_CART_BASE,
        },
        {
            name: exports.MINI_CART_MODULE,
            importPath: libs_constants_1.MINI_CART_ENTRY_POINT,
        },
        {
            name: exports.ADD_TO_CART_MODULE,
            importPath: libs_constants_1.ADD_TO_CART_ENTRY_POINT,
        },
    ],
    rootModule: {
        name: exports.CART_BASE_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_CART_BASE_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_CART_BASE_ROOT,
        namedImports: [
            exports.CART_BASE_FEATURE_NAME_CONSTANT,
            exports.MINI_CART_FEATURE_NAME_CONSTANT,
            exports.ADD_TO_CART_FEATURE_NAME_CONSTANT,
        ],
    },
    i18n: {
        resources: exports.CART_BASE_TRANSLATIONS,
        chunks: exports.CART_BASE_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_CART_BASE_ASSETS,
    },
    styles: {
        scssFileName: exports.CART_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_CART,
    },
    dependencyFeatures: [libs_constants_1.USER_PROFILE_FEATURE_NAME],
};
exports.CART_IMPORT_EXPORT_MODULE = 'ImportExportModule';
exports.CART_IMPORT_EXPORT_ROOT_MODULE = 'ImportExportRootModule';
exports.CART_IMPORT_EXPORT_MODULE_NAME = 'CartImportExport';
exports.CART_IMPORT_EXPORT_FEATURE_NAME_CONSTANT = 'CART_IMPORT_EXPORT_FEATURE';
exports.CART_IMPORT_EXPORT_TRANSLATIONS = 'importExportTranslations';
exports.CART_IMPORT_EXPORT_TRANSLATION_CHUNKS_CONFIG = 'importExportTranslationChunksConfig';
exports.CART_IMPORT_EXPORT_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.CART_IMPORT_EXPORT_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_CART,
        featureScope: libs_constants_1.SPARTACUS_CART_IMPORT_EXPORT,
    },
    folderName: exports.CART_FOLDER_NAME,
    moduleName: exports.CART_IMPORT_EXPORT_MODULE_NAME,
    featureModule: {
        name: exports.CART_IMPORT_EXPORT_MODULE,
        importPath: libs_constants_1.SPARTACUS_CART_IMPORT_EXPORT,
    },
    rootModule: {
        name: exports.CART_IMPORT_EXPORT_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_CART_IMPORT_EXPORT_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_CART_IMPORT_EXPORT_ROOT,
        namedImports: [exports.CART_IMPORT_EXPORT_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.CART_IMPORT_EXPORT_TRANSLATIONS,
        chunks: exports.CART_IMPORT_EXPORT_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_CART_IMPORT_EXPORT_ASSETS,
    },
    styles: {
        scssFileName: exports.CART_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_CART,
    },
};
exports.QUICK_ORDER_MODULE = 'QuickOrderModule';
exports.QUICK_ORDER_ROOT_MODULE = 'QuickOrderRootModule';
exports.CART_QUICK_ORDER_MODULE_NAME = 'CartQuickOrder';
exports.CART_QUICK_ORDER_FEATURE_NAME_CONSTANT = 'CART_QUICK_ORDER_FEATURE';
exports.QUICK_ORDER_TRANSLATIONS = 'quickOrderTranslations';
exports.QUICK_ORDER_TRANSLATION_CHUNKS_CONFIG = 'quickOrderTranslationChunksConfig';
exports.CART_QUICK_ORDER_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.CART_QUICK_ORDER_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_CART,
        featureScope: libs_constants_1.SPARTACUS_QUICK_ORDER,
    },
    folderName: exports.CART_FOLDER_NAME,
    moduleName: exports.CART_QUICK_ORDER_MODULE_NAME,
    featureModule: {
        name: exports.QUICK_ORDER_MODULE,
        importPath: libs_constants_1.SPARTACUS_QUICK_ORDER,
    },
    rootModule: {
        name: exports.QUICK_ORDER_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_QUICK_ORDER_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_QUICK_ORDER_ROOT,
        namedImports: [exports.CART_QUICK_ORDER_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.QUICK_ORDER_TRANSLATIONS,
        chunks: exports.QUICK_ORDER_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_QUICK_ORDER_ASSETS,
    },
    styles: {
        scssFileName: exports.CART_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_CART,
    },
    dependencyFeatures: [libs_constants_1.CART_BASE_FEATURE_NAME],
};
exports.SAVED_CART_MODULE = 'SavedCartModule';
exports.SAVED_CART_ROOT_MODULE = 'SavedCartRootModule';
exports.CART_SAVED_CART_MODULE_NAME = 'CartSavedCart';
exports.CART_SAVED_CART_FEATURE_NAME_CONSTANT = 'CART_SAVED_CART_FEATURE';
exports.SAVED_CART_TRANSLATIONS = 'savedCartTranslations';
exports.SAVED_CART_TRANSLATION_CHUNKS_CONFIG = 'savedCartTranslationChunksConfig';
exports.CART_SAVED_CART_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.CART_SAVED_CART_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_CART,
        featureScope: libs_constants_1.SPARTACUS_SAVED_CART,
    },
    folderName: exports.CART_FOLDER_NAME,
    moduleName: exports.CART_SAVED_CART_MODULE_NAME,
    featureModule: {
        name: exports.SAVED_CART_MODULE,
        importPath: libs_constants_1.SPARTACUS_SAVED_CART,
    },
    rootModule: {
        name: exports.SAVED_CART_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_SAVED_CART_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_SAVED_CART_ROOT,
        namedImports: [exports.CART_SAVED_CART_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.SAVED_CART_TRANSLATIONS,
        chunks: exports.SAVED_CART_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_SAVED_CART_ASSETS,
    },
    styles: {
        scssFileName: exports.CART_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_CART,
    },
    dependencyFeatures: [libs_constants_1.CART_BASE_FEATURE_NAME],
};
exports.CART_WISHLIST_FEATURE_MODULE_NAME = 'WishList';
exports.CART_WISHLIST_MODULE = 'WishListModule';
exports.ADD_TO_WISHLIST_MODULE = 'AddToWishListModule';
exports.CART_WISHLIST_ROOT_MODULE = 'WishListRootModule';
exports.CART_WISHLIST_FEATURE_NAME_CONSTANT = 'CART_WISH_LIST_FEATURE';
exports.ADD_TO_WISHLIST_FEATURE_NAME_CONSTANT = 'ADD_TO_WISHLIST_FEATURE';
exports.CART_WISHLIST_TRANSLATIONS = 'wishListTranslations';
exports.CART_WISHLIST_TRANSLATION_CHUNKS_CONFIG = 'wishListTranslationChunksConfig';
exports.CART_WISHLIST_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.CART_WISHLIST_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_CART,
        featureScope: libs_constants_1.SPARTACUS_CART_WISHLIST,
    },
    folderName: exports.CART_FOLDER_NAME,
    moduleName: exports.CART_WISHLIST_FEATURE_MODULE_NAME,
    featureModule: [
        {
            name: exports.CART_WISHLIST_MODULE,
            importPath: libs_constants_1.SPARTACUS_CART_WISHLIST,
        },
        {
            name: exports.ADD_TO_WISHLIST_MODULE,
            importPath: libs_constants_1.ADD_TO_WISHLIST_ENTRY_POINT,
        },
    ],
    rootModule: {
        name: exports.CART_WISHLIST_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_CART_WISHLIST_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_CART_WISHLIST_ROOT,
        namedImports: [
            exports.CART_WISHLIST_FEATURE_NAME_CONSTANT,
            exports.ADD_TO_WISHLIST_FEATURE_NAME_CONSTANT,
        ],
    },
    i18n: {
        resources: exports.CART_WISHLIST_TRANSLATIONS,
        chunks: exports.CART_WISHLIST_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_CART_WISHLIST_ASSETS,
    },
    styles: {
        scssFileName: exports.CART_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_CART,
    },
    dependencyFeatures: [libs_constants_1.CART_BASE_FEATURE_NAME],
};
//# sourceMappingURL=cart-schematics-config.js.map