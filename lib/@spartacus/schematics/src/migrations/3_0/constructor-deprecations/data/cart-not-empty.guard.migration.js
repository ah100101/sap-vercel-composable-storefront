"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CART_NOT_EMPTY_GUARD_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CART_NOT_EMPTY_GUARD_MIGRATION = {
    // projects/storefrontlib/cms-components/cart/cart-not-empty.guard.ts
    "class": constants_1.CART_NOT_EMPTY_GUARD,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ACTIVE_CART_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    removeParams: [
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.SEMANTIC_PATH_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ROUTER,
            importPath: constants_1.ANGULAR_ROUTER
        },
    ]
};
//# sourceMappingURL=cart-not-empty.guard.migration.js.map