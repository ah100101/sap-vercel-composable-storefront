"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_COMMONS_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONFIGURATOR_COMMONS_SERVICE_MIGRATION = [
    {
        "class": constants_1.CONFIGURATOR_COMMONS_SERVICE,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.CONFIGURATOR_REMOVE_OBSOLETE_PRODUCT_BOUND_CONFIGURATION,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.CONFIGURATOR_COMMONS_SERVICE, ".").concat(constants_1.CONFIGURATOR_REMOVE_OBSOLETE_PRODUCT_BOUND_CONFIGURATION, "' was removed. Consult the migration documentation on how to deal with that")
    },
];
//# sourceMappingURL=configurator-commons-service.migration.js.map