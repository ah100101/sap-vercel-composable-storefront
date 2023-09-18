"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.EXPRESS_CHECKOUT_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.EXPRESS_CHECKOUT_SERVICE_MIGRATION = [
    // feature-libs/checkout/components/services/express-checkout.service.ts
    {
        "class": constants_1.EXPRESS_CHECKOUT_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS,
        deprecatedNode: constants_1.RESET_CHECKOUT_PROCESSES,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.EXPRESS_CHECKOUT_SERVICE, ".").concat(constants_1.RESET_CHECKOUT_PROCESSES, "' was removed, use method '").concat(constants_1.RESET_CHECKOUT_PROCESSES, "' from '").concat(constants_1.CLEAR_CHECKOUT_FACADE, "' instead")
    },
];
//# sourceMappingURL=express-checkout.service.migration.js.map