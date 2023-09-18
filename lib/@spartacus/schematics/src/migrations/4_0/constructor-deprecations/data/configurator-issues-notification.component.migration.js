"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_ISSUES_NOTIFICATION_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONFIGURATOR_ISSUES_NOTIFICATION_COMPONENT_MIGRATION = {
    // feature-libs/product-configurator/common/components/configurator-issues-notification/configurator-issues-notification.component.ts
    "class": constants_1.CONFIGURATOR_ISSUES_NOTIFICATION_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
    deprecatedParams: [
        {
            className: constants_1.COMMON_CONFIGURATOR_UTILS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_COMMON
        },
    ],
    addParams: [
        {
            className: constants_1.CART_ITEM_CONTEXT,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=configurator-issues-notification.component.migration.js.map