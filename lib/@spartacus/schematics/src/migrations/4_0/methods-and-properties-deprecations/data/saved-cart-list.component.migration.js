"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.SAVED_CART_LIST_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// feature-libs/cart/saved-cart/components/list/saved-cart-list.component.ts
exports.SAVED_CART_LIST_COMPONENT_MIGRATION = [
    {
        "class": constants_1.SAVED_CART_LIST_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_CART_SAVED_CART_COMPONENTS,
        deprecatedNode: constants_1.RESTORE_SAVED_CART,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.SAVED_CART_LIST_COMPONENT, ".").concat(constants_1.RESTORE_SAVED_CART, "' was removed. ").concat(constants_1.SAVED_CART_FORM_DIALOG_COMPONENT, " will handle the restore saved cart logic")
    },
    {
        "class": constants_1.SAVED_CART_LIST_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_CART_SAVED_CART_COMPONENTS,
        deprecatedNode: constants_1.ON_RESTORE_COMPLETE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.SAVED_CART_LIST_COMPONENT, ".").concat(constants_1.ON_RESTORE_COMPLETE, "' was removed. ").concat(constants_1.SAVED_CART_FORM_DIALOG_COMPONENT, " will handle the restore saved cart completion logic")
    },
];
//# sourceMappingURL=saved-cart-list.component.migration.js.map