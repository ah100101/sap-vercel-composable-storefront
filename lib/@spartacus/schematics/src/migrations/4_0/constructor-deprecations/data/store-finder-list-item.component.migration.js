"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.STORE_FINDER_LIST_ITEM_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.STORE_FINDER_LIST_ITEM_COMPONENT_MIGRATION = {
    // feature-libs/storefinder/components/store-finder-list-item/store-finder-list-item.component.ts
    "class": constants_1.STORE_FINDER_LIST_ITEM_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFINDER,
    deprecatedParams: [
        {
            className: constants_1.STORE_DATA_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
    ],
    removeParams: [
        {
            className: constants_1.STORE_DATA_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
    ],
    addParams: [
        {
            className: constants_1.STORE_FINDER_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
    ]
};
//# sourceMappingURL=store-finder-list-item.component.migration.js.map