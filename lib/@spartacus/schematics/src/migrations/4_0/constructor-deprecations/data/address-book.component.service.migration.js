"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ADDRESS_BOOK_COMPONENT_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ADDRESS_BOOK_COMPONENT_SERVICE_MIGRATION = {
    // projects/storefrontlib/cms-components/myaccount/address-book/address-book.component.service.ts
    "class": constants_1.ADDRESS_BOOK_COMPONENT_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.USER_ADDRESS_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.CHECKOUT_DELIVERY_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    removeParams: [
        { className: constants_1.CHECKOUT_DELIVERY_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
//# sourceMappingURL=address-book.component.service.migration.js.map