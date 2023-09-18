"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = exports.REMOVED_DEPENDENCIES = void 0;
var dependency_management_1 = require("../../mechanism/dependency-management/dependency-management");
exports.REMOVED_DEPENDENCIES = [];
function migrate() {
    return function (tree, context) {
        return (0, dependency_management_1.migrateDependencies)(tree, context, exports.REMOVED_DEPENDENCIES);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=dependency-management.js.map