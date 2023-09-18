"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.BREAKPOINT_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.BREAKPOINT_SERVICE_MIGRATION = {
    // projects/storefrontlib/layout/breakpoint/breakpoint.service.ts
    "class": constants_1.BREAKPOINT_SERVICE,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.WINDOW_REF,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.LAYOUT_CONFIG,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    addParams: [
        {
            className: constants_1.PLATFORM,
            literalInference: constants_1.ANY_TYPE,
            injectionToken: {
                token: constants_1.PLATFORM_ID_STRING,
                importPath: constants_1.ANGULAR_CORE
            }
        },
    ]
};
//# sourceMappingURL=breakpoint.service.migration.js.map