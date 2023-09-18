"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.SELECTIVE_CART_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/cart/facade/selective-cart.service.ts
exports.SELECTIVE_CART_SERVICE_MIGRATION = [
    {
        "class": constants_1.SELECTIVE_CART_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GET_LOADED,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.SELECTIVE_CART_SERVICE, ".").concat(constants_1.GET_LOADED, "' was removed, use '").concat(constants_1.IS_STABLE, "' method instead")
    },
];
//# sourceMappingURL=selective-cart.service.migration.js.map