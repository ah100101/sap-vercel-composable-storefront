"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIG_INITIALIZER_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
//projects/core/src/config/config-initializer/config-initializer.service.ts
exports.CONFIG_INITIALIZER_SERVICE_MIGRATION = [
    {
        "class": constants_1.CONFIG_INITIALIZER_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GET_STABLE_CONFIG,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.CONFIG_INITIALIZER_SERVICE, ".").concat(constants_1.GET_STABLE_CONFIG, "' was removed from '").concat(constants_1.CONFIG_INITIALIZER_SERVICE, "'. Instead use method '").concat(constants_1.GET_STABLE, "'")
    },
];
//# sourceMappingURL=config-initializer.service.migration.js.map