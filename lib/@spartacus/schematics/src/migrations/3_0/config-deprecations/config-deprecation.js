"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = exports.CONFIG_DEPRECATION_DATA = void 0;
var config_deprecation_1 = require("../../mechanism/config-deprecations/config-deprecation");
var legacy_flag_migration_1 = require("./data/legacy-flag.migration");
exports.CONFIG_DEPRECATION_DATA = [
    legacy_flag_migration_1.LEGACY_FLAG_MIGRATION,
];
function migrate() {
    return function (tree, context) {
        return (0, config_deprecation_1.migrateConfigDeprecation)(tree, context, exports.CONFIG_DEPRECATION_DATA);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=config-deprecation.js.map