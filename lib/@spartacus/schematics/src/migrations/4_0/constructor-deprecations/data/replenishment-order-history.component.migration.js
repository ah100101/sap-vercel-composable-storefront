"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.REPLENISHMENT_ORDER_HISTORY_COMPONENT_MIGRATION_V2 = exports.REPLENISHMENT_ORDER_HISTORY_COMPONENT_MIGRATION_V1 = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.REPLENISHMENT_ORDER_HISTORY_COMPONENT_MIGRATION_V1 = {
    // storefrontlib/cms-components/myaccount/order/replenishment-order-history/replenishment-order-history.component.ts
    "class": constants_1.REPLENISHMENT_ORDER_HISTORY_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.USER_REPLENISHMENT_ORDER_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.TRANSLATION_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.VIEW_CONTAINER_REF,
            importPath: constants_1.ANGULAR_CORE
        },
    ],
    removeParams: [
        {
            className: constants_1.REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    addParams: [
        {
            className: constants_1.LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
exports.REPLENISHMENT_ORDER_HISTORY_COMPONENT_MIGRATION_V2 = {
    // storefrontlib/cms-components/myaccount/order/replenishment-order-history/replenishment-order-history.component.ts
    "class": constants_1.REPLENISHMENT_ORDER_HISTORY_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.USER_REPLENISHMENT_ORDER_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.TRANSLATION_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.VIEW_CONTAINER_REF,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    removeParams: [
        {
            className: constants_1.REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=replenishment-order-history.component.migration.js.map