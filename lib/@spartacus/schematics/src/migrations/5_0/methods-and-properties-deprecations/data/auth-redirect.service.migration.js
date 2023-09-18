"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.AUTH_REDIRECT_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/auth/user-auth/services/auth-redirect.service.ts
exports.AUTH_REDIRECT_SERVICE_MIGRATION = [
    {
        "class": constants_1.AUTH_REDIRECT_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.REPORT_AUTH_GUARD,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.AUTH_REDIRECT_SERVICE, ".").concat(constants_1.REPORT_AUTH_GUARD, "' was removed, use '").concat(constants_1.SAVE_CURRENT_NAVIGATION_URL, "' method instead.")
    },
    {
        "class": constants_1.AUTH_REDIRECT_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.REPORT_NOT_AUTH_GUARD,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.AUTH_REDIRECT_SERVICE, ".").concat(constants_1.REPORT_NOT_AUTH_GUARD, "' was removed. No replacement needed. Every visited URL is now remembered automatically as redirect URL on 'NavigationEnd' event.")
    },
];
//# sourceMappingURL=auth-redirect.service.migration.js.map