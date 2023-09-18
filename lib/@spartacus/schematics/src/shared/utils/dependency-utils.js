"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.collectCrossSpartacusPeerDeps = exports.analyzeCrossLibraryDependenciesByLibraries = exports.analyzeCrossLibraryDependenciesByFeatures = exports.analyzeCrossFeatureDependencies = void 0;
var dependencies_json_1 = __importDefault(require("../../dependencies.json"));
var libs_constants_1 = require("../libs-constants");
var schematics_config_mappings_1 = require("../schematics-config-mappings");
var lib_utils_1 = require("./lib-utils");
var schematics_config_utils_1 = require("./schematics-config-utils");
/**
 * Analyzes cross-feature Spartacus dependencies
 * for the given set of features.
 *
 * E.g. when installing Digital Payments feature,
 * the following features will also be configured:
 * User-Account, User-Profile, Cart, Order, Checkout
 *
 * Returns the ordered list, according to the graph.
 */
function analyzeCrossFeatureDependencies(startingFeatures) {
    var result = [];
    for (var _i = 0, startingFeatures_1 = startingFeatures; _i < startingFeatures_1.length; _i++) {
        var feature = startingFeatures_1[_i];
        collectCrossFeatureDeps(feature, result);
    }
    return result.sort(function (feature1, feature2) {
        return (0, lib_utils_1.calculateCrossFeatureSort)(feature1, feature2);
    });
}
exports.analyzeCrossFeatureDependencies = analyzeCrossFeatureDependencies;
/**
 * Collects the cross-feature dependencies for the given feature.
 * It recursively collects the dependencies for each of the
 * found dependencies.
 */
function collectCrossFeatureDeps(feature, result) {
    // already processed
    if (result.includes(feature)) {
        return;
    }
    result.push(feature);
    var featureDependencies = (0, schematics_config_utils_1.getConfiguredDependencies)(feature);
    for (var _i = 0, featureDependencies_1 = featureDependencies; _i < featureDependencies_1.length; _i++) {
        var featureDependency = featureDependencies_1[_i];
        collectCrossFeatureDeps(featureDependency, result);
    }
}
/**
 * Analyzes cross-library Spartacus dependencies
 * for the given set of features.
 *
 * For example, CDC depends on User and ASM features.
 *
 * Returns the ordered list, according to the features graph.
 */
function analyzeCrossLibraryDependenciesByFeatures(startingFeatures) {
    var startingLibraries = [];
    for (var _i = 0, startingFeatures_2 = startingFeatures; _i < startingFeatures_2.length; _i++) {
        var feature = startingFeatures_2[_i];
        var library = (0, schematics_config_mappings_1.getKeyByMappingValueOrThrow)(schematics_config_mappings_1.libraryFeatureMapping, feature);
        startingLibraries.push(library);
    }
    return analyzeCrossLibraryDependenciesByLibraries(startingLibraries);
}
exports.analyzeCrossLibraryDependenciesByFeatures = analyzeCrossLibraryDependenciesByFeatures;
/**
 * Analyzes cross-library Spartacus dependencies
 * for the given set of libraries.
 *
 * For example, CDC depends on User and ASM features.
 *
 * Returns the ordered list, according to the features graph.
 */
function analyzeCrossLibraryDependenciesByLibraries(startingLibraries) {
    var spartacusPeerDeps = __spreadArray([], startingLibraries, true);
    for (var _i = 0, startingLibraries_1 = startingLibraries; _i < startingLibraries_1.length; _i++) {
        var spartacusLib = startingLibraries_1[_i];
        collectCrossSpartacusPeerDeps(spartacusLib, spartacusPeerDeps);
    }
    // remove the duplicates
    spartacusPeerDeps = Array.from(new Set(spartacusPeerDeps));
    // order the libraries
    spartacusPeerDeps = spartacusPeerDeps.sort(function (libraryA, libraryB) {
        return (0, lib_utils_1.calculateCrossLibrarySort)(libraryA, libraryB);
    });
    return spartacusPeerDeps;
}
exports.analyzeCrossLibraryDependenciesByLibraries = analyzeCrossLibraryDependenciesByLibraries;
/**
 * Recursively collects the cross Spartacus library dependencies for the given library.
 */
function collectCrossSpartacusPeerDeps(libraryName, collectedDeps, processed) {
    var _a;
    if (processed === void 0) { processed = []; }
    if (processed.includes(libraryName)) {
        return;
    }
    var peerDepsWithVersions = (_a = dependencies_json_1["default"][libraryName]) !== null && _a !== void 0 ? _a : {};
    var peerDeps = Object.keys(peerDepsWithVersions)
        .filter(function (d) { return d.startsWith(libs_constants_1.SPARTACUS_SCOPE); })
        .filter(function (d) { return !libs_constants_1.CORE_SPARTACUS_SCOPES.includes(d); })
        .filter(function (d) { return !collectedDeps.includes(d); });
    collectedDeps.push.apply(collectedDeps, peerDeps);
    processed.push(libraryName);
    for (var _i = 0, peerDeps_1 = peerDeps; _i < peerDeps_1.length; _i++) {
        var peerDep = peerDeps_1[_i];
        collectCrossSpartacusPeerDeps(peerDep, collectedDeps);
    }
}
exports.collectCrossSpartacusPeerDeps = collectCrossSpartacusPeerDeps;
//# sourceMappingURL=dependency-utils.js.map