"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.BASE_SITE_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/site-context/facade/base-site.service.ts
exports.BASE_SITE_SERVICE_MIGRATION = [
    {
        "class": constants_1.BASE_SITE_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GET_ALL,
        newNode: constants_1.GET_ALL,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_ALL, "' changed the return type from 'Observable<string[]>' to 'Observable<BaseSite[]>'")
    },
    {
        "class": constants_1.BASE_SITE_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GET_BASE_SITE_DATA,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_BASE_SITE_DATA, "' is replaced by method 'get()'")
    },
    {
        "class": constants_1.BASE_SITE_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.SET_ACTIVE,
        newNode: constants_1.SET_ACTIVE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.SET_ACTIVE, "' changed the return type from 'Subscription' to 'void'")
    },
];
//# sourceMappingURL=base-site.service.migration.js.map