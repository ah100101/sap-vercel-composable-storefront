"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PAGE_EVENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/storefrontlib/events/page/page.events.ts
exports.PAGE_EVENT_MIGRATION = [
    {
        "class": constants_1.PAGE_EVENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.CONTEXT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Property '").concat(constants_1.PAGE_EVENT, ".").concat(constants_1.CONTEXT, "' was removed. Please use 'navigation' property instead, or subscribe to 'NavigationEvent'.")
    },
    {
        "class": constants_1.PAGE_EVENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.SEMANTIC_ROUTE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Property '").concat(constants_1.PAGE_EVENT, ".").concat(constants_1.SEMANTIC_ROUTE, "' was removed. Please use 'navigation' property instead, or subscribe to 'NavigationEvent'.")
    },
    {
        "class": constants_1.PAGE_EVENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.URL,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Property '").concat(constants_1.PAGE_EVENT, ".").concat(constants_1.URL, "' was removed. Please use 'navigation' property instead, or subscribe to 'NavigationEvent'.")
    },
    {
        "class": constants_1.PAGE_EVENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.PARAMS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Property '").concat(constants_1.PAGE_EVENT, ".").concat(constants_1.PARAMS, "' was removed. Please use 'navigation' property instead, or subscribe to 'NavigationEvent'.")
    },
];
//# sourceMappingURL=page-event.builder.ts.migration.js.map