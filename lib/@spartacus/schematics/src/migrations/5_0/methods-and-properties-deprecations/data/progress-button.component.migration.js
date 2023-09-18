"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PROGRESS_BUTTON_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/storefrontlib/shared/components/progress-button/progress-button.component.ts
exports.PROGRESS_BUTTON_COMPONENT_MIGRATION = [
    {
        "class": constants_1.PROGRESS_BUTTON_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.CLIK_EVENT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Output '").concat(constants_1.CLIK_EVENT, "' has been renamed to '").concat(constants_1.CLIK_EVENT, "' (typo).")
    },
];
//# sourceMappingURL=progress-button.component.migration.js.map