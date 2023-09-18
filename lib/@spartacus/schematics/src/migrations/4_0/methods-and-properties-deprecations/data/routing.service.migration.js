"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ROUTING_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/routing/facade/routing.service.ts
exports.ROUTING_SERVICE_MIGRATION = [
    {
        "class": constants_1.ROUTING_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GO,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " '").concat(constants_1.ROUTING_SERVICE, ".").concat(constants_1.GO, "' changed signature. Before 4.0, the object with query params could be passed in the 2nd argument. Now the 2nd argument is Angular NavigationExtras object (with 'queryParams' property).")
    },
];
//# sourceMappingURL=routing.service.migration.js.map