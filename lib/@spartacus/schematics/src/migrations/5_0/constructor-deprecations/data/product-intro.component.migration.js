"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PRODUCT_INTRO_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.PRODUCT_INTRO_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/product/product-intro/product-intro.component.ts
    "class": constants_1.PRODUCT_INTRO_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [],
    addParams: [{ className: constants_1.EVENT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE }]
};
//# sourceMappingURL=product-intro.component.migration.js.map