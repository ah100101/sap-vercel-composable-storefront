"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CHECKOUT_EVENT_MODULE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CHECKOUT_EVENT_MODULE_MIGRATION = {
    // projects/core/src/checkout/events/checkout-event.module.ts
    "class": constants_1.CHECKOUT_EVENT_MODULE,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.CHECKOUT_EVENT_BUILDER, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    addParams: [
        { className: constants_1.CHECKOUT_EVENT_LISTENER, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
//# sourceMappingURL=checkout-event.module.migration.js.map