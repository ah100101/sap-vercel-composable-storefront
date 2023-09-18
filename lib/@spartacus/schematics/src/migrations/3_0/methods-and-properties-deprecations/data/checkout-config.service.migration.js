"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CHECKOUT_CONFIG_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/storefrontlib/cms-components/checkout/services/checkout-config.service.ts
exports.CHECKOUT_CONFIG_SERVICE_MIGRATION = [
    {
        "class": constants_1.CHECKOUT_CONFIG_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.STEPS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.STEPS, "' was removed from '").concat(constants_1.CHECKOUT_CONFIG_SERVICE, "'. Instead use ").concat(constants_1.CHECKOUT_STEP_SERVICE, "'.")
    },
    {
        "class": constants_1.CHECKOUT_CONFIG_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_CHECKOUT_STEP,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_CHECKOUT_STEP, "' was removed from '").concat(constants_1.CHECKOUT_CONFIG_SERVICE, "'. Instead use new method '").concat(constants_1.GET_CHECKOUT_STEP, "' from '").concat(constants_1.CHECKOUT_STEP_SERVICE, "'.")
    },
    {
        "class": constants_1.CHECKOUT_CONFIG_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_CHECKOUT_STEP_ROUTE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_CHECKOUT_STEP_ROUTE, "' was removed from '").concat(constants_1.CHECKOUT_CONFIG_SERVICE, "'. Instead use new method '").concat(constants_1.GET_CHECKOUT_STEP_ROUTE, "' from '").concat(constants_1.CHECKOUT_STEP_SERVICE, "'.")
    },
    {
        "class": constants_1.CHECKOUT_CONFIG_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_FIRST_CHECKOUT_STEP_ROUTE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_FIRST_CHECKOUT_STEP_ROUTE, "' was removed from '").concat(constants_1.CHECKOUT_CONFIG_SERVICE, "'. Instead use new method '").concat(constants_1.GET_FIRST_CHECKOUT_STEP_ROUTE, "' from '").concat(constants_1.CHECKOUT_STEP_SERVICE, "'.")
    },
    {
        "class": constants_1.CHECKOUT_CONFIG_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_NEXT_CHECKOUT_STEP_URL,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_NEXT_CHECKOUT_STEP_URL, "' was removed from '").concat(constants_1.CHECKOUT_CONFIG_SERVICE, "'. Instead use new method '").concat(constants_1.GET_NEXT_CHECKOUT_STEP_URL, "' from '").concat(constants_1.CHECKOUT_STEP_SERVICE, "'.")
    },
    {
        "class": constants_1.CHECKOUT_CONFIG_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_PREVIOUS_CHECKOUT_STEP_URL,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_PREVIOUS_CHECKOUT_STEP_URL, "' was removed from '").concat(constants_1.CHECKOUT_CONFIG_SERVICE, "'. Instead use new method '").concat(constants_1.GET_PREVIOUS_CHECKOUT_STEP_URL, "' from '").concat(constants_1.CHECKOUT_STEP_SERVICE, "'.")
    },
    {
        "class": constants_1.CHECKOUT_CONFIG_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_CURRENT_STEP_INDEX,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_CURRENT_STEP_INDEX, "' was removed from '").concat(constants_1.CHECKOUT_CONFIG_SERVICE, "'. Instead use new method '").concat(constants_1.GET_CURRENT_STEP_INDEX, "' from '").concat(constants_1.CHECKOUT_STEP_SERVICE, "'.")
    },
];
//# sourceMappingURL=checkout-config.service.migration.js.map