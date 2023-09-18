"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.WINDOW_REF_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.WINDOW_REF_MIGRATION = {
    // projects/core/src/window/window-ref.ts
    "class": constants_1.WINDOW_REF,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        {
            className: constants_1.DOCUMENT,
            literalInference: constants_1.ANY_TYPE,
            injectionToken: {
                token: constants_1.DOCUMENT_STRING,
                importPath: constants_1.ANGULAR_COMMON
            }
        },
    ],
    addParams: [
        {
            className: constants_1.PLATFORM,
            literalInference: constants_1.OBJECT_TYPE,
            injectionToken: {
                token: constants_1.PLATFORM_ID_STRING,
                importPath: constants_1.ANGULAR_CORE
            }
        },
        {
            className: constants_1.SERVER_REQUEST_URL_STRING,
            literalInference: constants_1.STRING_TYPE,
            injectionToken: {
                token: constants_1.SERVER_REQUEST_URL_STRING,
                importPath: libs_constants_1.SPARTACUS_CORE
            }
        },
        {
            className: constants_1.SERVER_REQUEST_ORIGIN_STRING,
            literalInference: constants_1.STRING_TYPE,
            injectionToken: {
                token: constants_1.SERVER_REQUEST_ORIGIN_STRING,
                importPath: libs_constants_1.SPARTACUS_CORE
            }
        },
    ]
};
//# sourceMappingURL=window-ref.migration.js.map