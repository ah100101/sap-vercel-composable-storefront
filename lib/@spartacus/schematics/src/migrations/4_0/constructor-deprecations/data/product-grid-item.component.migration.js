"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PRODUCT_GRID_ITEM_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.PRODUCT_GRID_ITEM_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/product/product-list/product-grid-item/product-grid-item.component.ts
    "class": constants_1.PRODUCT_GRID_ITEM_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [],
    addParams: [
        {
            className: constants_1.PRODUCT_LIST_ITEM_CONTEXT_SOURCE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=product-grid-item.component.migration.js.map