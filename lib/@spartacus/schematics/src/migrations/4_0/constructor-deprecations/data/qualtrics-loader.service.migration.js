"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.QUALTRICS_LOADER_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.QUALTRICS_LOADER_SERVICE_MIGRATION = {
    // feature-libs/qualtrics/components/qualtrics-loader/qualtrics-loader.service.ts
    "class": constants_1.QUALTRICS_LOADER_SERVICE,
    importPath: libs_constants_1.SPARTACUS_QUALTRICS_COMPONENTS,
    deprecatedParams: [
        {
            className: constants_1.WINDOW_REF,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.RENDERER_FACTORY_2,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.PLATFORM,
            literalInference: constants_1.ANY_TYPE,
            injectionToken: {
                token: constants_1.PLATFORM_ID_STRING,
                importPath: constants_1.ANGULAR_CORE
            }
        },
    ],
    removeParams: [
        {
            className: constants_1.RENDERER_FACTORY_2,
            importPath: constants_1.ANGULAR_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.SCRIPT_LOADER_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=qualtrics-loader.service.migration.js.map