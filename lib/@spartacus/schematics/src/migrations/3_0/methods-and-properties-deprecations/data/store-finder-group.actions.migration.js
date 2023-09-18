"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.STORE_FINDER_ACTIONS_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/store-finder/store/actions/index.ts
exports.STORE_FINDER_ACTIONS_MIGRATION = [
    {
        "class": constants_1.STORE_FINDER_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.FIND_STORES_CLASS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " please change the property type of 'searchConfig' to '").concat(constants_1.SEARCH_CONFIG, "' for '").concat(constants_1.FIND_STORES_CLASS, "' action")
    },
];
//# sourceMappingURL=store-finder-group.actions.migration.js.map