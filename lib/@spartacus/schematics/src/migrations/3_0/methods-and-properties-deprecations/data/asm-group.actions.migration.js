"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ASM_ACTIONS_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ASM_ACTIONS_MIGRATION = [
    {
        "class": constants_1.ASM_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Variable removed. Instead use methods from 'CsAgentAuthService'.")
    },
    {
        "class": constants_1.ASM_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_FAIL,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Variable removed. Instead use methods from 'CsAgentAuthService'.")
    },
    {
        "class": constants_1.ASM_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Variable removed. Instead use methods from 'CsAgentAuthService'.")
    },
    {
        "class": constants_1.ASM_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Instead use methods from 'CsAgentAuthService'.")
    },
    {
        "class": constants_1.ASM_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_FAIL_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Instead use methods from 'CsAgentAuthService'.")
    },
    {
        "class": constants_1.ASM_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Action removed. Instead use methods from 'CsAgentAuthService'.")
    },
];
//# sourceMappingURL=asm-group.actions.migration.js.map