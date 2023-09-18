"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = void 0;
var missing_packages_1 = require("../../mechanism/missing-packages/missing-packages");
var MISSING_PACKAGE_DATA = [];
function migrate() {
    return function (tree, context) {
        for (var _i = 0, MISSING_PACKAGE_DATA_1 = MISSING_PACKAGE_DATA; _i < MISSING_PACKAGE_DATA_1.length; _i++) {
            var migrationData = MISSING_PACKAGE_DATA_1[_i];
            (0, missing_packages_1.migrateMissingPackage)(tree, context, migrationData);
        }
    };
}
exports.migrate = migrate;
//# sourceMappingURL=missing-packages.js.map