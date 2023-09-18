"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.BREAKPOINT_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/storefrontlib/layout/breakpoint/breakpoint.service.ts
exports.BREAKPOINT_SERVICE_MIGRATION = [
    {
        "class": constants_1.BREAKPOINT_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_WINDOW,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Getter method of property '").concat(constants_1.GET_WINDOW, "' was removed from '").concat(constants_1.BREAKPOINT_SERVICE, "'. Instead use '").concat(constants_1.WINDOW_REF, "' directly.")
    },
    {
        "class": constants_1.BREAKPOINT_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_CLOSEST,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_CLOSEST, "' was removed from '").concat(constants_1.BREAKPOINT_SERVICE, "'. Instead use the method '").concat(constants_1.GET_BREAKPOINT, "' in '").concat(constants_1.BREAKPOINT_SERVICE, "'.")
    },
];
//# sourceMappingURL=breakpoint.service.migration.js.map