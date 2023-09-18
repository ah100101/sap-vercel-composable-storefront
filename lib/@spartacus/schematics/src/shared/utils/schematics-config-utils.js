"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfiguredDependencies = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const schematics_config_mappings_1 = require("../schematics-config-mappings");
/**
 * Returns the configured dependencies for the given feature.
 */
function getConfiguredDependencies(feature) {
    var _a;
    const featureConfig = schematics_config_mappings_1.featureSchematicConfigMapping.get(feature);
    if (!featureConfig) {
        throw new schematics_1.SchematicsException(`No feature config found for ${feature}.`);
    }
    return (_a = featureConfig.dependencyFeatures) !== null && _a !== void 0 ? _a : [];
}
exports.getConfiguredDependencies = getConfiguredDependencies;
//# sourceMappingURL=schematics-config-utils.js.map