"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDC_SCHEMATICS_CONFIG = exports.CDC_ADMINISTRATION_MODULE = exports.CDC_USER_PROFILE_MODULE = exports.CDC_USER_ACCOUNT_MODULE = exports.CDC_CONFIG = exports.CDC_FEATURE_CONSTANT = exports.CDC_ROOT_MODULE = exports.CDC_MODULE = exports.CDC_MODULE_NAME = exports.CDC_FOLDER_NAME = void 0;
const libs_constants_1 = require("../../libs-constants");
const organization_schematics_config_1 = require("../organization-schematics-config");
const user_schematics_config_1 = require("../user-schematics-config");
exports.CDC_FOLDER_NAME = 'cdc';
exports.CDC_MODULE_NAME = 'Cdc';
exports.CDC_MODULE = 'CdcModule';
exports.CDC_ROOT_MODULE = 'CdcRootModule';
exports.CDC_FEATURE_CONSTANT = 'CDC_FEATURE';
exports.CDC_CONFIG = 'CdcConfig';
exports.CDC_USER_ACCOUNT_MODULE = 'CDCUserAccountModule';
exports.CDC_USER_PROFILE_MODULE = 'CDCUserProfileModule';
exports.CDC_ADMINISTRATION_MODULE = 'CdcAdministrationModule';
exports.CDC_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.CDC_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_CDC,
    },
    folderName: exports.CDC_FOLDER_NAME,
    moduleName: exports.CDC_MODULE_NAME,
    featureModule: [
        {
            importPath: libs_constants_1.SPARTACUS_CDC,
            name: exports.CDC_MODULE,
        },
        {
            name: exports.CDC_USER_ACCOUNT_MODULE,
            importPath: libs_constants_1.SPARTACUS_CDC_USER_ACCOUNT,
        },
        {
            name: exports.CDC_USER_PROFILE_MODULE,
            importPath: libs_constants_1.SPARTACUS_CDC_USER_PROFILE,
        },
        {
            name: exports.CDC_ADMINISTRATION_MODULE,
            importPath: libs_constants_1.SPARTACUS_CDC_ORGANIZATION_ADMINISTRATION,
        },
    ],
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_CDC_ROOT,
        namedImports: [exports.CDC_FEATURE_CONSTANT],
    },
    rootModule: {
        importPath: libs_constants_1.SPARTACUS_CDC_ROOT,
        name: exports.CDC_ROOT_MODULE,
        content: `${exports.CDC_ROOT_MODULE}`,
    },
    customConfig: buildCdcConfig,
    dependencyFeatures: [
        libs_constants_1.USER_PROFILE_FEATURE_NAME,
        libs_constants_1.ORGANIZATION_ADMINISTRATION_FEATURE_NAME,
    ],
    importAfter: [
        {
            markerModuleName: user_schematics_config_1.USER_ACCOUNT_MODULE,
            featureModuleName: exports.CDC_USER_ACCOUNT_MODULE,
        },
        {
            markerModuleName: user_schematics_config_1.USER_PROFILE_MODULE,
            featureModuleName: exports.CDC_USER_PROFILE_MODULE,
        },
        {
            markerModuleName: organization_schematics_config_1.ADMINISTRATION_MODULE,
            featureModuleName: exports.CDC_ADMINISTRATION_MODULE,
        },
    ],
};
function buildCdcConfig(options) {
    return {
        providers: {
            import: [
                {
                    moduleSpecifier: libs_constants_1.SPARTACUS_CDC_ROOT,
                    namedImports: [exports.CDC_CONFIG],
                },
            ],
            content: `<${exports.CDC_CONFIG}>{
        cdc: [
          {
            baseSite: '${options.baseSite || 'BASE_SITE_PLACEHOLDER'}',
            javascriptUrl: '${options.javascriptUrl || 'JS_SDK_URL_PLACEHOLDER'}',
            sessionExpiration: ${options.sessionExpiration || 3600}
          },
        ],
      }`,
        },
    };
}
//# sourceMappingURL=cdc-schematics-config.js.map