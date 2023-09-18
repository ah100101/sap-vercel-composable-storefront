"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.GUEST_REGISTER_FORM_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
var constants_2 = require("./../../../../shared/constants");
exports.GUEST_REGISTER_FORM_COMPONENT_MIGRATION = {
    // feature-libs/checkout/components/order-confirmation/components/guest-register-form/guest-register-form.component.ts
    "class": constants_1.GUEST_REGISTER_FORM_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS,
    deprecatedParams: [
        { className: constants_1.USER_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_2.ROUTING_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_2.AUTH_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_2.FORM_BUILDER, importPath: constants_2.ANGULAR_FORMS },
    ],
    removeParams: [
        { className: constants_1.USER_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_2.ROUTING_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_2.AUTH_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_2.FORM_BUILDER, importPath: constants_2.ANGULAR_FORMS },
    ],
    addParams: [
        {
            className: constants_1.USER_REGISTER_FACADE,
            importPath: libs_constants_1.SPARTACUS_USER_PROFILE_ROOT
        },
        { className: constants_2.ROUTING_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_2.AUTH_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_2.FORM_BUILDER, importPath: constants_2.ANGULAR_FORMS },
    ]
};
//# sourceMappingURL=guest-register-form.component.migration.js.map