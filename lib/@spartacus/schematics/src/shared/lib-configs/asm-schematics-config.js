"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASM_SCHEMATICS_CONFIG = exports.ASM_SCSS_FILE_NAME = exports.ASM_TRANSLATION_CHUNKS_CONFIG = exports.ASM_TRANSLATIONS = exports.ASM_ROOT_MODULE = exports.ASM_MODULE = exports.ASM_FEATURE_NAME_CONSTANT = exports.ASM_FEATURE_MODULE_NAME = exports.ASM_FOLDER_NAME = void 0;
const libs_constants_1 = require("../libs-constants");
exports.ASM_FOLDER_NAME = 'asm';
exports.ASM_FEATURE_MODULE_NAME = 'Asm';
exports.ASM_FEATURE_NAME_CONSTANT = 'ASM_FEATURE';
exports.ASM_MODULE = 'AsmModule';
exports.ASM_ROOT_MODULE = 'AsmRootModule';
exports.ASM_TRANSLATIONS = 'asmTranslations';
exports.ASM_TRANSLATION_CHUNKS_CONFIG = 'asmTranslationChunksConfig';
exports.ASM_SCSS_FILE_NAME = 'asm.scss';
exports.ASM_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.ASM_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_ASM,
    },
    folderName: exports.ASM_FOLDER_NAME,
    moduleName: exports.ASM_FEATURE_MODULE_NAME,
    featureModule: {
        name: exports.ASM_MODULE,
        importPath: libs_constants_1.SPARTACUS_ASM,
    },
    rootModule: {
        name: exports.ASM_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_ASM_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_ASM_ROOT,
        namedImports: [exports.ASM_FEATURE_NAME_CONSTANT],
    },
    styles: {
        scssFileName: exports.ASM_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_ASM,
    },
    i18n: {
        resources: exports.ASM_TRANSLATIONS,
        chunks: exports.ASM_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_ASM_ASSETS,
    },
    dependencyFeatures: [libs_constants_1.USER_PROFILE_FEATURE_NAME],
};
//# sourceMappingURL=asm-schematics-config.js.map