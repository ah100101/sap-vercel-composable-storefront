"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PRODUCT_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.PRODUCT_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION = {
    // projects/storefrontlib/events/product/product-page-event.builder.spec.ts
    "class": constants_1.PRODUCT_PAGE_EVENT_BUILDER,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        { className: constants_1.EVENT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.PRODUCT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.PRODUCT_SEARCH_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.FEATURE_CONFIG_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    removeParams: [
        { className: constants_1.FEATURE_CONFIG_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
//# sourceMappingURL=product-page-event.builder.migration.js.map