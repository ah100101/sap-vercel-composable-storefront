"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_STOREFRONT_UTILS_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONFIGURATOR_STOREFRONT_UTILS_SERVICE_MIGRATION = {
    // feature-libs/product-configurator/rulebased/components/service/configurator-storefront-utils.service.ts
    "class": constants_1.CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
    importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [
        {
            className: constants_1.CONFIGURATOR_GROUPS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED
        },
        {
            className: constants_1.PLATFORM_ID_STRING,
            importPath: constants_1.ANGULAR_CORE
        },
    ],
    removeParams: [
        {
            className: constants_1.PLATFORM_ID_STRING,
            importPath: constants_1.ANGULAR_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.WINDOW_REF,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.KEYBOARD_FOCUS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=configurator-storefront-utils.service.migration.js.map