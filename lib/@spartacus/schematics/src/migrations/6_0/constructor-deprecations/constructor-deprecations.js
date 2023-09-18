"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = void 0;
var constructor_deprecations_1 = require("../../mechanism/constructor-deprecations/constructor-deprecations");
var generated_constructor_migration_1 = require("./data/generated-constructor.migration");
function migrate() {
    return function (tree, context) {
        return (0, constructor_deprecations_1.migrateConstructorDeprecation)(tree, context, generated_constructor_migration_1.GENERATED_CONSTRUCTOR_MIGRATIONS);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=constructor-deprecations.js.map