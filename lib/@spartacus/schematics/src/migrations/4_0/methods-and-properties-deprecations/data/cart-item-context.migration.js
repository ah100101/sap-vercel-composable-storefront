"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CART_ITEM_CONTEXT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/storefrontlib/cms-components/cart/cart-shared/cart-item/model/cart-item-context.model.ts
exports.CART_ITEM_CONTEXT_MIGRATION = [
    {
        "class": constants_1.CART_ITEM_CONTEXT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.PROMOTION_LOCATION$,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Property '").concat(constants_1.CART_ITEM_CONTEXT, ".").concat(constants_1.PROMOTION_LOCATION$, "' has been renamed to '").concat(constants_1.LOCATION$, "'.")
    },
];
//# sourceMappingURL=cart-item-context.migration.js.map