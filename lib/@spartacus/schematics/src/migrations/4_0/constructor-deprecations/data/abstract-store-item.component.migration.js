"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ABSTRACT_STORE_ITEM_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ABSTRACT_STORE_ITEM_COMPONENT_MIGRATION = {
    // feature-libs/storefinder/components/abstract-store-item/abstract-store-item.component.ts
    "class": constants_1.ABSTRACT_STORE_ITEM_COMPONENT,
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
//# sourceMappingURL=abstract-store-item.component.migration.js.map