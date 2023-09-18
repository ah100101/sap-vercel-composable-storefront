"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDS_SCHEMATICS_CONFIG = exports.CDS_MODULE = exports.CDS_MODULE_NAME = exports.CDS_FOLDER_NAME = void 0;
const constants_1 = require("../../constants");
const libs_constants_1 = require("../../libs-constants");
exports.CDS_FOLDER_NAME = 'cds';
exports.CDS_MODULE_NAME = 'Cds';
exports.CDS_MODULE = 'CdsModule';
exports.CDS_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.CDS_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_CDS,
    },
    folderName: exports.CDS_FOLDER_NAME,
    moduleName: exports.CDS_MODULE_NAME,
    featureModule: {
        importPath: libs_constants_1.SPARTACUS_CDS,
        name: exports.CDS_MODULE,
        content: `${exports.CDS_MODULE}.forRoot()`,
    },
    customConfig: buildCdsConfig,
    dependencyFeatures: [libs_constants_1.TRACKING_PERSONALIZATION_FEATURE_NAME],
};
function buildCdsConfig(options) {
    const customConfig = [
        {
            import: [
                {
                    moduleSpecifier: libs_constants_1.SPARTACUS_CDS,
                    namedImports: [constants_1.CDS_CONFIG],
                },
            ],
            content: `<${constants_1.CDS_CONFIG}>{
      cds: {
        tenant: '${options.tenant || 'TENANT_PLACEHOLDER'}',
        baseUrl: '${options.baseUrl || 'BASE_URL_PLACEHOLDER'}',
        endpoints: {
          strategyProducts: '/strategy/\${tenant}/strategies/\${strategyId}/products',
        },
        merchandising: {
          defaultCarouselViewportThreshold: 80,
        },
      },
    }`,
        },
    ];
    customConfig.push({
        import: [
            {
                moduleSpecifier: libs_constants_1.SPARTACUS_CDS,
                namedImports: [constants_1.CDS_CONFIG],
            },
        ],
        content: `<${constants_1.CDS_CONFIG}>{
          cds: {
            profileTag: {
              javascriptUrl:
                '${options.profileTagLoadUrl ||
            'PROFILE_TAG_LOAD_URL_PLACEHOLDER'}',
              configUrl:
                '${options.profileTagConfigUrl ||
            'PROFILE_TAG_CONFIG_URL_PLACEHOLDER'}',
              allowInsecureCookies: true,
            },
          },
        }`,
    });
    return {
        providers: customConfig,
        options: Object.assign(Object.assign({}, options), { lazy: false }),
    };
}
//# sourceMappingURL=cds-schematics-config.js.map