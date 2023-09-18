"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = exports.CONFIG_DEPRECATION_DATA = void 0;
var config_deprecation_1 = require("../../mechanism/config-deprecations/config-deprecation");
var product_configurator_rulebased_feature_migration_1 = require("./data/product-configurator-rulebased-feature.migration");
var product_configurator_textfield_feature_migration_1 = require("./data/product-configurator-textfield-feature.migration");
exports.CONFIG_DEPRECATION_DATA = [
    product_configurator_textfield_feature_migration_1.PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_MIGRATION,
    product_configurator_rulebased_feature_migration_1.PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_MIGRATION,
];
function migrate() {
    return function (tree, context) {
        return (0, config_deprecation_1.migrateConfigDeprecation)(tree, context, exports.CONFIG_DEPRECATION_DATA);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=config-deprecation.js.map