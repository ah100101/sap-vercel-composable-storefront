"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.QUICK_ORDER_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.QUICK_ORDER_SERVICE_MIGRATION = {
    // feature-libs/cart/quick-order/core/services/quick-order.service.ts
    "class": constants_1.QUICK_ORDER_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CART_QUICK_ORDER_CORE,
    deprecatedParams: [
        {
            className: constants_1.ACTIVE_CART_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.PRODUCT_ADAPTER,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.EVENT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.PRODUCT_SEARCH_CONNECTOR,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    removeParams: [
        {
            className: constants_1.PRODUCT_ADAPTER,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=quick-order.service.migration.js.map