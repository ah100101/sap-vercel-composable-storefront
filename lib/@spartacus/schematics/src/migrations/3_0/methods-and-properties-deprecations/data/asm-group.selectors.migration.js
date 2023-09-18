"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ASM_SELECTORS_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ASM_SELECTORS_MIGRATION = [
    {
        "class": constants_1.ASM_SELECTORS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GET_CUSTOMER_AGENT_TOKEN,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " To get token use 'AuthStorageService.getToken' and 'AsmAuthStorageService.getTokenTarget' to check if it belongs to CS agent.")
    },
    {
        "class": constants_1.ASM_SELECTORS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GET_CUSTOMER_AGENT_TOKEN_STATE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " To get token use 'AuthStorageService.getToken' and 'AsmAuthStorageService.getTokenTarget' to check if it belongs to CS agent.")
    },
    {
        "class": constants_1.ASM_SELECTORS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GET_CUSTOMER_AGENT_TOKEN_LOADING,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Currently there isn't replacement for this selector in core spartacus.")
    },
];
//# sourceMappingURL=asm-group.selectors.migration.js.map