"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CMS_COMPONENTS_SERVICE_MIGRATION_3 = exports.CMS_COMPONENTS_SERVICE_MIGRATION_2 = exports.CMS_COMPONENTS_SERVICE_MIGRATION_1 = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CMS_COMPONENTS_SERVICE_MIGRATION_1 = {
    "class": constants_1.CMS_COMPONENTS_SERVICE,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.CMS_CONFIG,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.PLATFORM,
            literalInference: constants_1.OBJECT_TYPE,
            injectionToken: {
                token: constants_1.PLATFORM_ID_STRING,
                importPath: constants_1.ANGULAR_CORE
            }
        },
    ],
    addParams: [
        { className: constants_1.CMS_FEATURES_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
        { className: constants_1.CONFIG_INITIALIZER_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
exports.CMS_COMPONENTS_SERVICE_MIGRATION_2 = {
    "class": constants_1.CMS_COMPONENTS_SERVICE,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.CMS_CONFIG,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.PLATFORM,
            literalInference: constants_1.OBJECT_TYPE,
            injectionToken: {
                token: constants_1.PLATFORM_ID_STRING,
                importPath: constants_1.ANGULAR_CORE
            }
        },
        { className: constants_1.FEATURE_MODULES_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
    ],
    removeParams: [
        { className: constants_1.FEATURE_MODULES_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
    ],
    addParams: [
        { className: constants_1.CMS_FEATURES_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
        { className: constants_1.CONFIG_INITIALIZER_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
exports.CMS_COMPONENTS_SERVICE_MIGRATION_3 = {
    "class": constants_1.CMS_COMPONENTS_SERVICE,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.CMS_CONFIG,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.PLATFORM,
            literalInference: constants_1.OBJECT_TYPE,
            injectionToken: {
                token: constants_1.PLATFORM_ID_STRING,
                importPath: constants_1.ANGULAR_CORE
            }
        },
        { className: constants_1.FEATURE_MODULES_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
        { className: constants_1.CONFIG_INITIALIZER_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    removeParams: [
        { className: constants_1.FEATURE_MODULES_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
        { className: constants_1.CONFIG_INITIALIZER_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    addParams: [
        { className: constants_1.CMS_FEATURES_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
        { className: constants_1.CONFIG_INITIALIZER_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
//# sourceMappingURL=cms-components.service.migration.js.map