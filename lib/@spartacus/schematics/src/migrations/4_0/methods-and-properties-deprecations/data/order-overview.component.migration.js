"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ORDER_OVERVIEW_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/storefrontlib/shared/components/order-overview/order-overview.component.ts
exports.ORDER_OVERVIEW_COMPONENT_MIGRATION = [
    {
        "class": constants_1.ORDER_OVERVIEW_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_ORDER_CURRENT_DATE_CARD_CONTENT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.ORDER_OVERVIEW_COMPONENT, ".").concat(constants_1.GET_ORDER_CURRENT_DATE_CARD_CONTENT, "' now requires isoDate parameter. It is no longer optional")
    },
];
//# sourceMappingURL=order-overview.component.migration.js.map