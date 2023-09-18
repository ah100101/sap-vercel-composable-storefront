"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchematicsConfigByFeatureOrThrow = exports.getKeyByMappingValueOrThrow = exports.getKeyByMappingValue = exports.generateMappings = exports.featureSchematicConfigMapping = exports.featureRootModuleMapping = exports.featureFeatureModuleMapping = exports.libraryFeatureMapping = exports.SCHEMATICS_CONFIGS = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const asm_schematics_config_1 = require("./lib-configs/asm-schematics-config");
const cart_schematics_config_1 = require("./lib-configs/cart-schematics-config");
const checkout_schematics_config_1 = require("./lib-configs/checkout-schematics-config");
const customer_ticketing_schematics_config_1 = require("./lib-configs/customer-ticketing-schematics-config");
const cdc_schematics_config_1 = require("./lib-configs/integration-libs/cdc-schematics-config");
const cds_schematics_config_1 = require("./lib-configs/integration-libs/cds-schematics-config");
const digital_payments_schematics_config_1 = require("./lib-configs/integration-libs/digital-payments-schematics-config");
const epd_schematics_config_1 = require("./lib-configs/integration-libs/epd-schematics-config");
const s4om_schematics_config_1 = require("./lib-configs/integration-libs/s4om-schematics-config");
const order_schematics_config_1 = require("./lib-configs/order-schematics-config");
const organization_schematics_config_1 = require("./lib-configs/organization-schematics-config");
const pickup_in_store_schematics_config_1 = require("./lib-configs/pickup-in-store-schematics-config");
const product_configurator_schematics_config_1 = require("./lib-configs/product-configurator-schematics-config");
const product_schematics_config_1 = require("./lib-configs/product-schematics-config");
const qualtrics_schematics_config_1 = require("./lib-configs/qualtrics-schematics-config");
const smartedit_schematics_config_1 = require("./lib-configs/smartedit-schematics-config");
const storefinder_schematics_config_1 = require("./lib-configs/storefinder-schematics-config");
const tracking_schematics_config_1 = require("./lib-configs/tracking-schematics-config");
const user_schematics_config_1 = require("./lib-configs/user-schematics-config");
/**
 * A list of all schematics feature configurations.
 * _Must_ be updated when adding a new schematics
 * library or a feature.
 */
exports.SCHEMATICS_CONFIGS = [
    // feature libraries start
    asm_schematics_config_1.ASM_SCHEMATICS_CONFIG,
    cart_schematics_config_1.CART_BASE_SCHEMATICS_CONFIG,
    cart_schematics_config_1.CART_IMPORT_EXPORT_SCHEMATICS_CONFIG,
    cart_schematics_config_1.CART_QUICK_ORDER_SCHEMATICS_CONFIG,
    cart_schematics_config_1.CART_WISHLIST_SCHEMATICS_CONFIG,
    cart_schematics_config_1.CART_SAVED_CART_SCHEMATICS_CONFIG,
    checkout_schematics_config_1.CHECKOUT_BASE_SCHEMATICS_CONFIG,
    checkout_schematics_config_1.CHECKOUT_B2B_SCHEMATICS_CONFIG,
    checkout_schematics_config_1.CHECKOUT_SCHEDULED_REPLENISHMENT_SCHEMATICS_CONFIG,
    order_schematics_config_1.ORDER_SCHEMATICS_CONFIG,
    organization_schematics_config_1.ORGANIZATION_ADMINISTRATION_SCHEMATICS_CONFIG,
    organization_schematics_config_1.ORGANIZATION_ORDER_APPROVAL_SCHEMATICS_CONFIG,
    organization_schematics_config_1.ORGANIZATION_USER_REGISTRATION_SCHEMATICS_CONFIG,
    organization_schematics_config_1.ORGANIZATION_UNIT_ORDER_SCHEMATICS_CONFIG,
    organization_schematics_config_1.ORGANIZATION_ACCOUNT_SUMMARY_SCHEMATICS_CONFIG,
    pickup_in_store_schematics_config_1.PICKUP_IN_STORE_SCHEMATICS_CONFIG,
    product_configurator_schematics_config_1.PRODUCT_CONFIGURATOR_TEXTFIELD_SCHEMATICS_CONFIG,
    product_configurator_schematics_config_1.PRODUCT_CONFIGURATOR_RULEBASED_SCHEMATICS_CONFIG,
    product_configurator_schematics_config_1.PRODUCT_CONFIGURATOR_CPQ_SCHEMATICS_CONFIG,
    product_schematics_config_1.PRODUCT_BULK_PRICING_SCHEMATICS_CONFIG,
    product_schematics_config_1.PRODUCT_IMAGE_ZOOM_SCHEMATICS_CONFIG,
    product_schematics_config_1.PRODUCT_VARIANTS_SCHEMATICS_CONFIG,
    product_schematics_config_1.PRODUCT_FUTURE_STOCK_SCHEMATICS_CONFIG,
    qualtrics_schematics_config_1.QUALTRICS_SCHEMATICS_CONFIG,
    smartedit_schematics_config_1.SMARTEDIT_SCHEMATICS_CONFIG,
    storefinder_schematics_config_1.STOREFINDER_SCHEMATICS_CONFIG,
    tracking_schematics_config_1.TRACKING_PERSONALIZATION_SCHEMATICS_CONFIG,
    tracking_schematics_config_1.TRACKING_GTM_SCHEMATICS_CONFIG,
    tracking_schematics_config_1.TRACKING_AEP_SCHEMATICS_CONFIG,
    user_schematics_config_1.USER_ACCOUNT_SCHEMATICS_CONFIG,
    user_schematics_config_1.USER_PROFILE_SCHEMATICS_CONFIG,
    customer_ticketing_schematics_config_1.CUSTOMER_TICKETING_SCHEMATICS_CONFIG,
    // integration libraries start
    cdc_schematics_config_1.CDC_SCHEMATICS_CONFIG,
    cds_schematics_config_1.CDS_SCHEMATICS_CONFIG,
    digital_payments_schematics_config_1.DIGITAL_PAYMENTS_SCHEMATICS_CONFIG,
    epd_schematics_config_1.EPD_SCHEMATICS_CONFIG,
    s4om_schematics_config_1.S4OM_SCHEMATICS_CONFIG,
];
/**
 * Maps sub-features to their parent feature.
 */
