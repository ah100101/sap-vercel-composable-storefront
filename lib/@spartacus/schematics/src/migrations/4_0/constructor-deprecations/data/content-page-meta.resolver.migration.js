"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONTENT_PAGE_META_RESOLVER_MIGRATION_V2 = exports.CONTENT_PAGE_META_RESOLVER_MIGRATION_V1 = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONTENT_PAGE_META_RESOLVER_MIGRATION_V1 = {
    "class": constants_1.CONTENT_PAGE_META_RESOLVER,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.CMS_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.TRANSLATION_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.ROUTING_PAGE_META_RESOLVER, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    removeParams: [
        { className: constants_1.CMS_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.TRANSLATION_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.ROUTING_PAGE_META_RESOLVER, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    addParams: [
        { className: constants_1.BASE_PAGE_META_RESOLVER, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
exports.CONTENT_PAGE_META_RESOLVER_MIGRATION_V2 = {
    "class": constants_1.CONTENT_PAGE_META_RESOLVER,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.CMS_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.TRANSLATION_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.ROUTING_PAGE_META_RESOLVER, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.BASE_PAGE_META_RESOLVER, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    removeParams: [
        { className: constants_1.CMS_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.TRANSLATION_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.ROUTING_PAGE_META_RESOLVER, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
//# sourceMappingURL=content-page-meta.resolver.migration.js.map