"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.UPDATE_EMAIL_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/storefrontlib/cms-components/myaccount/update-email/update-email.component.ts
exports.UPDATE_EMAIL_COMPONENT_MIGRATION = [
    {
        "class": constants_1.UPDATE_EMAIL_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.ON_SUCCESS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.ON_SUCCESS, "' return type from '").concat(constants_1.UPDATE_EMAIL_COMPONENT, "' was changed from void to 'Promise<void>'")
    },
];
//# sourceMappingURL=update-email.component.migration.js.map