"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.LOGOUT_GUARD_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/storefrontlib/cms-components/user/logout-guard.ts
exports.LOGOUT_GUARD_MIGRATION = [
    {
        "class": constants_1.LOGOUT_GUARD,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.CAN_ACTIVATE,
        newNode: constants_1.CAN_ACTIVATE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.CAN_ACTIVATE, "' return type has changed from 'Observable<boolean>' to 'Observable<boolean | UrlTree>'.")
    },
    {
        "class": constants_1.LOGOUT_GUARD,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.LOGOUT,
        newNode: constants_1.LOGOUT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.LOGOUT, "' return type has changed from 'void' to 'Promise<any>'.")
    },
    {
        "class": constants_1.LOGOUT_GUARD,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.REDIRECT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.REDIRECT, "' has been removed from ").concat(constants_1.LOGOUT_GUARD, ". Please use 'getRedirectUrl()' instead.")
    },
];
//# sourceMappingURL=logout.guard.migration.js.map