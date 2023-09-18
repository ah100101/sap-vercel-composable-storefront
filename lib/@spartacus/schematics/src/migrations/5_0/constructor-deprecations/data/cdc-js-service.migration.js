"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CDC_JS_SERVICE_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CDC_JS_SERVICE_CONSTRUCTOR_MIGRATION = {
    // integration-libs/cdc/root/service/cdc-js.service.ts
    "class": constants_1.CDC_JS_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CDC,
    addParams: [
        { className: constants_1.GLOBAL_MESSAGE_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    deprecatedParams: []
};
//# sourceMappingURL=cdc-js-service.migration.js.map