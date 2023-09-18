"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.migrate = exports.RENAMED_SYMBOLS_DATA = void 0;
var rename_symbol_1 = require("../../mechanism/rename-symbol/rename-symbol");
var checkout_rename_symbol_1 = require("./checkout-rename-symbol");
exports.RENAMED_SYMBOLS_DATA = __spreadArray([], checkout_rename_symbol_1.CHECKOUT_RENAMED_SYMBOLS_DATA, true);
function migrate() {
    return function (tree) {
        return (0, rename_symbol_1.migrateRenamedSymbols)(tree, exports.RENAMED_SYMBOLS_DATA);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=rename-symbol.js.map