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
export declare function analyzeCrossFeatureDependencies(startingFeatures: string[]): string[];
/**
 * Analyzes cross-library Spartacus dependencies
 * for the given set of features.
 *
 * For example, CDC depends on User and ASM features.
 *
 * Returns the ordered list, according to the features graph.
 */
export declare function analyzeCrossLibraryDependenciesByFeatures(startingFeatures: string[]): string[];
/**
 * Analyzes cross-library Spartacus dependencies
 * for the given set of libraries.
 *
 * For example, CDC depends on User and ASM features.
 *
 * Returns the ordered list, according to the features graph.
 */
export declare function analyzeCrossLibraryDependenciesByLibraries(startingLibraries: string[]): string[];
/**
 * Recursively collects the cross Spartacus library dependencies for the given library.
 */
export declare function collectCrossSpartacusPeerDeps(libraryName: string, collectedDeps: string[], processed?: string[]): void;
