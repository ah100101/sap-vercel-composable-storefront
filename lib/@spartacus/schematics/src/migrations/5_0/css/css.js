"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = void 0;
var constants_1 = require("../../../shared/constants");
function migrate() {
    return function (_tree, context) {
        context.logger.warn("For a CSS migration guide, please visit this URL: ".concat(constants_1.CSS_V5_DOCS_URL));
    };
}
exports.migrate = migrate;
//# sourceMappingURL=css.js.map