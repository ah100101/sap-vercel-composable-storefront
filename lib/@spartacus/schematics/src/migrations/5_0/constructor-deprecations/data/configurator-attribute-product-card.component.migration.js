"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_ATTRIBUTE_PRODUCT_CARD_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONFIGURATOR_ATTRIBUTE_PRODUCT_CARD_COMPONENT_MIGRATION = {
    //feature-libs/product-configurator/rulebased/components/attribute/product-card/configurator-attribute-product-card.component.ts
    "class": constants_1.CONFIGURATOR_ATTRIBUTE_PRODUCT_CARD_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [
        {
            className: constants_1.PRODUCT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.KEYBOARD_FOCUS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    addParams: [
        {
            className: constants_1.TRANSLATION_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=configurator-attribute-product-card.component.migration.js.map