_a = generateMappings(), 
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
exports.libraryFeatureMapping = _a.libraryFeatureMapping, 
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
exports.featureFeatureModuleMapping = _a.featureFeatureModuleMapping, 
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
exports.featureRootModuleMapping = _a.featureRootModuleMapping, 
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
exports.featureSchematicConfigMapping = _a.featureSchematicConfigMapping;
/**
 * Generates mappings.
 */
function generateMappings() {
    const featureMapping = new Map();
    const featureModuleMapping = new Map();
    const rootModuleMapping = new Map();
    const configMapping = new Map();
    for (const featureConfig of exports.SCHEMATICS_CONFIGS) {
        populateFeatureMapping(featureMapping, featureConfig);
        populateFeatureModuleMapping(featureModuleMapping, featureConfig);
        populateRootModulesMapping(rootModuleMapping, featureConfig);
        populateConfigMapping(configMapping, featureConfig);
    }
    return {
        libraryFeatureMapping: featureMapping,
        featureFeatureModuleMapping: featureModuleMapping,
        featureRootModuleMapping: rootModuleMapping,
        featureSchematicConfigMapping: configMapping,
    };
}
exports.generateMappings = generateMappings;
function populateFeatureMapping(mapping, featureConfig) {
    var _a;
    const feature = featureConfig.library.mainScope;
    const featureName = featureConfig.library.featureName;
    const existingMapping = (_a = mapping.get(feature)) !== null && _a !== void 0 ? _a : [];
    // avoid adding duplicates
    if (existingMapping.includes(featureName)) {
        return;
    }
    mapping.set(feature, [...existingMapping, featureName]);
}
function populateFeatureModuleMapping(mapping, featureConfig) {
    var _a;
    const feature = featureConfig.library.featureName;
    const existingMapping = (_a = mapping.get(feature)) !== null && _a !== void 0 ? _a : [];
    const featureModules = []
        .concat(featureConfig.featureModule)
        .map((fm) => fm.name);
    // avoid adding duplicates
    if (existingMapping.some((existing) => featureModules.includes(existing))) {
        return;
    }
    mapping.set(feature, [...existingMapping, ...featureModules]);
}
function populateRootModulesMapping(mapping, featureConfig) {
    var _a, _b;
    const feature = featureConfig.library.featureName;
    const existingMapping = (_a = mapping.get(feature)) !== null && _a !== void 0 ? _a : [];
    const rooModules = []
        .concat((_b = featureConfig.rootModule) !== null && _b !== void 0 ? _b : [])
        .map((rm) => rm.name);
    // avoid adding duplicates
    if (existingMapping.some((existing) => rooModules.includes(existing))) {
        return;
    }
    mapping.set(feature, [...existingMapping, ...rooModules]);
}
function populateConfigMapping(mapping, featureConfig) {
    mapping.set(featureConfig.library.featureName, featureConfig);
}
/**
 * Based on the given value,
 * it returns the key of the given object.
 */
function getKeyByMappingValue(mapping, value) {
    try {
        return getKeyByMappingValueOrThrow(mapping, value);
    }
    catch (e) {
        if (e instanceof schematics_1.SchematicsException) {
            return undefined;
        }
    }
    return undefined;
}
exports.getKeyByMappingValue = getKeyByMappingValue;
/**
 * Based on the given value,
 * it returns the key of the given object.
 */
function getKeyByMappingValueOrThrow(mapping, value) {
    var _a;
    for (const key of Array.from(mapping.keys())) {
        if (((_a = mapping.get(key)) !== null && _a !== void 0 ? _a : []).includes(value)) {
            return key;
        }
    }
    throw new schematics_1.SchematicsException(`Value ${value} not found in the given map.`);
}
exports.getKeyByMappingValueOrThrow = getKeyByMappingValueOrThrow;
/**
 * Returns the schematics config
 * for the given feature.
 */
function getSchematicsConfigByFeatureOrThrow(feature) {
    const featureConfig = exports.featureSchematicConfigMapping.get(feature);
    if (!featureConfig) {
        throw new schematics_1.SchematicsException(`Config not found for the given feature '${feature}'`);
    }
    return featureConfig;
}
exports.getSchematicsConfigByFeatureOrThrow = getSchematicsConfigByFeatureOrThrow;
//# sourceMappingURL=schematics-config-mappings.js.map