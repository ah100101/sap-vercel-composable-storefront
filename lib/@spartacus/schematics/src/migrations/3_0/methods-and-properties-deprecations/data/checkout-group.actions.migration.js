"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CHECKOUT_GROUP_ACTIONS_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/checkout/store/actions/index.ts
exports.CHECKOUT_GROUP_ACTIONS_MIGRATION = [
    {
        "class": constants_1.CHECKOUT_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.PLACE_ORDER_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " please add the 'termsChecked' field to your payload object parameter for '").concat(constants_1.PLACE_ORDER_CLASS, "' actions")
    },
];
//# sourceMappingURL=checkout-group.actions.migration.js.map