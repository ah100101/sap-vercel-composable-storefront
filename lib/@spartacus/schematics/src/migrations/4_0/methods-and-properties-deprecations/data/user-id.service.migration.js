"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.USER_ID_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.USER_ID_SERVICE_MIGRATION = [
    {
        "class": constants_1.USER_ID_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "invokeWithUserId",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.USER_ID_SERVICE, ".invokeWithUserId' was removed. Use 'takeUserId' method instead")
    },
];
//# sourceMappingURL=user-id.service.migration.js.map