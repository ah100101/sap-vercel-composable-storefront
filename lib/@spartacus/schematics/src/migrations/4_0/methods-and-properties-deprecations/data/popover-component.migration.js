"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.POPOVER_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/storefrontlib/shared/components/popover/popover.component.ts
exports.POPOVER_COMPONENT_MIGRATION = [
    {
        "class": constants_1.POPOVER_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.INSIDE_CLICKED,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Property '").concat(constants_1.POPOVER_COMPONENT, ".").concat(constants_1.INSIDE_CLICKED, "' was removed.")
    },
];
//# sourceMappingURL=popover-component.migration.js.map