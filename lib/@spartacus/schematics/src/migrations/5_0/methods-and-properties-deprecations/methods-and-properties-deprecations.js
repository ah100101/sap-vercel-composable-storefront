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
exports.__esModule = true;
exports.migrate = exports.METHODS_AND_PROPERTIES_DEPRECATIONS_DATA = void 0;
var methods_and_properties_deprecations_1 = require("../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations");
var auth_http_header_service_migration_1 = require("./data/auth-http-header.service.migration");
var auth_redirect_service_migration_1 = require("./data/auth-redirect.service.migration");
var configurator_attribute_header_component_migration_1 = require("./data/configurator-attribute-header.component.migration");
var configurator_attribute_multi_selection_bundle_component_migration_1 = require("./data/configurator-attribute-multi-selection-bundle.component.migration");
var configurator_attribute_single_selection_bundle_component_migration_1 = require("./data/configurator-attribute-single-selection-bundle.component.migration");
var configurator_commons_service_migration_1 = require("./data/configurator-commons-service.migration");
var configurator_storefront_utils_service_migration_1 = require("./data/configurator-storefront-utils.service.migration");
var navigation_ui_component_migration_1 = require("./data/navigation-ui.component.migration");
var occ_configurator_variant_normalizer_migration_1 = require("./data/occ-configurator-variant-normalizer.migration");
var progress_button_component_migration_1 = require("./data/progress-button.component.migration");
var quick_order_service_migration_1 = require("./data/quick-order.service.migration");
var saved_cart_event_builder_migration_1 = require("./data/saved-cart-event.builder.migration");
var cds_merchandising_product_service_migration_1 = require("./data/cds-merchandising-product.service.migration");
exports.METHODS_AND_PROPERTIES_DEPRECATIONS_DATA = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], auth_redirect_service_migration_1.AUTH_REDIRECT_SERVICE_MIGRATION, true), auth_http_header_service_migration_1.AUTH_HTTP_HEADER_SERVICE_MIGRATION, true), quick_order_service_migration_1.QUICK_ORDER_SERVICE_MIGRATION, true), configurator_attribute_multi_selection_bundle_component_migration_1.CONFIGURATOR_ATTRIBUTE_MULTI_SELECTION_BUNDLE_COMPONENT_MIGRATION, true), configurator_attribute_single_selection_bundle_component_migration_1.CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BUNDLE_COMPONENT_MIGRATION, true), configurator_commons_service_migration_1.CONFIGURATOR_COMMONS_SERVICE_MIGRATION, true), configurator_attribute_header_component_migration_1.CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT_MIGRATION, true), occ_configurator_variant_normalizer_migration_1.OCC_CONFIGURATOR_VARIANT_NORMALIZER_MIGRATION, true), navigation_ui_component_migration_1.NAVIGATION_UI_COMPONENT_MIGRATION, true), progress_button_component_migration_1.PROGRESS_BUTTON_COMPONENT_MIGRATION, true), saved_cart_event_builder_migration_1.SAVED_CART_EVENT_BUILDER_MIGRATION, true), configurator_storefront_utils_service_migration_1.CONFIGURATOR_STOREFRONT_UTILS_SERVICE_MIGRATION, true), cds_merchandising_product_service_migration_1.CDS_MERCHANDISING_PRODUCT_SERVICE_MIGRATION, true);
function migrate() {
    return function (tree, context) {
        return (0, methods_and_properties_deprecations_1.migrateMethodPropertiesDeprecation)(tree, context, exports.METHODS_AND_PROPERTIES_DEPRECATIONS_DATA);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=methods-and-properties-deprecations.js.map