"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT_FUTURE_STOCK_SCHEMATICS_CONFIG = exports.FUTURE_STOCK_TRANSLATION_CHUNKS_CONFIG = exports.FUTURE_STOCK_TRANSLATIONS = exports.FUTURE_STOCK_FEATURE_NAME_CONSTANT = exports.FUTURE_STOCK_MODULE_NAME = exports.FUTURE_STOCK_ROOT_MODULE = exports.FUTURE_STOCK_MODULE = exports.PRODUCT_VARIANTS_SCHEMATICS_CONFIG = exports.VARIANTS_TRANSLATION_CHUNKS_CONFIG = exports.VARIANTS_TRANSLATIONS = exports.VARIANTS_FEATURE_NAME_CONSTANT = exports.VARIANTS_MODULE_NAME = exports.VARIANTS_ROOT_MODULE = exports.VARIANTS_MODULE = exports.PRODUCT_IMAGE_ZOOM_SCHEMATICS_CONFIG = exports.IMAGE_ZOOM_TRANSLATION_CHUNKS_CONFIG = exports.IMAGE_ZOOM_TRANSLATIONS = exports.IMAGE_ZOOM_FEATURE_NAME_CONSTANT = exports.IMAGE_ZOOM_MODULE_NAME = exports.IMAGE_ZOOM_ROOT_MODULE = exports.IMAGE_ZOOM_MODULE = exports.PRODUCT_BULK_PRICING_SCHEMATICS_CONFIG = exports.BULK_PRICING_TRANSLATION_CHUNKS_CONFIG = exports.BULK_PRICING_TRANSLATIONS = exports.BULK_PRICING_FEATURE_NAME_CONSTANT = exports.BULK_PRICING_MODULE_NAME = exports.BULK_PRICING_ROOT_MODULE = exports.BULK_PRICING_MODULE = exports.PRODUCT_SCSS_FILE_NAME = exports.PRODUCT_FOLDER_NAME = void 0;
const libs_constants_1 = require("../libs-constants");
exports.PRODUCT_FOLDER_NAME = 'product';
exports.PRODUCT_SCSS_FILE_NAME = 'product.scss';
exports.BULK_PRICING_MODULE = 'BulkPricingModule';
exports.BULK_PRICING_ROOT_MODULE = 'BulkPricingRootModule';
exports.BULK_PRICING_MODULE_NAME = 'ProductBulkPricing';
exports.BULK_PRICING_FEATURE_NAME_CONSTANT = 'PRODUCT_BULK_PRICING_FEATURE';
exports.BULK_PRICING_TRANSLATIONS = 'bulkPricingTranslations';
exports.BULK_PRICING_TRANSLATION_CHUNKS_CONFIG = 'bulkPricingTranslationChunksConfig';
exports.PRODUCT_BULK_PRICING_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.PRODUCT_BULK_PRICING_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_PRODUCT,
        featureScope: libs_constants_1.SPARTACUS_BULK_PRICING,
        b2b: true,
    },
    folderName: exports.PRODUCT_FOLDER_NAME,
    moduleName: exports.BULK_PRICING_MODULE_NAME,
    featureModule: {
        name: exports.BULK_PRICING_MODULE,
        importPath: libs_constants_1.SPARTACUS_BULK_PRICING,
    },
    rootModule: {
        name: exports.BULK_PRICING_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_BULK_PRICING_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_BULK_PRICING_ROOT,
        namedImports: [exports.BULK_PRICING_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.BULK_PRICING_TRANSLATIONS,
        chunks: exports.BULK_PRICING_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_BULK_PRICING_ASSETS,
    },
    styles: {
        scssFileName: exports.PRODUCT_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_PRODUCT,
    },
};
exports.IMAGE_ZOOM_MODULE = 'ProductImageZoomModule';
exports.IMAGE_ZOOM_ROOT_MODULE = 'ProductImageZoomRootModule';
exports.IMAGE_ZOOM_MODULE_NAME = 'ProductImageZoom';
exports.IMAGE_ZOOM_FEATURE_NAME_CONSTANT = 'PRODUCT_IMAGE_ZOOM_FEATURE';
exports.IMAGE_ZOOM_TRANSLATIONS = 'productImageZoomTranslations';
exports.IMAGE_ZOOM_TRANSLATION_CHUNKS_CONFIG = 'productImageZoomTranslationChunksConfig';
exports.PRODUCT_IMAGE_ZOOM_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.PRODUCT_IMAGE_ZOOM_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_PRODUCT,
        featureScope: libs_constants_1.SPARTACUS_IMAGE_ZOOM,
    },
    folderName: exports.PRODUCT_FOLDER_NAME,
    moduleName: exports.IMAGE_ZOOM_MODULE_NAME,
    featureModule: {
        name: exports.IMAGE_ZOOM_MODULE,
        importPath: libs_constants_1.SPARTACUS_IMAGE_ZOOM,
    },
    rootModule: {
        name: exports.IMAGE_ZOOM_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_IMAGE_ZOOM_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_IMAGE_ZOOM_ROOT,
        namedImports: [exports.IMAGE_ZOOM_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.IMAGE_ZOOM_TRANSLATIONS,
        chunks: exports.IMAGE_ZOOM_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_IMAGE_ZOOM_ASSETS,
    },
    styles: {
        scssFileName: exports.PRODUCT_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_PRODUCT,
    },
};
exports.VARIANTS_MODULE = 'ProductVariantsModule';
exports.VARIANTS_ROOT_MODULE = 'ProductVariantsRootModule';
exports.VARIANTS_MODULE_NAME = 'ProductVariants';
exports.VARIANTS_FEATURE_NAME_CONSTANT = 'PRODUCT_VARIANTS_FEATURE';
exports.VARIANTS_TRANSLATIONS = 'productVariantsTranslations';
exports.VARIANTS_TRANSLATION_CHUNKS_CONFIG = 'productVariantsTranslationChunksConfig';
exports.PRODUCT_VARIANTS_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.PRODUCT_VARIANTS_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_PRODUCT,
        featureScope: libs_constants_1.SPARTACUS_VARIANTS,
    },
    folderName: exports.PRODUCT_FOLDER_NAME,
    moduleName: exports.VARIANTS_MODULE_NAME,
    featureModule: {
        name: exports.VARIANTS_MODULE,
        importPath: libs_constants_1.SPARTACUS_VARIANTS,
    },
    rootModule: {
        name: exports.VARIANTS_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_VARIANTS_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_VARIANTS_ROOT,
        namedImports: [exports.VARIANTS_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.VARIANTS_TRANSLATIONS,
        chunks: exports.VARIANTS_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_VARIANTS_ASSETS,
    },
    styles: {
        scssFileName: exports.PRODUCT_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_PRODUCT,
    },
};
exports.FUTURE_STOCK_MODULE = 'FutureStockModule';
exports.FUTURE_STOCK_ROOT_MODULE = 'FutureStockRootModule';
exports.FUTURE_STOCK_MODULE_NAME = 'ProductFutureStock';
exports.FUTURE_STOCK_FEATURE_NAME_CONSTANT = 'PRODUCT_FUTURE_STOCK_FEATURE';
exports.FUTURE_STOCK_TRANSLATIONS = 'futureStockTranslations';
exports.FUTURE_STOCK_TRANSLATION_CHUNKS_CONFIG = 'futureStockTranslationChunksConfig';
exports.PRODUCT_FUTURE_STOCK_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.PRODUCT_FUTURE_STOCK_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_PRODUCT,
        featureScope: libs_constants_1.SPARTACUS_FUTURE_STOCK,
        b2b: true,
    },
    folderName: exports.PRODUCT_FOLDER_NAME,
    moduleName: exports.FUTURE_STOCK_MODULE_NAME,
    featureModule: {
        name: exports.FUTURE_STOCK_MODULE,
        importPath: libs_constants_1.SPARTACUS_FUTURE_STOCK,
    },
    rootModule: {
        name: exports.FUTURE_STOCK_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_FUTURE_STOCK_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_FUTURE_STOCK_ROOT,
        namedImports: [exports.FUTURE_STOCK_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.FUTURE_STOCK_TRANSLATIONS,
        chunks: exports.FUTURE_STOCK_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_FUTURE_STOCK_ASSETS,
    },
    styles: {
        scssFileName: exports.PRODUCT_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_PRODUCT,
    },
};
//# sourceMappingURL=product-schematics-config.js.map