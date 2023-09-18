"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRACKING_AEP_SCHEMATICS_CONFIG = exports.TMS_AEP_MODULE = exports.TRACKING_GTM_SCHEMATICS_CONFIG = exports.TMS_GTM_MODULE = exports.TMS_BASE_MODULE = exports.TMS_CONFIG = exports.TMS_MODULE_NAME = exports.TRACKING_PERSONALIZATION_SCHEMATICS_CONFIG = exports.PERSONALIZATION_FEATURE_NAME_CONSTANT = exports.PERSONALIZATION_MODULE_NAME = exports.PERSONALIZATION_ROOT_MODULE = exports.PERSONALIZATION_MODULE = exports.TRACKING_FOLDER_NAME = void 0;
const libs_constants_1 = require("../libs-constants");
exports.TRACKING_FOLDER_NAME = 'tracking';
exports.PERSONALIZATION_MODULE = 'PersonalizationModule';
exports.PERSONALIZATION_ROOT_MODULE = 'PersonalizationRootModule';
exports.PERSONALIZATION_MODULE_NAME = 'Personalization';
exports.PERSONALIZATION_FEATURE_NAME_CONSTANT = 'PERSONALIZATION_FEATURE';
exports.TRACKING_PERSONALIZATION_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.TRACKING_PERSONALIZATION_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_TRACKING,
        featureScope: libs_constants_1.SPARTACUS_PERSONALIZATION,
    },
    folderName: exports.TRACKING_FOLDER_NAME,
    moduleName: exports.PERSONALIZATION_MODULE_NAME,
    featureModule: {
        name: exports.PERSONALIZATION_MODULE,
        importPath: libs_constants_1.SPARTACUS_PERSONALIZATION,
    },
    rootModule: {
        name: exports.PERSONALIZATION_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_PERSONALIZATION_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_PERSONALIZATION_ROOT,
        namedImports: [exports.PERSONALIZATION_FEATURE_NAME_CONSTANT],
    },
    dependencyFeatures: [libs_constants_1.USER_PROFILE_FEATURE_NAME],
};
exports.TMS_MODULE_NAME = 'TagManagement';
exports.TMS_CONFIG = 'TmsConfig';
exports.TMS_BASE_MODULE = 'BaseTmsModule';
exports.TMS_GTM_MODULE = 'GtmModule';
exports.TRACKING_GTM_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.TRACKING_TMS_GTM_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_TRACKING,
        featureScope: libs_constants_1.SPARTACUS_TMS_GTM,
    },
    folderName: exports.TRACKING_FOLDER_NAME,
    moduleName: exports.TMS_MODULE_NAME,
    featureModule: {
        name: exports.TMS_GTM_MODULE,
        importPath: libs_constants_1.SPARTACUS_TMS_GTM,
    },
    rootModule: {
        name: exports.TMS_BASE_MODULE,
        importPath: libs_constants_1.SPARTACUS_TMS_CORE,
        content: `${exports.TMS_BASE_MODULE}.forRoot()`,
    },
    customConfig: buildGtmConfig,
    dependencyFeatures: [libs_constants_1.USER_PROFILE_FEATURE_NAME],
};
function buildGtmConfig(options) {
    return {
        providers: {
            import: [
                {
                    moduleSpecifier: libs_constants_1.SPARTACUS_TMS_GTM,
                    namedImports: [exports.TMS_GTM_MODULE],
                },
                { moduleSpecifier: libs_constants_1.SPARTACUS_TMS_CORE, namedImports: [exports.TMS_CONFIG] },
            ],
            content: `<${exports.TMS_CONFIG}>{
      tagManager: {
        gtm: {
          events: [],
        },
      },
    }`,
        },
        options: Object.assign(Object.assign({}, options), { lazy: false }),
    };
}
exports.TMS_AEP_MODULE = 'AepModule';
exports.TRACKING_AEP_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.TRACKING_TMS_AEP_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_TRACKING,
        featureScope: libs_constants_1.SPARTACUS_TMS_AEP,
    },
    folderName: exports.TRACKING_FOLDER_NAME,
    moduleName: exports.TMS_MODULE_NAME,
    featureModule: {
        name: exports.TMS_AEP_MODULE,
        importPath: libs_constants_1.SPARTACUS_TMS_AEP,
    },
    rootModule: {
        name: exports.TMS_BASE_MODULE,
        importPath: libs_constants_1.SPARTACUS_TMS_CORE,
        content: `${exports.TMS_BASE_MODULE}.forRoot()`,
    },
    customConfig: buildAepConfig,
    dependencyFeatures: [libs_constants_1.USER_PROFILE_FEATURE_NAME],
};
function buildAepConfig(options) {
    return {
        providers: {
            import: [
                {
                    moduleSpecifier: libs_constants_1.SPARTACUS_TMS_AEP,
                    namedImports: [exports.TMS_AEP_MODULE],
                },
                { moduleSpecifier: libs_constants_1.SPARTACUS_TMS_CORE, namedImports: [exports.TMS_CONFIG] },
            ],
            content: `<${exports.TMS_CONFIG}>{
      tagManager: {
        aep: {
          events: [],
        },
      },
    }`,
        },
        options: Object.assign(Object.assign({}, options), { lazy: false }),
    };
}
//# sourceMappingURL=tracking-schematics-config.js.map