"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ON_NAVIGATE_FOCUS_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ON_NAVIGATE_FOCUS_SERVICE_MIGRATION = {
    // projects/storefrontlib/layout/a11y/keyboard-focus/on-navigate/on-navigate-focus.service.ts
    "class": constants_1.ON_NAVIGATE_FOCUS_SERVICE,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.KEYBOARD_FOCUS_CONFIG,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.ROUTER,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.DOCUMENT,
            literalInference: constants_1.ANY_TYPE,
            injectionToken: {
                token: constants_1.DOCUMENT_STRING,
                importPath: constants_1.ANGULAR_COMMON
            }
        },
        {
            className: constants_1.BREAKPOINT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    removeParams: [
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
            className: constants_1.WINDOW_REF,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=on-navigate-focus.service.migration.js.map