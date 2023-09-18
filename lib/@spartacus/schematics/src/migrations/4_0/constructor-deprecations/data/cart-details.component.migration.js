"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CART_DETAILS_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CART_DETAILS_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/cart/cart-details/cart-details.component.ts
    "class": constants_1.CART_DETAILS_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        { className: constants_1.ACTIVE_CART_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.PROMOTION_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
        { className: constants_1.SELECTIVE_CART_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.AUTH_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.ROUTING_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    removeParams: [
        { className: constants_1.PROMOTION_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
    ]
};
//# sourceMappingURL=cart-details.component.migration.js.map