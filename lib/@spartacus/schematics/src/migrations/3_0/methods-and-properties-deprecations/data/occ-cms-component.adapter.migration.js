"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.OCC_CMS_COMPONENT_ADAPTER_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/occ/adapters/cms/occ-cms-component.adapter.ts
exports.OCC_CMS_COMPONENT_ADAPTER_MIGRATION = [
    {
        "class": constants_1.OCC_CMS_COMPONENT_ADAPTER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: 'findComponentsByIdsLegacy',
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.FIND_COMPONENTS_BY_IDS_LEGACY, "' was removed from '").concat(constants_1.OCC_CMS_COMPONENT_ADAPTER, "'. This method was used to adapt legacy versions of the OCC CMS component API, where a POST was required. We've moved the legacy implementation to an optional 'LegacyOccCmsComponentAdapter'.")
    },
];
//# sourceMappingURL=occ-cms-component.adapter.migration.js.map