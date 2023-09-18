"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.DELIVERY_MODE_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.DELIVERY_MODE_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/checkout/components/delivery-mode/delivery-mode.component.ts
    "class": constants_1.DELIVERY_MODE_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.FORM_BUILDER,
            importPath: constants_1.ANGULAR_FORMS
        },
        {
            className: constants_1.CHECKOUT_DELIVERY_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.CHECKOUT_CONFIG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.ACTIVATED_ROUTE,
            importPath: constants_1.ANGULAR_ROUTER
        },
    ],
    removeParams: [
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.CHECKOUT_STEP_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=delivery-mode.component.migration.js.map