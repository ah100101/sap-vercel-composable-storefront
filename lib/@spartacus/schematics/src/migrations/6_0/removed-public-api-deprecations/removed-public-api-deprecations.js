"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = void 0;
var removed_public_api_deprecation_1 = require("../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation");
var generated_removed_public_api_migration_1 = require("./data/generated-removed-public-api.migration");
function migrate() {
    return function (tree, context) {
        return (0, removed_public_api_deprecation_1.removedPublicApiDeprecation)(tree, context, generated_removed_public_api_migration_1.GENERATED_REMOVED_PUBLIC_API_DATA);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=removed-public-api-deprecations.js.map