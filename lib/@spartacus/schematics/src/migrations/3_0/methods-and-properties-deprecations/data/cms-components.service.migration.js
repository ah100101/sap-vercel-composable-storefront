"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CMS_COMPONENTS_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects\storefrontlib\src\cms-structure\services\cms-components.service.ts
exports.CMS_COMPONENTS_SERVICE_MIGRATION = [
    {
        "class": constants_1.CMS_COMPONENTS_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_CHILD_ROUTES,
        newNode: constants_1.GET_CHILD_ROUTES,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_CHILD_ROUTES, "' changed the return type from 'Route[]' to 'CmsComponentChildRoutesConfig'")
    },
    {
        "class": constants_1.CMS_COMPONENTS_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_INJECTORS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_INJECTORS, "' has been removed'")
    },
];
//# sourceMappingURL=cms-components.service.migration.js.map