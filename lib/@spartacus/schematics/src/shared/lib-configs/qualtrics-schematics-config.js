"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUALTRICS_SCHEMATICS_CONFIG = exports.QUALTRICS_FEATURE_NAME_CONSTANT = exports.QUALTRICS_ROOT_MODULE = exports.QUALTRICS_MODULE = exports.QUALTRICS_EMBEDDED_FEEDBACK_SCSS_FILE_NAME = exports.QUALTRICS_MODULE_NAME = exports.QUALTRICS_FOLDER_NAME = void 0;
const libs_constants_1 = require("../libs-constants");
exports.QUALTRICS_FOLDER_NAME = 'qualtrics';
exports.QUALTRICS_MODULE_NAME = 'Qualtrics';
exports.QUALTRICS_EMBEDDED_FEEDBACK_SCSS_FILE_NAME = 'qualtrics-embedded-feedback.scss';
exports.QUALTRICS_MODULE = 'QualtricsModule';
exports.QUALTRICS_ROOT_MODULE = 'QualtricsRootModule';
exports.QUALTRICS_FEATURE_NAME_CONSTANT = 'QUALTRICS_FEATURE';
exports.QUALTRICS_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.QUALTRICS_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_QUALTRICS,
    },
    folderName: exports.QUALTRICS_FOLDER_NAME,
    moduleName: exports.QUALTRICS_MODULE_NAME,
    featureModule: {
        name: exports.QUALTRICS_MODULE,
        importPath: libs_constants_1.SPARTACUS_QUALTRICS,
    },
    rootModule: {
        name: exports.QUALTRICS_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_QUALTRICS_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_QUALTRICS_ROOT,
        namedImports: [exports.QUALTRICS_FEATURE_NAME_CONSTANT],
    },
    styles: {
        scssFileName: exports.QUALTRICS_EMBEDDED_FEEDBACK_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_QUALTRICS,
    },
};
//# sourceMappingURL=qualtrics-schematics-config.js.map