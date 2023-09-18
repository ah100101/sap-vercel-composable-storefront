"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ORGANIZATION_PAGE_META_RESOLVER_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ORGANIZATION_PAGE_META_RESOLVER_MIGRATION = {
    "class": constants_1.ORGANIZATION_PAGE_META_RESOLVER,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.CONTENT_PAGE_META_RESOLVER, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.TRANSLATION_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.SEMANTIC_PATH_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.ROUTING_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.BASE_PAGE_META_RESOLVER, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    removeParams: [
        { className: constants_1.BASE_PAGE_META_RESOLVER, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
//# sourceMappingURL=organization-page-meta.resolver.migration.js.map