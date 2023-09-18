"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.MULTI_CART_STATE_PERSISTENCE_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/cart/services/multi-cart-state-persistence.service.ts
exports.MULTI_CART_STATE_PERSISTENCE_SERVICE_MIGRATION = [
    {
        "class": constants_1.MULTI_CART_STATE_PERSISTENCE_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.SYNC,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.SYNC, "' was renamed to ").concat(constants_1.INIT_SYNC, ".")
    },
];
//# sourceMappingURL=multi-cart-state-persistence.service.migration.js.map