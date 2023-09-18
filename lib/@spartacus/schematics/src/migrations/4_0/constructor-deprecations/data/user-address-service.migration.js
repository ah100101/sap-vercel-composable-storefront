"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.USER_ADDRESS_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.USER_ADDRESS_SERVICE_MIGRATION = {
    // projects/core/src/user/facade/user-address.service.ts
    "class": constants_1.USER_ADDRESS_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.STORE, importPath: constants_1.NGRX_STORE },
        { className: constants_1.USER_ID_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    addParams: [
        { className: constants_1.USER_ADDRESS_CONNECTOR, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.COMMAND_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
//# sourceMappingURL=user-address-service.migration.js.map