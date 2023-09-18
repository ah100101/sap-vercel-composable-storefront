"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
//projects/storefrontlib/cms-components/myaccount/order/order-details/order-detail-shipping/order-detail-shipping.component.ts;
exports.ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION = [
    {
        "class": constants_1.ORDER_DETAIL_SHIPPING_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_ADDRESS_CARD_CONTENT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_ADDRESS_CARD_CONTENT, "' was removed from '").concat(constants_1.ORDER_DETAIL_SHIPPING_COMPONENT, "'.")
    },
    {
        "class": constants_1.ORDER_DETAIL_SHIPPING_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_DELIVERY_MODE_CARD_CONTENT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_DELIVERY_MODE_CARD_CONTENT, "' was removed from '").concat(constants_1.ORDER_DETAIL_SHIPPING_COMPONENT, "'.")
    },
    {
        "class": constants_1.ORDER_DETAIL_SHIPPING_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_PAYMENT_CARD_CONTENT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_PAYMENT_CARD_CONTENT, "' was removed from '").concat(constants_1.ORDER_DETAIL_SHIPPING_COMPONENT, "'.")
    },
    {
        "class": constants_1.ORDER_DETAIL_SHIPPING_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_SHIPPING_METHOD_CARD_CONTENT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_SHIPPING_METHOD_CARD_CONTENT, "' was removed from '").concat(constants_1.ORDER_DETAIL_SHIPPING_COMPONENT, "'.")
    },
];
//# sourceMappingURL=order-detail-shipping.component.migration.js.map