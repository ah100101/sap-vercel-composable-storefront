"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CHECKOUT_CONNECTOR_MIGRATION = void 0;
var shared_1 = require("../../../../shared");
exports.CHECKOUT_CONNECTOR_MIGRATION = [
    {
        "class": shared_1.CHECKOUT_CONNECTOR,
        importPath: shared_1.SPARTACUS_CORE,
        deprecatedNode: shared_1.PLACE_ORDER,
        comment: "//".concat(shared_1.TODO_SPARTACUS, " please add the 'termsChecked' parameter to your parameters for method ").concat(shared_1.PLACE_ORDER)
    },
];
//# sourceMappingURL=checkout.connector.migration.js.map