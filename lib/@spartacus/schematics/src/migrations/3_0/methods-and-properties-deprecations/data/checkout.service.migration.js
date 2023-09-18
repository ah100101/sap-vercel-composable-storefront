"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CHECKOUT_SERVICE_MIGRATION = void 0;
var shared_1 = require("../../../../shared");
exports.CHECKOUT_SERVICE_MIGRATION = [
    {
        "class": shared_1.CHECKOUT_SERVICE,
        importPath: shared_1.SPARTACUS_CORE,
        deprecatedNode: shared_1.PLACE_ORDER,
        comment: "//".concat(shared_1.TODO_SPARTACUS, " please add 'termsChecked' parameter to your parameters for method ").concat(shared_1.PLACE_ORDER)
    },
    {
        "class": shared_1.CHECKOUT_SERVICE,
        importPath: shared_1.SPARTACUS_CORE,
        deprecatedNode: shared_1.GET_ORDER_DETAILS,
        newNode: shared_1.GET_ORDER_DETAILS,
        comment: "// ".concat(shared_1.TODO_SPARTACUS, " Method '").concat(shared_1.GET_ORDER_DETAILS, "' changed the return type from 'Observable<Order>' to 'Observable<Order | ReplenishmentOrder>")
    },
];
//# sourceMappingURL=checkout.service.migration.js.map