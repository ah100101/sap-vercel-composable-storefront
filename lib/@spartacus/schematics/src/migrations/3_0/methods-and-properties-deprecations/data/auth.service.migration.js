"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.AUTH_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.AUTH_SERVICE_MIGRATION = [
    {
        "class": constants_1.AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "authorize",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " authorize method was renamed to 'loginWithCredentials' and returns Promise that will resolve when login procedure completes.")
    },
    {
        "class": constants_1.AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: 'getOccUserId',
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " method was moved from this service. 'UserIdService.getUserId' is the new replacement for this method.")
    },
    {
        "class": constants_1.AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: 'invokeWithUserId',
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " method was moved to 'UserIdService'.")
    },
    {
        "class": constants_1.AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: 'getUserToken',
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " this method was removed as it should not be used outside auth module. To check if user is logged in use 'isUserLoggedIn' and to get user id use 'UserIdService.getUserId'. If you need access to tokens then use 'AuthStorageService.getToken'.")
    },
    {
        "class": constants_1.AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: 'refreshUserToken',
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " this method was moved and renamed to 'OAuthLibWrapperService.refreshToken'.")
    },
    {
        "class": constants_1.AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: 'authorizeWithToken',
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " this method was removed. Instead you can create object of the shape 'AuthToken' and pass to 'AuthStorageService.setToken'.")
    },
    {
        "class": constants_1.AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: 'getClientToken',
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " this method was moved to 'ClientTokenService'.")
    },
    {
        "class": constants_1.AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: 'refreshClientToken',
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " this method was moved to 'ClientTokenService'.")
    },
    {
        "class": constants_1.AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: 'isClientTokenLoaded',
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " this method was moved to 'ClientTokenService'.")
    },
];
//# sourceMappingURL=auth.service.migration.js.map