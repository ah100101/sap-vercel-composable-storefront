"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_OVERVIEW_ATTRIBUTE_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONFIGURATOR_OVERVIEW_ATTRIBUTE_COMPONENT_MIGRATION = {
    // feature-libs/product-configurator/rulebased/components/overview-attribute/configurator-overview-attribute.component.ts
    "class": constants_1.CONFIGURATOR_OVERVIEW_ATTRIBUTE_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [],
    addParams: [
        {
            className: constants_1.BREAKPOINT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=configurator-overview-attribute.component.migration.js.map