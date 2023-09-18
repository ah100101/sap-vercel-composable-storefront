"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.QUICK_ORDER_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.QUICK_ORDER_SERVICE_MIGRATION = [
    {
        "class": constants_1.QUICK_ORDER_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CART_QUICK_ORDER_CORE,
        deprecatedNode: constants_1.SEARCH,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.QUICK_ORDER_SERVICE, ".").concat(constants_1.SEARCH, "' was removed. Use 'searchProducts' instead.")
    },
    {
        "class": constants_1.QUICK_ORDER_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CART_QUICK_ORDER_CORE,
        deprecatedNode: constants_1.REMOVE_ENTRY,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.QUICK_ORDER_SERVICE, ".").concat(constants_1.REMOVE_ENTRY, "' was removed. Use 'softDeleteEntry' instead.")
    },
];
//# sourceMappingURL=quick-order.service.migration.js.map