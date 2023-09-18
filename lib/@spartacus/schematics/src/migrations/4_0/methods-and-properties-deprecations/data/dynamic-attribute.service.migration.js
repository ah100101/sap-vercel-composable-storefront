"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/cms/services/dynamic-attribute.service.ts
exports.DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION = [
    {
        "class": constants_1.DYNAMIC_ATTRIBUTE_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "addDynamicAttributes",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " '").concat(constants_1.DYNAMIC_ATTRIBUTE_SERVICE, ".addDynamicAttributes' method was removed. Please use functions 'addAttributesToComponent' or 'addAttributesToSlot' instead")
    },
];
//# sourceMappingURL=dynamic-attribute.service.migration.js.map