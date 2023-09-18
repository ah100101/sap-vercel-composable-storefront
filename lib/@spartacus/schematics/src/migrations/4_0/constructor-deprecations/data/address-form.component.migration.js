"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ADDRESS_FORM_COMPONENT_MIGRATION_V2 = exports.ADDRESS_FORM_COMPONENT_MIGRATION_V1 = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ADDRESS_FORM_COMPONENT_MIGRATION_V1 = {
    // projects/storefrontlib/cms-components/myaccount/address-book/address-form/address-form.component.ts
    "class": constants_1.ADDRESS_FORM_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.FORM_BUILDER, importPath: constants_1.ANGULAR_FORMS },
        { className: constants_1.CHECKOUT_DELIVERY_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.USER_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.USER_ADDRESS_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.MODAL_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
    ],
    removeParams: [
        { className: constants_1.CHECKOUT_DELIVERY_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
exports.ADDRESS_FORM_COMPONENT_MIGRATION_V2 = {
    // projects/storefrontlib/cms-components/myaccount/address-book/address-form/address-form.component.ts
    "class": constants_1.ADDRESS_FORM_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.FORM_BUILDER, importPath: constants_1.ANGULAR_FORMS },
        { className: constants_1.USER_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.USER_ADDRESS_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.GLOBAL_MESSAGE_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.MODAL_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
    ],
    addParams: [{ className: constants_1.TRANSLATION_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE }]
};
//# sourceMappingURL=address-form.component.migration.js.map