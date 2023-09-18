"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.TRACKING_EVENTS_COMPONENT_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.TRACKING_EVENTS_COMPONENT_CONSTRUCTOR_MIGRATION = {
    // feature-libs/order/components/order-details/order-detail-items/consignment-tracking/tracking-events/tracking-events.component.ts
    "class": constants_1.TRACKING_EVENTS_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_ORDER_COMPONENTS,
    deprecatedParams: [
        {
            className: constants_1.ORDER_HISTORY_FACADE,
            importPath: libs_constants_1.SPARTACUS_ORDER_ROOT
        },
        {
            className: constants_1.NGB_ACTIVE_MODAL,
            importPath: constants_1.NG_BOOTSTRAP
        },
    ],
    removeParams: [
        {
            className: constants_1.NGB_ACTIVE_MODAL,
            importPath: constants_1.NG_BOOTSTRAP
        },
    ],
    addParams: [
        {
            className: constants_1.LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.ELEMENT_REF,
            importPath: constants_1.ANGULAR_CORE
        },
    ]
};
//# sourceMappingURL=tracking-events.component.migration.js.map