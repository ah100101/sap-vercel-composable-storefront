import { SchematicConfig } from './utils/lib-utils';
/**
 * A list of all schematics feature configurations.
 * _Must_ be updated when adding a new schematics
 * library or a feature.
 */
export declare const SCHEMATICS_CONFIGS: SchematicConfig[];
/**
 * Maps sub-features to their parent feature.
 */
export declare const 
/**
 * Mapping of features to Spartacus library.
 *
 * E.g.:
 *
 * {
 * ...,
 *  '@spartacus/checkout': ['Checkout', 'Checkout-B2B', 'Checkout-Scheduled-Replenishment'],
 * ...
 * }
 */
libraryFeatureMapping: Map<string, string[]>, 
/**
 * Mapping of feature-modules to the Spartacus library.
 *
 * E.g.:
 *
 * {
 * ...,
 * 'Checkout': ['CheckoutModule'],
 * 'Checkout-B2B': ['CheckoutB2BModule'],
 * 'Checkout-Scheduled-Replenishment': ['CheckoutScheduledReplenishmentModule'],
 * ...
 * }
 */
featureFeatureModuleMapping: Map<string, string[]>, 
/**
 * Mapping of root feature-modules to the Spartacus library.
 *
 * E.g.:
 *
 * {
 * ...,
 * 'Checkout': ['CheckoutRootModule'],
 * 'Checkout-B2B': ['CheckoutB2BRootModule'],
 * 'Checkout-Scheduled-Replenishment': ['CheckoutScheduledReplenishmentRootModule'],
 * ...
 * }
 */
featureRootModuleMapping: Map<string, string[]>, 
/**
 * Mapping of schematics configurations to the Spartacus features.
 *
 * E.g.:
 *
 * {
 * ...,
 * 'Checkout': [CHECKOUT_BASE_SCHEMATICS_CONFIG],
 * 'Checkout-B2B': [CHECKOUT_B2B_SCHEMATICS_CONFIG],
 * ...
 * }
 */
featureSchematicConfigMapping: Map<string, SchematicConfig>;
/**
 * Generates mappings.
 */
export declare function generateMappings(): {
    libraryFeatureMapping: Map<string, string[]>;
    featureFeatureModuleMapping: Map<string, string[]>;
    featureRootModuleMapping: Map<string, string[]>;
    featureSchematicConfigMapping: Map<string, SchematicConfig>;
};
/**
 * Based on the given value,
 * it returns the key of the given object.
 */
export declare function getKeyByMappingValue(mapping: Map<string, string[]>, value: string): string | undefined;
/**
 * Based on the given value,
 * it returns the key of the given object.
 */
export declare function getKeyByMappingValueOrThrow(mapping: Map<string, string[]>, value: string): string;
/**
 * Returns the schematics config
 * for the given feature.
 */
export declare function getSchematicsConfigByFeatureOrThrow(feature: string): SchematicConfig;
