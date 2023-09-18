"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ASM_AUTH_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ASM_AUTH_SERVICE_MIGRATION = [
    {
        "class": constants_1.ASM_AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "authorizeCustomerSupportAgent",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " 'authorizeCustomerSupportAgent' method was moved to 'CsAgentAuthService' and returns Promise that will resolve when login procedure completes.")
    },
    {
        "class": constants_1.ASM_AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "startCustomerEmulationSession",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " 'startCustomerEmulationSession' method was moved to 'CsAgentAuthService'.")
    },
    {
        "class": constants_1.ASM_AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "isCustomerEmulationToken",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " 'isCustomerEmulationToken' method was removed. To check for who token belongs it's better to use 'AsmAuthStorageService.getTokenTarget' method.")
    },
    {
        "class": constants_1.ASM_AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "getCustomerSupportAgentToken",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " 'getCustomerSupportAgentToken' method was removed. You should not directly interact with token outside of AsmModule. If you still need the token use 'AuthStorageService.getToken' and 'AsmAuthStorageService.getTokenTarget'.")
    },
    {
        "class": constants_1.ASM_AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "getCustomerSupportAgentTokenLoading",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " 'getCustomerSupportAgentTokenLoading' method was moved to 'CsAgentAuthService'. Warning: it is not yet implemented there!")
    },
    {
        "class": constants_1.ASM_AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "logoutCustomerSupportAgent",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " 'logoutCustomerSupportAgent' method was moved to 'CsAgentAuthService'.")
    },
];
//# sourceMappingURL=asm-auth.service.migration.js.map