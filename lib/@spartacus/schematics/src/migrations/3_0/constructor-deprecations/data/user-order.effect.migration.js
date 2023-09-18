"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.USER_ORDERS_EFFECT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.USER_ORDERS_EFFECT_MIGRATION = {
    //projects/core/src/user/store/effects/user-orders.effect.ts
    "class": constants_1.USER_ORDERS_EFFECT,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        {
            className: constants_1.ACTIONS,
            importPath: constants_1.NGRX_EFFECTS
        },
        {
            className: constants_1.USER_ORDER_CONNECTOR,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.REPLENISHMENT_ORDER_CONNECTOR,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=user-order.effect.migration.js.map