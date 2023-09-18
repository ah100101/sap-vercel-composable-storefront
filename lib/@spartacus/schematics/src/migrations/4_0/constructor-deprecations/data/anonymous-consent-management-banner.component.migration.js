"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT_MIGRATION_V2 = exports.ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT_MIGRATION_V1 = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT_MIGRATION_V1 = {
    // storefrontlib/cms-components/anonymous-consent-management/banner/anonymous-consent-management-banner.component.ts
    "class": constants_1.ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.ANONYMOUS_CONSENTS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.VIEW_CONTAINER_REF,
            importPath: constants_1.ANGULAR_CORE
        },
    ],
    removeParams: [
        {
            className: constants_1.ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    addParams: [
        {
            className: constants_1.LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
exports.ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT_MIGRATION_V2 = {
    // storefrontlib/cms-components/anonymous-consent-management/banner/anonymous-consent-management-banner.component.ts
    "class": constants_1.ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.ANONYMOUS_CONSENTS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.VIEW_CONTAINER_REF,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    removeParams: [
        {
            className: constants_1.ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=anonymous-consent-management-banner.component.migration.js.map