"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.STORE_FINDER_LIST_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.STORE_FINDER_LIST_COMPONENT_MIGRATION = {
    // feature-libs/storefinder/components/store-finder-search-result/store-finder-list/store-finder-list.component.ts
    "class": constants_1.STORE_FINDER_LIST_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFINDER,
    deprecatedParams: [
        {
            className: constants_1.STORE_DATA_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
        {
            className: constants_1.DOCUMENT,
            literalInference: constants_1.ANY_TYPE,
            injectionToken: {
                token: constants_1.DOCUMENT_STRING,
                importPath: constants_1.ANGULAR_COMMON
            }
        },
    ],
    removeParams: [
        {
            className: constants_1.STORE_DATA_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
        {
            className: constants_1.DOCUMENT,
            literalInference: constants_1.ANY_TYPE,
            injectionToken: {
                token: constants_1.DOCUMENT_STRING,
                importPath: constants_1.ANGULAR_COMMON
            }
        },
    ],
    addParams: [
        {
            className: constants_1.STORE_FINDER_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
        {
            className: constants_1.DOCUMENT,
            literalInference: constants_1.ANY_TYPE,
            injectionToken: {
                token: constants_1.DOCUMENT_STRING,
                importPath: constants_1.ANGULAR_COMMON
            }
        },
    ]
};
//# sourceMappingURL=store-finder-list.component.migration.js.map