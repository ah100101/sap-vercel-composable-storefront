"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT_MIGRATION = {
    //feature-libs/product-configurator/rulebased/components/attribute/header/configurator-attribute-header.component.ts
    "class": constants_1.CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [
        {
            className: constants_1.CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED
        },
    ],
    addParams: [
        {
            className: constants_1.CONFIGURATOR_COMMONS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED
        },
        {
            className: constants_1.CONFIGURATOR_GROUPS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED
        },
        {
            className: constants_1.CONFIGURATOR_UI_SETTINGS_CONFIG,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED
        },
    ]
};
//# sourceMappingURL=configurator-attribute-header.component.migration.js.map