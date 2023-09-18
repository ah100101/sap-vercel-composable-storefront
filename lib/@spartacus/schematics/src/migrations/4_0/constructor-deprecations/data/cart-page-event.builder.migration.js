"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CART_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION_V2 = exports.CART_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION_V1 = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CART_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION_V1 = {
    // projects/storefrontlib/events/cart/cart-page-event.builder.ts
    "class": constants_1.CART_PAGE_EVENT_BUILDER,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        { className: constants_1.ACTION_SUBJECT, importPath: constants_1.RXJS },
        { className: constants_1.EVENT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    removeParams: [{ className: constants_1.ACTION_SUBJECT, importPath: constants_1.RXJS }]
};
exports.CART_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION_V2 = {
    // projects/storefrontlib/events/cart/cart-page-event.builder.ts
    "class": constants_1.CART_PAGE_EVENT_BUILDER,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        { className: constants_1.ACTION_SUBJECT, importPath: constants_1.RXJS },
        { className: constants_1.EVENT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.FEATURE_CONFIG_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    removeParams: [
        { className: constants_1.ACTION_SUBJECT, importPath: constants_1.RXJS },
        { className: constants_1.FEATURE_CONFIG_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
//# sourceMappingURL=cart-page-event.builder.migration.js.map