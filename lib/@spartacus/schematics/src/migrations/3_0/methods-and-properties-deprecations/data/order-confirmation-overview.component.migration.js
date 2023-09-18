"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
//projects/storefrontlib/cms-components/order-confirmation/components/order-confirmation-overview/order-confirmation-overview.component.ts;
exports.ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION = [
    {
        "class": constants_1.ORDER_CONFIRMATION_OVERVIEW_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_ADDRESS_CARD_CONTENT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_ADDRESS_CARD_CONTENT, "' was removed from '").concat(constants_1.ORDER_CONFIRMATION_OVERVIEW_COMPONENT, "'.")
    },
    {
        "class": constants_1.ORDER_CONFIRMATION_OVERVIEW_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_DELIVERY_MODE_CARD_CONTENT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_DELIVERY_MODE_CARD_CONTENT, "' was removed from '").concat(constants_1.ORDER_CONFIRMATION_OVERVIEW_COMPONENT, "'.")
    },
    {
        "class": constants_1.ORDER_CONFIRMATION_OVERVIEW_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_PAYMENT_INFO_CARD_CONTENT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_PAYMENT_INFO_CARD_CONTENT, "' was removed from '").concat(constants_1.ORDER_CONFIRMATION_OVERVIEW_COMPONENT, "'.")
    },
    {
        "class": constants_1.ORDER_CONFIRMATION_OVERVIEW_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_BILLING_ADDRESS_CARD_CONTENT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_BILLING_ADDRESS_CARD_CONTENT, "' was removed from '").concat(constants_1.ORDER_CONFIRMATION_OVERVIEW_COMPONENT, "'.")
    },
];
//# sourceMappingURL=order-confirmation-overview.component.migration.js.map