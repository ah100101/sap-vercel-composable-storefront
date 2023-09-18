"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kahnsAlgorithm = exports.crossFeatureInstallationOrder = exports.crossFeatureDependencyGraph = exports.crossLibraryInstallationOrder = exports.crossLibraryDependencyGraph = exports.Graph = void 0;
const dependencies_json_1 = __importDefault(require("../../dependencies.json"));
const libs_constants_1 = require("../libs-constants");
const schematics_config_mappings_1 = require("../schematics-config-mappings");
const schematics_config_utils_1 = require("./schematics-config-utils");
class Graph {
    constructor(vertices) {
        this.adjacentVertices = {};
        if (vertices) {
            this.addVertex(...vertices);
        }
    }
    addVertex(...vertices) {
        for (const vertex of vertices) {
            if (!this.adjacentVertices[vertex]) {
                this.adjacentVertices[vertex] = [];
            }
        }
    }
    createEdge(v1, v2) {
        this.adjacentVertices[v1].push(v2);
    }
    getAdjacentVertices() {
        return this.adjacentVertices;
    }
}
exports.Graph = Graph;
exports.crossLibraryDependencyGraph = createLibraryDependencyGraph();
exports.crossLibraryInstallationOrder = kahnsAlgorithm(exports.crossLibraryDependencyGraph);
exports.crossFeatureDependencyGraph = createCrossFeaturesDependencyGraph();
exports.crossFeatureInstallationOrder = groupFeatures();
function groupFeatures() {
    const order = kahnsAlgorithm(exports.crossFeatureDependencyGraph);
    const auxOrder = [];
    for (const [index, feature] of Array.from(order.entries())) {
        const library = (0, schematics_config_mappings_1.getKeyByMappingValueOrThrow)(schematics_config_mappings_1.libraryFeatureMapping, feature);
        const lastExistingIndex = getLastLibraryIndex(auxOrder, library);
        if (!lastExistingIndex) {
            auxOrder.push({ library, feature });
            continue;
        }
        auxOrder.splice(lastExistingIndex + 1, 0, { library, feature });
        order.splice(index);
    }
    return auxOrder.map(({ feature }) => feature);
}
function getLastLibraryIndex(auxOrder, library) {
    let lastIndex;
    for (const [index, aux] of Array.from(auxOrder.entries())) {
        if (aux.library === library) {
            lastIndex = index;
        }
    }
    return lastIndex;
}
/**
 * Creates the order in which the Spartacus libraries should be installed.
 * https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm
 */
function kahnsAlgorithm(graph) {
    // Calculate the incoming degree for each vertex
    const vertices = Object.keys(graph.getAdjacentVertices());
    const inDegree = {};
    for (const vertex of vertices) {
        for (const neighbor of graph.getAdjacentVertices()[vertex]) {
            inDegree[neighbor] = inDegree[neighbor] + 1 || 1;
        }
    }
    /**
     * if there are no relations in the given graph,
     * just return the vertices, preserving the order
     */
    if (!Object.keys(inDegree).length) {
        return vertices;
    }
    // Create a queue which stores the vertex without dependencies
    const queue = vertices.filter((vertex) => !inDegree[vertex]);
    const topNums = {};
    let index = 0;
    while (queue.length) {
        const vertex = queue.shift();
        if (!vertex) {
            continue;
        }
        topNums[vertex] = index++;
        // adjust the incoming degree of its neighbors
        for (const neighbor of graph.getAdjacentVertices()[vertex]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    if (index !== vertices.length) {
        throw new Error(`Circular dependency detected.`);
    }
    return Object.keys(topNums).reverse();
}
exports.kahnsAlgorithm = kahnsAlgorithm;
function createLibraryDependencyGraph() {
    const skip = libs_constants_1.CORE_SPARTACUS_SCOPES.concat('storefrontapp-e2e-cypress', 'storefrontapp');
    const spartacusLibraries = Object.keys(dependencies_json_1.default).filter((dependency) => !skip.includes(dependency));
    const graph = new Graph(spartacusLibraries);
    for (const spartacusLib of spartacusLibraries) {
        const libraryDependencies = dependencies_json_1.default[spartacusLib];
        const spartacusPeerDependencies = Object.keys(libraryDependencies).filter((dependency) => dependency.startsWith(libs_constants_1.SPARTACUS_SCOPE));
        for (const spartacusPackage of spartacusPeerDependencies) {
            if (skip.includes(spartacusPackage)) {
                continue;
            }
            graph.createEdge(spartacusLib, spartacusPackage);
        }
    }
    return graph;
}
function createCrossFeaturesDependencyGraph() {
    var _a;
    const graph = new Graph();
    for (const spartacusLib of Array.from(schematics_config_mappings_1.libraryFeatureMapping.keys())) {
        const features = (_a = schematics_config_mappings_1.libraryFeatureMapping.get(spartacusLib)) !== null && _a !== void 0 ? _a : [];
        for (const feature of features) {
            graph.addVertex(feature);
            const dependencies = (0, schematics_config_utils_1.getConfiguredDependencies)(feature);
            for (const dependency of dependencies) {
                graph.createEdge(feature, dependency);
            }
        }
    }
    return graph;
}
//# sourceMappingURL=graph-utils.js.map