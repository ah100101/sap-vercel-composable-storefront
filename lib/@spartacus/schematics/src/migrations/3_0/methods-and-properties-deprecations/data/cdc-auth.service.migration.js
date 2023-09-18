"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CDC_AUTH_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CDC_AUTH_SERVICE_MIGRATION = [
    {
        "class": constants_1.CDC_AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CDC,
        deprecatedNode: "authorizeWithCustomCdcFlow",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " 'authorizeWithCustomCdcFlow' method was renamed to 'loginWithCustomCdcFlow'.")
    },
    {
        "class": constants_1.CDC_AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CDC,
        deprecatedNode: "logout",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " 'logout' method override was removed. Now CDC hooks into logout process, by providing 'CdcLogoutGuard' as 'LogoutGuard'.")
    },
];
//# sourceMappingURL=cdc-auth.service.migration.js.map