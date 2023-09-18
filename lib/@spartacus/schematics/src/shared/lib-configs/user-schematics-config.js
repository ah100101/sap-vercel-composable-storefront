"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_PROFILE_SCHEMATICS_CONFIG = exports.USER_PROFILE_TRANSLATION_CHUNKS_CONFIG = exports.USER_PROFILE_TRANSLATIONS = exports.USER_PROFILE_ROOT_MODULE = exports.USER_PROFILE_MODULE = exports.USER_PROFILE_FEATURE_NAME_CONSTANT = exports.USER_ACCOUNT_SCHEMATICS_CONFIG = exports.USER_ACCOUNT_TRANSLATION_CHUNKS_CONFIG = exports.USER_ACCOUNT_TRANSLATIONS = exports.USER_ACCOUNT_ROOT_MODULE = exports.USER_ACCOUNT_MODULE = exports.USER_ACCOUNT_FEATURE_NAME_CONSTANT = exports.USER_FEATURE_MODULE_NAME = exports.USER_SCSS_FILE_NAME = exports.USER_FOLDER_NAME = void 0;
const libs_constants_1 = require("../libs-constants");
exports.USER_FOLDER_NAME = 'user';
exports.USER_SCSS_FILE_NAME = 'user.scss';
exports.USER_FEATURE_MODULE_NAME = 'User';
exports.USER_ACCOUNT_FEATURE_NAME_CONSTANT = 'USER_ACCOUNT_FEATURE';
exports.USER_ACCOUNT_MODULE = 'UserAccountModule';
exports.USER_ACCOUNT_ROOT_MODULE = 'UserAccountRootModule';
exports.USER_ACCOUNT_TRANSLATIONS = 'userAccountTranslations';
exports.USER_ACCOUNT_TRANSLATION_CHUNKS_CONFIG = 'userAccountTranslationChunksConfig';
exports.USER_ACCOUNT_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.USER_ACCOUNT_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_USER,
        featureScope: libs_constants_1.SPARTACUS_USER_ACCOUNT,
    },
    folderName: exports.USER_FOLDER_NAME,
    moduleName: exports.USER_FEATURE_MODULE_NAME,
    featureModule: {
        name: exports.USER_ACCOUNT_MODULE,
        importPath: libs_constants_1.SPARTACUS_USER_ACCOUNT,
    },
    rootModule: {
        name: exports.USER_ACCOUNT_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_USER_ACCOUNT_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_USER_ACCOUNT_ROOT,
        namedImports: [exports.USER_ACCOUNT_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.USER_ACCOUNT_TRANSLATIONS,
        chunks: exports.USER_ACCOUNT_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_USER_ACCOUNT_ASSETS,
    },
    styles: {
        scssFileName: exports.USER_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_USER,
    },
};
exports.USER_PROFILE_FEATURE_NAME_CONSTANT = 'USER_PROFILE_FEATURE';
exports.USER_PROFILE_MODULE = 'UserProfileModule';
exports.USER_PROFILE_ROOT_MODULE = 'UserProfileRootModule';
exports.USER_PROFILE_TRANSLATIONS = 'userProfileTranslations';
exports.USER_PROFILE_TRANSLATION_CHUNKS_CONFIG = 'userProfileTranslationChunksConfig';
exports.USER_PROFILE_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.USER_PROFILE_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_USER,
        featureScope: libs_constants_1.SPARTACUS_USER_PROFILE,
    },
    folderName: exports.USER_FOLDER_NAME,
    moduleName: exports.USER_FEATURE_MODULE_NAME,
    featureModule: {
        name: exports.USER_PROFILE_MODULE,
        importPath: libs_constants_1.SPARTACUS_USER_PROFILE,
    },
    rootModule: {
        name: exports.USER_PROFILE_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_USER_PROFILE_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_USER_PROFILE_ROOT,
        namedImports: [exports.USER_PROFILE_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.USER_PROFILE_TRANSLATIONS,
        chunks: exports.USER_PROFILE_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_USER_PROFILE_ASSETS,
    },
    styles: {
        scssFileName: exports.USER_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_USER,
    },
    dependencyFeatures: [libs_constants_1.USER_ACCOUNT_FEATURE_NAME],
};
//# sourceMappingURL=user-schematics-config.js.map