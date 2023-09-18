"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.STOREFINDER_SCHEMATICS_CONFIG = exports.STOREFINDER_TRANSLATION_CHUNKS_CONFIG = exports.STOREFINDER_TRANSLATIONS = exports.STOREFINDER_FEATURE_NAME_CONSTANT = exports.STOREFINDER_ROOT_MODULE = exports.STOREFINDER_MODULE = exports.STOREFINDER_SCSS_FILE_NAME = exports.STOREFINDER_MODULE_NAME = exports.STOREFINDER_FOLDER_NAME = void 0;
const libs_constants_1 = require("../libs-constants");
exports.STOREFINDER_FOLDER_NAME = 'storefinder';
exports.STOREFINDER_MODULE_NAME = 'StoreFinder';
exports.STOREFINDER_SCSS_FILE_NAME = 'storefinder.scss';
exports.STOREFINDER_MODULE = 'StoreFinderModule';
exports.STOREFINDER_ROOT_MODULE = 'StoreFinderRootModule';
exports.STOREFINDER_FEATURE_NAME_CONSTANT = 'STORE_FINDER_FEATURE';
exports.STOREFINDER_TRANSLATIONS = 'storeFinderTranslations';
exports.STOREFINDER_TRANSLATION_CHUNKS_CONFIG = 'storeFinderTranslationChunksConfig';
exports.STOREFINDER_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.STOREFINDER_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_STOREFINDER,
    },
    folderName: exports.STOREFINDER_FOLDER_NAME,
    moduleName: exports.STOREFINDER_MODULE_NAME,
    featureModule: {
        name: exports.STOREFINDER_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFINDER,
    },
    rootModule: {
        name: exports.STOREFINDER_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFINDER_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_STOREFINDER_ROOT,
        namedImports: [exports.STOREFINDER_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.STOREFINDER_TRANSLATIONS,
        chunks: exports.STOREFINDER_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_STOREFINDER_ASSETS,
    },
    styles: {
        scssFileName: exports.STOREFINDER_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_STOREFINDER,
    },
};
//# sourceMappingURL=storefinder-schematics-config.js.map