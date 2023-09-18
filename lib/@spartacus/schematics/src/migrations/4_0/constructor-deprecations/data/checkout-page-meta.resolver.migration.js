"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CHECKOUT_PAGE_META_RESOLVER_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CHECKOUT_PAGE_META_RESOLVER_MIGRATION = {
    "class": constants_1.CHECKOUT_PAGE_META_RESOLVER,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.TRANSLATION_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.ACTIVE_CART_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    addParams: [
        { className: constants_1.BASE_PAGE_META_RESOLVER, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
//# sourceMappingURL=checkout-page-meta.resolver.migration.js.map