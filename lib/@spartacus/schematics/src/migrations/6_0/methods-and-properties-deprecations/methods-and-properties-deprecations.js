"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = void 0;
var methods_and_properties_deprecations_1 = require("../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations");
var generated_methods_and_properties_migration_1 = require("./data/generated-methods-and-properties.migration");
function migrate() {
    return function (tree, context) {
        return (0, methods_and_properties_deprecations_1.migrateMethodPropertiesDeprecation)(tree, context, generated_methods_and_properties_migration_1.GENERATED_METHODS_AND_PROPERTIES_MIGRATION);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=methods-and-properties-deprecations.js.map