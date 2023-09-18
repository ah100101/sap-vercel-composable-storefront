"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
var schematics_1 = require("@angular-devkit/schematics");
function default_1(options) {
    return function (host, context) {
        return (0, schematics_1.chain)([
            (0, schematics_1.schematic)('add-spartacus', options),
            options.ssr ? (0, schematics_1.schematic)('add-ssr', options) : (0, schematics_1.noop)(),
        ])(host, context);
    };
}
exports["default"] = default_1;
//# sourceMappingURL=index.js.map