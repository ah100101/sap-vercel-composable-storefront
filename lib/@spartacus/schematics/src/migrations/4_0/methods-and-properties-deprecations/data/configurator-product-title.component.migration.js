"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_PRODUCT_TITLE_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
//feature-libs/product-configurator/rulebased/components/product-title/configurator-product-title.component.ts
exports.CONFIGURATOR_PRODUCT_TITLE_COMPONENT_MIGRATION = [
    {
        "class": constants_1.CONFIGURATOR_PRODUCT_TITLE_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.GET_PRODUCT_IMAGE_URL,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_PRODUCT_IMAGE_URL, "' was removed from '").concat(constants_1.CONFIGURATOR_PRODUCT_TITLE_COMPONENT, "'. It is no longer used.")
    },
    {
        "class": constants_1.CONFIGURATOR_PRODUCT_TITLE_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.GET_PRODUCT_IMAGE_ALT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_PRODUCT_IMAGE_ALT, "' was removed from '").concat(constants_1.CONFIGURATOR_PRODUCT_TITLE_COMPONENT, "'. It is no longer used.")
    },
    {
        "class": constants_1.CONFIGURATOR_PRODUCT_TITLE_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.CLICK_ON_ENTER,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.CLICK_ON_ENTER, "' was removed from '").concat(constants_1.CONFIGURATOR_PRODUCT_TITLE_COMPONENT, "'. It is no longer used.")
    },
];
//# sourceMappingURL=configurator-product-title.component.migration.js.map