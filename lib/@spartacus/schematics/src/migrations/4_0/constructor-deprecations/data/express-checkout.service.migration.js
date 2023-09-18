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
exports.EXPRESS_CHECKOUT_SERVICE_MIGRATION = {
    // feature-libs/checkout/components/services/express-checkout.service.ts
    "class": constants_1.EXPRESS_CHECKOUT_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS,
    deprecatedParams: [
        {
            className: constants_1.USER_ADDRESS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.USER_PAYMENT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.CHECKOUT_DELIVERY_FACADE,
            importPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
        },
        {
            className: constants_1.CHECKOUT_PAYMENT_FACADE,
            importPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
        },
        {
            className: constants_1.CHECKOUT_DETAILS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
        },
        {
            className: constants_1.CHECKOUT_CONFIG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
        },
    ],
    addParams: [
        {
            className: constants_1.CLEAR_CHECKOUT_FACADE,
            importPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
        },
    ]
};
//# sourceMappingURL=express-checkout.service.migration.js.map