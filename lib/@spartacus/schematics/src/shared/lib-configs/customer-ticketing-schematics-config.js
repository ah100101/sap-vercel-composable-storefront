"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOMER_TICKETING_SCHEMATICS_CONFIG = exports.CUSTOMER_TICKETING_TRANSLATION_CHUNKS_CONFIG = exports.CUSTOMER_TICKETING_TRANSLATIONS = exports.CUSTOMER_TICKETING_FEATURE_NAME_CONSTANT = exports.CUSTOMER_TICKETING_ROOT_MODULE = exports.CUSTOMER_TICKETING_MODULE = exports.CUSTOMER_TICKETING_SCSS_FILE_NAME = exports.CUSTOMER_TICKETING_MODULE_NAME = exports.CUSTOMER_TICKETING_FOLDER_NAME = void 0;
const libs_constants_1 = require("../libs-constants");
exports.CUSTOMER_TICKETING_FOLDER_NAME = 'customer-ticketing';
exports.CUSTOMER_TICKETING_MODULE_NAME = 'CustomerTicketing';
exports.CUSTOMER_TICKETING_SCSS_FILE_NAME = 'customer-ticketing.scss';
exports.CUSTOMER_TICKETING_MODULE = 'CustomerTicketingModule';
exports.CUSTOMER_TICKETING_ROOT_MODULE = 'CustomerTicketingRootModule';
exports.CUSTOMER_TICKETING_FEATURE_NAME_CONSTANT = 'CUSTOMER_TICKETING_FEATURE';
exports.CUSTOMER_TICKETING_TRANSLATIONS = 'customerTicketingTranslations';
exports.CUSTOMER_TICKETING_TRANSLATION_CHUNKS_CONFIG = 'customerTicketingTranslationChunksConfig';
exports.CUSTOMER_TICKETING_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.CUSTOMER_TICKETING_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_CUSTOMER_TICKETING,
    },
    folderName: exports.CUSTOMER_TICKETING_FOLDER_NAME,
    moduleName: exports.CUSTOMER_TICKETING_MODULE_NAME,
    featureModule: {
        name: exports.CUSTOMER_TICKETING_MODULE,
        importPath: libs_constants_1.SPARTACUS_CUSTOMER_TICKETING,
    },
    rootModule: {
        name: exports.CUSTOMER_TICKETING_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_CUSTOMER_TICKETING_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_CUSTOMER_TICKETING_ROOT,
        namedImports: [exports.CUSTOMER_TICKETING_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.CUSTOMER_TICKETING_TRANSLATIONS,
        chunks: exports.CUSTOMER_TICKETING_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_CUSTOMER_TICKETING_ASSETS,
    },
    styles: {
        scssFileName: exports.CUSTOMER_TICKETING_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_CUSTOMER_TICKETING,
    },
    dependencyFeatures: [libs_constants_1.USER_PROFILE_FEATURE_NAME],
};
//# sourceMappingURL=customer-ticketing-schematics-config.js.map