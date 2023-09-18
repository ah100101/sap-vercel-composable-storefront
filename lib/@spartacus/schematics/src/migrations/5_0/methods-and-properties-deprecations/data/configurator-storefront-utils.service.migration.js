"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_STOREFRONT_UTILS_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// feature-libs/product-configurator/rulebased/components/service/configurator-storefront-utils.service.ts
exports.CONFIGURATOR_STOREFRONT_UTILS_SERVICE_MIGRATION = [
    {
        "class": constants_1.CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.CONFIGURATOR_IS_IN_VIEWPORT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.CONFIGURATOR_STOREFRONT_UTILS_SERVICE, ".").concat(constants_1.CONFIGURATOR_IS_IN_VIEWPORT, "' was removed. It is not needed anymore as scrolling is always executed on navigation regardless of position of element.")
    },
];
//# sourceMappingURL=configurator-storefront-utils.service.migration.js.map