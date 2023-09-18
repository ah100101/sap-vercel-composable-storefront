"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_TAB_BAR_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONFIGURATOR_TAB_BAR_COMPONENT_MIGRATION = {
    // feature-libs/product-configurator/rulebased/components/tab-bar/configurator-tab-bar.component.ts
    "class": constants_1.CONFIGURATOR_TAB_BAR_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [
        {
            className: constants_1.CONFIGURATOR_ROUTER_EXTRACTOR_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_COMMON
        },
    ],
    addParams: [
        {
            className: constants_1.CONFIGURATOR_COMMONS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED
        },
    ]
};
//# sourceMappingURL=configurator-tab-bar.component.migration.js.map