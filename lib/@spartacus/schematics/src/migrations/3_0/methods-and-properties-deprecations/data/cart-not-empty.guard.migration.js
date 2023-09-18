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
// projects/storefrontlib/cms-components/cart/cart-not-empty.guard.ts
exports.CART_NOT_EMPTY_GUARD_MIGRATION = [
    {
        "class": constants_1.CART_NOT_EMPTY_GUARD,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.CAN_ACTIVATE,
        newNode: constants_1.CAN_ACTIVATE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.CAN_ACTIVATE, "' return type has changed from 'Observable<boolean>' to 'Observable<boolean | UrlTree>'.")
    },
];
//# sourceMappingURL=cart-not-empty.guard.migration.js.map