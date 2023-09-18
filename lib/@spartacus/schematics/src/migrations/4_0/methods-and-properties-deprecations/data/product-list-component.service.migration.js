"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/storefrontlib/cms-components/product/product-list/container/product-list-component.service.ts
exports.PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION = [
    {
        "class": constants_1.PRODUCT_LIST_COMPONENT_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.DEFAULT_PAGE_SIZE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Property '").concat(constants_1.PRODUCT_LIST_COMPONENT_SERVICE, ".").concat(constants_1.DEFAULT_PAGE_SIZE, "' was removed, to modify default page size use 'view.defaultPageSize' configuration property.")
    },
];
//# sourceMappingURL=product-list-component.service.migration.js.map