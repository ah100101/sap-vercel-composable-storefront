"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CART_ITEM_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CART_ITEM_COMPONENT_MIGRATION = [
    {
        "class": constants_1.CART_ITEM_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.NG_ON_INIT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.CART_ITEM_COMPONENT, ".").concat(constants_1.NG_ON_INIT, "' was removed. ").concat(constants_1.CART_DETAILS_COMPONENT, " does not implement OnInit anymore")
    },
];
//# sourceMappingURL=cart-item-component.migration.js.map