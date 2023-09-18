"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_CART_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONFIGURATOR_CART_SERVICE_MIGRATION = {
    // feature-libs/product-configurator/rulebased/core/facade/configurator-cart.service.ts
    "class": constants_1.CONFIGURATOR_CART_SERVICE,
    importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [
        { className: constants_1.STORE, importPath: constants_1.NGRX_STORE },
        { className: constants_1.STORE, importPath: constants_1.NGRX_STORE },
        { className: constants_1.ACTIVE_CART_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        {
            className: constants_1.COMMON_CONFIGURATOR_UTILS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_COMMON
        },
        { className: constants_1.CHECKOUT_FACADE, importPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT },
        { className: constants_1.USER_ID_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    // we omit the path for the following class because we don't want to have the respective
    // import deleted. Another constructor parameter is pointing to it
    removeParams: [
        {
            className: constants_1.STORE
        },
    ],
    addParams: [
        {
            className: constants_1.CONFIGURATOR_UTILS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED
        },
    ]
};
//# sourceMappingURL=configurator-cart.service.migration.js.map