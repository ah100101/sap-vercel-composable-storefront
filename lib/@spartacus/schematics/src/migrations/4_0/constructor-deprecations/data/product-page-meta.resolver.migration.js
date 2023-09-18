"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PRODUCT_PAGE_META_RESOLVER_MIGRATION_V2 = exports.PRODUCT_PAGE_META_RESOLVER_MIGRATION_V1 = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.PRODUCT_PAGE_META_RESOLVER_MIGRATION_V1 = {
    "class": constants_1.PRODUCT_PAGE_META_RESOLVER,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.ROUTING_SERVICE, importPath: constants_1.ANGULAR_ROUTER },
        { className: constants_1.PRODUCT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.TRANSLATION_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    addParams: [
        { className: constants_1.BASE_PAGE_META_RESOLVER, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.PAGE_LINK_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
exports.PRODUCT_PAGE_META_RESOLVER_MIGRATION_V2 = {
    "class": constants_1.PRODUCT_PAGE_META_RESOLVER,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.ROUTING_SERVICE, importPath: constants_1.ANGULAR_ROUTER },
        { className: constants_1.PRODUCT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.TRANSLATION_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.BASE_PAGE_META_RESOLVER, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    addParams: [{ className: constants_1.PAGE_LINK_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE }]
};
//# sourceMappingURL=product-page-meta.resolver.migration.js.map