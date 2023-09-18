"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ANONYMOUS_CONSENT_TEMPLATES_CONNECTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ANONYMOUS_CONSENT_TEMPLATES_CONNECTOR_MIGRATION = [
    {
        "class": constants_1.ANONYMOUS_CONSENT_TEMPLATES_CONNECTOR,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.LOAD_ANONYMOUS_CONSENTS,
        newNode: constants_1.LOAD_ANONYMOUS_CONSENTS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method ").concat(constants_1.LOAD_ANONYMOUS_CONSENTS, " changed the return type from 'Observable<AnonymousConsent[] | null>' to 'Observable<AnonymousConsent[]>'")
    },
];
//# sourceMappingURL=anonymous-consent-templates.connector.migration.js.map