"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PAGE_META_SERVICE_MIGRATION = exports.CONTENT_PAGE_META_RESOLVER_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONTENT_PAGE_META_RESOLVER_MIGRATION = [
    {
        "class": constants_1.CONTENT_PAGE_META_RESOLVER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "homeBreadcrumb$",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " '").concat(constants_1.CONTENT_PAGE_META_RESOLVER, ".homeBreadcrumb$' property was removed since the breadcrumb is resolved by the 'BasePageMetaResolver'.")
    },
    {
        "class": constants_1.CONTENT_PAGE_META_RESOLVER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "breadcrumbs$",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " '").concat(constants_1.CONTENT_PAGE_META_RESOLVER, ".breadcrumbs$' property was removed since the breadcrumb is resolved by the 'BasePageMetaResolver'.")
    },
    {
        "class": constants_1.CONTENT_PAGE_META_RESOLVER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "title$",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " '").concat(constants_1.CONTENT_PAGE_META_RESOLVER, ".title$' property was removed since the title is resolved by the 'BasePageMetaResolver'.")
    },
    {
        "class": constants_1.CONTENT_PAGE_META_RESOLVER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "cms$",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " '").concat(constants_1.CONTENT_PAGE_META_RESOLVER, ".cms$' property was removed since the cms content is resolved by the 'BasePageMetaResolver'.")
    },
];
exports.PAGE_META_SERVICE_MIGRATION = [
    {
        "class": constants_1.PAGE_META_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "resolverMethods",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " '").concat(constants_1.PAGE_META_SERVICE, ".resolverMethods' property was changed to 'resolvers$' since the resolvers are read from the configuration stream.")
    },
];
//# sourceMappingURL=content-page-meta.resolver.migration.js.map