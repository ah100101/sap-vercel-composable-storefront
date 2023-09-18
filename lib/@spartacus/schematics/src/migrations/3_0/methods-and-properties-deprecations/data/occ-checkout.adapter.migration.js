"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.OCC_CHECKOUT_ADAPTER_MIGRATION = void 0;
var shared_1 = require("../../../../shared");
exports.OCC_CHECKOUT_ADAPTER_MIGRATION = [
    {
        "class": shared_1.OCC_CHECKOUT_ADAPTER,
        importPath: shared_1.SPARTACUS_CORE,
        deprecatedNode: shared_1.PLACE_ORDER,
        comment: "//".concat(shared_1.TODO_SPARTACUS, " please add the 'termsChecked' parameter to your parameters for method ").concat(shared_1.PLACE_ORDER)
    },
];
//# sourceMappingURL=occ-checkout.adapter.migration.js.map