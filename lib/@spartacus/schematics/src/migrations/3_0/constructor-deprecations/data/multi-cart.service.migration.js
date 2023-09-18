"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.MULTI_CART_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.MULTI_CART_SERVICE_MIGRATION = {
    // projects/core/src/cart/facade/multi-cart.service.ts
    "class": constants_1.MULTI_CART_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        {
            className: constants_1.STORE,
            importPath: constants_1.NGRX_STORE
        },
    ],
    addParams: [
        {
            className: constants_1.USER_ID_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=multi-cart.service.migration.js.map