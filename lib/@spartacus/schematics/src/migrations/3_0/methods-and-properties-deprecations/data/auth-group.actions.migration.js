"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.AUTH_ACTIONS_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.AUTH_ACTIONS_MIGRATION = [
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_CLIENT_TOKEN,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Variable available under 'ClientAuthActions' namespace.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_CLIENT_TOKEN_FAIL,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Variable available under 'ClientAuthActions' namespace.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_CLIENT_TOKEN_SUCCESS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Variable available under 'ClientAuthActions' namespace.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_CLIENT_TOKEN_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action available under 'ClientAuthActions' namespace.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_CLIENT_TOKEN_FAIL_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action available under 'ClientAuthActions' namespace.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_CLIENT_TOKEN_SUCCESS_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action available under 'ClientAuthActions' namespace.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOGOUT_CUSTOMER_SUPPORT_AGENT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Variable available under 'AsmActions' namespace.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_USER_TOKEN,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'AuthService' and 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_USER_TOKEN_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'AuthService' and 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_USER_TOKEN_FAIL,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'AuthService' and 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_USER_TOKEN_FAIL_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'AuthService' and 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_USER_TOKEN_SUCCESS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'AuthService' and 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_USER_TOKEN_SUCCESS_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'AuthService' and 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.REFRESH_USER_TOKEN,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.REFRESH_USER_TOKEN_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.REFRESH_USER_TOKEN_FAIL,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.REFRESH_USER_TOKEN_FAIL_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.REFRESH_USER_TOKEN_SUCCESS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.REFRESH_USER_TOKEN_SUCCESS_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.REVOKE_USER_TOKEN,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'AuthService' and 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.REVOKE_USER_TOKEN_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'AuthService' and 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.REVOKE_USER_TOKEN_FAIL,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'AuthService' and 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.REVOKE_USER_TOKEN_FAIL_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'AuthService' and 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.REVOKE_USER_TOKEN_SUCCESS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'AuthService' and 'OAuthLibWrapperService'.")
    },
    {
        "class": constants_1.AUTH_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.REVOKE_USER_TOKEN_SUCCESS_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Look for replacement in 'AuthService' and 'OAuthLibWrapperService'.")
    },
];
//# sourceMappingURL=auth-group.actions.migration.js.map