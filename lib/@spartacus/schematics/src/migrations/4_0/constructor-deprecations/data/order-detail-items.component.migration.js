"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ORDER_DETAIL_ITEMS_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ORDER_DETAIL_ITEMS_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/myaccount/order/order-details/order-detail-items/order-detail-items.component.ts
    "class": constants_1.ORDER_DETAIL_ITEMS_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        { className: constants_1.ORDER_DETAILS_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
        { className: constants_1.PROMOTION_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
    ],
    removeParams: [
        { className: constants_1.PROMOTION_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
    ]
};
//# sourceMappingURL=order-detail-items.component.migration.js.map