export declare class Graph {
    protected adjacentVertices: Record<string, Array<string>>;
    constructor(vertices?: string[]);
    addVertex(...vertices: string[]): void;
    createEdge(v1: string, v2: string): void;
    getAdjacentVertices(): Record<string, Array<string>>;
}
export declare const crossLibraryDependencyGraph: Graph;
export declare const crossLibraryInstallationOrder: string[];
export declare const crossFeatureDependencyGraph: Graph;
export declare const crossFeatureInstallationOrder: string[];
/**
 * Creates the order in which the Spartacus libraries should be installed.
 * https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm
 */
export declare function kahnsAlgorithm(graph: Graph): string[];
