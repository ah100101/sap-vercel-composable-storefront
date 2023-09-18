"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ADDED_TO_CART_DIALOG_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ADDED_TO_CART_DIALOG_COMPONENT_MIGRATION = [
    {
        "class": constants_1.ADDED_TO_CART_DIALOG_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.INCREMENT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Property '").concat(constants_1.ADDED_TO_CART_DIALOG_COMPONENT, ".").concat(constants_1.INCREMENT, "' was removed. Please set 'numberOfEntriesBeforeAdd' property instead")
    },
    {
        "class": constants_1.ADDED_TO_CART_DIALOG_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.ORDER_PROMOTIONS$,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Property '").concat(constants_1.ADDED_TO_CART_DIALOG_COMPONENT, ".").concat(constants_1.ORDER_PROMOTIONS$, "' was removed. The component may get promotions directly from the cart.")
    },
];
//# sourceMappingURL=added-to-cart-dialog-component.migration.js.map