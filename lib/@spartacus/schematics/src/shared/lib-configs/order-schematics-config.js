"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_SCHEMATICS_CONFIG = exports.ORDER_TRANSLATION_CHUNKS_CONFIG = exports.ORDER_TRANSLATIONS = exports.ORDER_FEATURE_NAME_CONSTANT = exports.ORDER_ROOT_MODULE = exports.ORDER_MODULE = exports.ORDER_SCSS_FILE_NAME = exports.ORDER_MODULE_NAME = exports.ORDER_FOLDER_NAME = void 0;
const libs_constants_1 = require("../libs-constants");
exports.ORDER_FOLDER_NAME = 'order';
exports.ORDER_MODULE_NAME = 'Order';
exports.ORDER_SCSS_FILE_NAME = 'order.scss';
exports.ORDER_MODULE = 'OrderModule';
exports.ORDER_ROOT_MODULE = 'OrderRootModule';
exports.ORDER_FEATURE_NAME_CONSTANT = 'ORDER_FEATURE';
exports.ORDER_TRANSLATIONS = 'orderTranslations';
exports.ORDER_TRANSLATION_CHUNKS_CONFIG = 'orderTranslationChunksConfig';
exports.ORDER_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.ORDER_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_ORDER,
    },
    folderName: exports.ORDER_FOLDER_NAME,
    moduleName: exports.ORDER_MODULE_NAME,
    featureModule: {
        name: exports.ORDER_MODULE,
        importPath: libs_constants_1.SPARTACUS_ORDER,
    },
    rootModule: {
        name: exports.ORDER_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_ORDER_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_ORDER_ROOT,
        namedImports: [exports.ORDER_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.ORDER_TRANSLATIONS,
        chunks: exports.ORDER_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_ORDER_ASSETS,
    },
    styles: {
        scssFileName: exports.ORDER_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_ORDER,
    },
    dependencyFeatures: [libs_constants_1.CART_BASE_FEATURE_NAME],
};
//# sourceMappingURL=order-schematics-config.js.map