"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.POPOVER_DIRECTIVE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/storefrontlib/shared/components/popover/popover.directive.ts
exports.POPOVER_DIRECTIVE_MIGRATION = [
    {
        "class": constants_1.POPOVER_DIRECTIVE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.HANDLE_OPEN,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.POPOVER_DIRECTIVE, ".").concat(constants_1.HANDLE_OPEN, "' was removed, use methods 'handleEscape', 'handleClick', 'handlePress', 'handleTab' instead.")
    },
    {
        "class": constants_1.POPOVER_DIRECTIVE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.TOGGLE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.POPOVER_DIRECTIVE, ".").concat(constants_1.TOGGLE, "' was removed, use methods 'handleEscape', 'handleClick', 'handlePress', 'handleTab' instead.")
    },
];
//# sourceMappingURL=popover-directive.migration.js.map