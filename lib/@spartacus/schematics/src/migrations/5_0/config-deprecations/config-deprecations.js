"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = exports.CONFIG_DEPRECATIONS_DATA = void 0;
var config_deprecation_1 = require("../../mechanism/config-deprecations/config-deprecation");
exports.CONFIG_DEPRECATIONS_DATA = [];
function migrate() {
    return function (tree, context) {
        return (0, config_deprecation_1.migrateConfigDeprecation)(tree, context, exports.CONFIG_DEPRECATIONS_DATA);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=config-deprecations.js.map