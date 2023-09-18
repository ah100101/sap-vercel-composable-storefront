"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONSIGNMENT_TRACKING_COMPONENT_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONSIGNMENT_TRACKING_COMPONENT_CONSTRUCTOR_MIGRATION = {
    // feature-libs/order/components/order-details/order-detail-items/consignment-tracking/consignment-tracking.component.ts
    "class": constants_1.CONSIGNMENT_TRACKING_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_ORDER_COMPONENTS,
    deprecatedParams: [
        {
            className: constants_1.ORDER_HISTORY_FACADE,
            importPath: libs_constants_1.SPARTACUS_ORDER_ROOT
        },
        {
            className: constants_1.MODAL_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    removeParams: [
        {
            className: constants_1.MODAL_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    addParams: [
        {
            className: constants_1.LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.VIEW_CONTAINER_REF,
            importPath: constants_1.ANGULAR_CORE
        },
    ]
};
//# sourceMappingURL=consignment-tracking.component.migration.js.map