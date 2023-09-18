"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.SCHEDULE_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.SCHEDULE_COMPONENT_MIGRATION = {
    // feature-libs/storefinder/components/schedule-component/schedule.component.ts
    "class": constants_1.SCHEDULE_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFINDER,
    deprecatedParams: [
        {
            className: constants_1.STORE_DATA_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
    ],
    removeParams: [
        {
            className: constants_1.STORE_DATA_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
    ]
};
//# sourceMappingURL=schedule.component.migration.js.map