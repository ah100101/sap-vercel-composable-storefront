"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.MEDIA_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.MEDIA_SERVICE_MIGRATION = {
    "class": constants_1.MEDIA_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        {
            className: constants_1.STOREFRONT_CONFIG,
            literalInference: constants_1.STOREFRONT_CONFIG,
            injectionToken: {
                token: constants_1.CONFIG,
                importPath: libs_constants_1.SPARTACUS_CORE
            }
        },
        {
            className: constants_1.BREAKPOINT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    removeParams: [
        {
            className: constants_1.STOREFRONT_CONFIG,
            literalInference: constants_1.STOREFRONT_CONFIG,
            injectionToken: {
                token: constants_1.CONFIG,
                importPath: libs_constants_1.SPARTACUS_CORE
            }
        },
        {
            className: constants_1.BREAKPOINT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    addParams: [
        {
            className: constants_1.CONFIG,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=media.service.migration.js.map