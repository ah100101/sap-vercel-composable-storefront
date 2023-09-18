"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = void 0;
var rename_symbol_1 = require("../../mechanism/rename-symbol/rename-symbol");
var generated_rename_symbols_migration_1 = require("./data/generated-rename-symbols.migration");
function migrate() {
    return function (tree) {
        return (0, rename_symbol_1.migrateRenamedSymbols)(tree, generated_rename_symbols_migration_1.GENERATED_RENAMED_SYMBOLS_DATA);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=rename-symbol.js.map