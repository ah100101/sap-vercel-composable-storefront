"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.AUTH_GUARD_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.AUTH_GUARD_MIGRATION = [
    {
        "class": constants_1.AUTH_GUARD,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.CAN_ACTIVATE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " canActivate method now returns Observable that can emit boolean or UrlTree.")
    },
];
//# sourceMappingURL=auth.guard.migration.js.map