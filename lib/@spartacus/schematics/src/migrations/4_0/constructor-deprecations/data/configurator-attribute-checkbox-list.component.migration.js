"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_ATTRIBUTE_CHECKBOX_LIST_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONFIGURATOR_ATTRIBUTE_CHECKBOX_LIST_COMPONENT_MIGRATION = {
    // feature-libs/product-configurator/rulebased/components/attribute/types/checkbox-list/configurator-attribute-checkbox-list.component.ts
    "class": constants_1.CONFIGURATOR_ATTRIBUTE_CHECKBOX_LIST_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [
        {
            className: constants_1.CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED
        },
    ],
    addParams: [
        {
            className: constants_1.CONFIGURATOR_ATTRIBUTE_QUANTITY_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED
        },
    ]
};
//# sourceMappingURL=configurator-attribute-checkbox-list.component.migration.js.map