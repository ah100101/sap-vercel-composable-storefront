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
        deprecatedNode: constants_1.SUB,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Property '").concat(constants_1.SUB, "' was removed from '").concat(constants_1.PRODUCT_LIST_COMPONENT_SERVICE, "'. It is no longer used.")
    },
    {
        "class": constants_1.PRODUCT_LIST_COMPONENT_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.SET_QUERY,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.SET_QUERY, "' was removed from '").concat(constants_1.PRODUCT_LIST_COMPONENT_SERVICE, "'. It is no longer used.")
    },
    {
        "class": constants_1.PRODUCT_LIST_COMPONENT_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.VIEW_PAGE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.VIEW_PAGE, "' was removed from '").concat(constants_1.PRODUCT_LIST_COMPONENT_SERVICE, "'. It is no longer used.")
    },
];
//# sourceMappingURL=product-list-component.service.migration.js.map