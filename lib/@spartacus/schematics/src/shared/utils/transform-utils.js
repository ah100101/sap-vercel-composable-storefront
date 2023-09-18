"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.parseCSV = void 0;
function parseCSV(raw, defaultValues) {
    if (defaultValues === void 0) { defaultValues = []; }
    if (!raw) {
        return defaultValues.map(function (x) { return "'".concat(x, "'"); }).join(', ');
    }
    return raw
        .split(',')
        .map(function (x) { return "'".concat(x, "'"); })
        .join(', ');
}
exports.parseCSV = parseCSV;
//# sourceMappingURL=transform-utils.js.map