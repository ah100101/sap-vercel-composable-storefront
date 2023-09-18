"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PRODUCT_LOADING_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.PRODUCT_LOADING_SERVICE_MIGRATION = {
    // projects/core/src/product/services/product-loading.service.ts
    "class": "ProductLoadingService",
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.STORE, importPath: constants_1.NGRX_STORE },
        { className: "LoadingScopesService", importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.ACTIONS, importPath: constants_1.NGRX_EFFECTS },
        {
            className: constants_1.PLATFORM,
            literalInference: constants_1.OBJECT_TYPE,
            injectionToken: {
                token: constants_1.PLATFORM_ID_STRING,
                importPath: constants_1.ANGULAR_CORE
            }
        },
    ],
    addParams: [{ className: constants_1.EVENT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE }]
};
//# sourceMappingURL=product-loading.service.migration.js.map