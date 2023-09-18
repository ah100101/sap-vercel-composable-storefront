"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = void 0;
var add_spartacus_1 = require("../../../add-spartacus");
function migrate() {
    return function () {
        return (0, add_spartacus_1.createStylePreprocessorOptions)();
    };
}
exports.migrate = migrate;
//# sourceMappingURL=angular-json-styles.js.map