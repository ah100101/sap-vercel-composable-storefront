"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.S4OM_SCHEMATICS_CONFIG = exports.S4OM_MODULE = exports.S4OM_ROOT_MODULE = exports.S4OM_TRANSLATION_CHUNKS_CONFIG = exports.S4OM_TRANSLATIONS = exports.S4OM_FEATURE_NAME_CONSTANT = exports.S4OM_FEATURE_MODULE_NAME = exports.S4OM_FOLDER_NAME = void 0;
const libs_constants_1 = require("../../libs-constants");
exports.S4OM_FOLDER_NAME = 's4om';
exports.S4OM_FEATURE_MODULE_NAME = 'S4om';
exports.S4OM_FEATURE_NAME_CONSTANT = 'S4OM_FEATURE';
exports.S4OM_TRANSLATIONS = 's4omTranslations';
exports.S4OM_TRANSLATION_CHUNKS_CONFIG = 's4omTranslationChunksConfig';
exports.S4OM_ROOT_MODULE = 'S4omRootModule';
exports.S4OM_MODULE = 'S4omModule';
exports.S4OM_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.S4OM_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_S4OM,
        b2b: true,
    },
    folderName: exports.S4OM_FOLDER_NAME,
    moduleName: exports.S4OM_FEATURE_MODULE_NAME,
    featureModule: {
        name: exports.S4OM_MODULE,
        importPath: libs_constants_1.SPARTACUS_S4OM,
    },
    rootModule: {
        name: exports.S4OM_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_S4OM_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_S4OM_ROOT,
        namedImports: [exports.S4OM_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.S4OM_TRANSLATIONS,
        chunks: exports.S4OM_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_S4OM_ASSETS,
    },
    dependencyFeatures: [libs_constants_1.CART_BASE_FEATURE_NAME, libs_constants_1.ORDER_FEATURE_NAME],
};
//# sourceMappingURL=s4om-schematics-config.js.map