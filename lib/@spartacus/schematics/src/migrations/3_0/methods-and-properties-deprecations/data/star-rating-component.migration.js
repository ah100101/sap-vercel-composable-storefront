"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.STAR_RATING_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects\storefrontlib\src\shared\components\star-rating\star-rating.component.ts
exports.STAR_RATING_COMPONENT_MIGRATION = [
    {
        "class": constants_1.STAR_RATING_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.NG_ON_INIT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.NG_ON_INIT, "' is no longer called inside the '").concat(constants_1.STAR_RATING_COMPONENT, "'")
    },
    {
        "class": constants_1.STAR_RATING_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.SET_RATE_ON_EVENT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.SET_RATE_ON_EVENT, "' is no longer used, the '").concat(constants_1.SET_RATE, "' method is used instead")
    },
];
//# sourceMappingURL=star-rating-component.migration.js.map