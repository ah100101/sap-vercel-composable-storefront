"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.QUICK_ORDER_FORM_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.QUICK_ORDER_FORM_COMPONENT_MIGRATION = {
    // feature-libs/cart/quick-order/components/quick-order/form/quick-order-form.component.ts
    "class": constants_1.QUICK_ORDER_FORM_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_CART_QUICK_ORDER_COMPONENTS,
    deprecatedParams: [
        {
            className: constants_1.GLOBAL_MESSAGE_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.QUICK_ORDER_FACADE,
            importPath: libs_constants_1.SPARTACUS_CART_QUICK_ORDER_ROOT
        },
    ],
    removeParams: [
        {
            className: constants_1.GLOBAL_MESSAGE_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.CONFIG,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.CHANGE_DETECTOR_REF,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.WINDOW_REF,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=quick-order-form.component.migration.js.map