"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.AUTH_HTTP_HEADER_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/auth/user-auth/services/auth-http-header.service.ts
exports.AUTH_HTTP_HEADER_SERVICE_MIGRATION = [
    {
        "class": constants_1.AUTH_HTTP_HEADER_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.REFRESH_IN_PROGRESS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Property '").concat(constants_1.AUTH_HTTP_HEADER_SERVICE, ".").concat(constants_1.REFRESH_IN_PROGRESS, "' was removed. Use 'refreshInProgress$' Observable instead.")
    },
    {
        "class": constants_1.AUTH_HTTP_HEADER_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.HANDLE_EXPIRED_TOKEN,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.AUTH_HTTP_HEADER_SERVICE, ".").concat(constants_1.HANDLE_EXPIRED_TOKEN, "' was removed. Use 'getValidToken' instead.")
    },
];
//# sourceMappingURL=auth-http-header.service.migration.js.map