"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PROTECTED_ROUTES_GUARD_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.PROTECTED_ROUTES_GUARD_MIGRATION = [
    {
        "class": constants_1.PROTECTED_ROUTES_GUARD,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "canActivate",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " The return type of the method 'canActivate' changed from 'Observable<boolean>' to 'Observable<boolean | UrlTree>'")
    },
];
//# sourceMappingURL=protected-routes.guard.migration.js.map