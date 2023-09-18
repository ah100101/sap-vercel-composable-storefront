"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.FORBIDDEN_HANDLER_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.FORBIDDEN_HANDLER_MIGRATION = {
    // projects/core/src/global-message/http-interceptors/handlers/forbidden/forbidden.handler.ts
    "class": constants_1.FORBIDDEN_HANDLER,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [],
    addParams: [
        {
            className: constants_1.GLOBAL_MESSAGE_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.AUTH_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.OCC_ENDPOINTS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=forbidden.handler.migration.js.map