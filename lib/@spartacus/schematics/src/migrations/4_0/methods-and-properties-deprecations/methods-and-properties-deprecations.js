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
exports.migrate = exports.METHOD_PROPERTY_DATA = void 0;
var methods_and_properties_deprecations_1 = require("../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations");
var added_to_cart_dialog_component_migration_1 = require("./data/added-to-cart-dialog-component.migration");
var base_site_service_migration_1 = require("./data/base-site.service.migration");
var cart_details_component_migration_1 = require("./data/cart-details-component.migration");
var cart_item_component_migration_1 = require("./data/cart-item-component.migration");
var cart_item_context_source_migration_1 = require("./data/cart-item-context-source.migration");
var cart_item_context_migration_1 = require("./data/cart-item-context.migration");
var config_initializer_service_migration_1 = require("./data/config-initializer.service.migration");
var configurator_attribute_drop_down_component_migration_1 = require("./data/configurator-attribute-drop-down.component.migration");
var configurator_attribute_numeric_input_field_component_migration_1 = require("./data/configurator-attribute-numeric-input-field.component.migration");
var configurator_attribute_radio_button_component_migration_1 = require("./data/configurator-attribute-radio-button.component.migration");
var configurator_group_menu_component_migration_1 = require("./data/configurator-group-menu.component.migration");
var configurator_product_title_component_migration_1 = require("./data/configurator-product-title.component.migration");
var content_page_meta_resolver_migration_1 = require("./data/content-page-meta.resolver.migration");
var currency_service_migration_1 = require("./data/currency.service.migration");
var dynamic_attribute_service_migration_1 = require("./data/dynamic-attribute.service.migration");
var express_checkout_service_migration_1 = require("./data/express-checkout.service.migration");
var language_service_migration_1 = require("./data/language.service.migration");
var occ_endpoint_model_migration_1 = require("./data/occ-endpoint.model.migration");
var occ_endpoints_service_migration_1 = require("./data/occ-endpoints.service.migration");
var order_detail_items_component_migration_1 = require("./data/order-detail-items.component.migration");
var order_overview_component_migration_1 = require("./data/order-overview.component.migration");
var page_event_builder_ts_migration_1 = require("./data/page-event.builder.ts.migration");
var popover_component_migration_1 = require("./data/popover-component.migration");
var popover_directive_migration_1 = require("./data/popover-directive.migration");
var product_list_component_service_migration_1 = require("./data/product-list-component.service.migration");
var product_service_migration_1 = require("./data/product.service.migration");
var routing_service_migration_1 = require("./data/routing.service.migration");
var saved_cart_details_action_component_migration_1 = require("./data/saved-cart-details-action.component.migration");
var saved_cart_list_component_migration_1 = require("./data/saved-cart-list.component.migration");
var selective_cart_service_migration_1 = require("./data/selective-cart.service.migration");
var unit_form_component_migration_1 = require("./data/unit-form.component.migration");
var user_id_service_migration_1 = require("./data/user-id.service.migration");
exports.METHOD_PROPERTY_DATA = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], language_service_migration_1.LANGUAGE_SERVICE_MIGRATION, true), currency_service_migration_1.CURRENCY_SERVICE_MIGRATION, true), base_site_service_migration_1.BASE_SITE_SERVICE_MIGRATION, true), occ_endpoints_service_migration_1.OCC_ENDPOINTS_SERVICE_MIGRATION, true), content_page_meta_resolver_migration_1.CONTENT_PAGE_META_RESOLVER_MIGRATION, true), content_page_meta_resolver_migration_1.PAGE_META_SERVICE_MIGRATION, true), selective_cart_service_migration_1.SELECTIVE_CART_SERVICE_MIGRATION, true), added_to_cart_dialog_component_migration_1.ADDED_TO_CART_DIALOG_COMPONENT_MIGRATION, true), page_event_builder_ts_migration_1.PAGE_EVENT_MIGRATION, true), cart_item_context_migration_1.CART_ITEM_CONTEXT_MIGRATION, true), cart_item_context_source_migration_1.CART_ITEM_CONTEXT_SOURCE_MIGRATION, true), dynamic_attribute_service_migration_1.DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION, true), configurator_attribute_drop_down_component_migration_1.CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION, true), configurator_attribute_numeric_input_field_component_migration_1.CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT_MIGRATION, true), configurator_attribute_radio_button_component_migration_1.CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION, true), configurator_product_title_component_migration_1.CONFIGURATOR_PRODUCT_TITLE_COMPONENT_MIGRATION, true), cart_details_component_migration_1.CART_DETAILS_COMPONENT_MIGRATION, true), cart_item_component_migration_1.CART_ITEM_COMPONENT_MIGRATION, true), unit_form_component_migration_1.UNIT_FORM_COMPONENT_MIGRATION, true), order_detail_items_component_migration_1.ORDER_DETAIL_ITEMS_COMPONENT_MIGRATION, true), routing_service_migration_1.ROUTING_SERVICE_MIGRATION, true), configurator_group_menu_component_migration_1.CONFIGURATOR_GROUP_MENU_COMPONENT_MIGRATION, true), occ_endpoint_model_migration_1.OCC_ENDPOINTS_MODEL_MIGRATION, true), order_overview_component_migration_1.ORDER_OVERVIEW_COMPONENT_MIGRATION, true), product_list_component_service_migration_1.PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION, true), saved_cart_details_action_component_migration_1.SAVED_CART_DETAILS_ACTION_COMPONENT_MIGRATION, true), saved_cart_list_component_migration_1.SAVED_CART_LIST_COMPONENT_MIGRATION, true), express_checkout_service_migration_1.EXPRESS_CHECKOUT_SERVICE_MIGRATION, true), config_initializer_service_migration_1.CONFIG_INITIALIZER_SERVICE_MIGRATION, true), product_service_migration_1.PRODUCT_SERVICE_MIGRATION, true), user_id_service_migration_1.USER_ID_SERVICE_MIGRATION, true), popover_component_migration_1.POPOVER_COMPONENT_MIGRATION, true), popover_directive_migration_1.POPOVER_DIRECTIVE_MIGRATION, true);
function migrate() {
    return function (tree, context) {
        return (0, methods_and_properties_deprecations_1.migrateMethodPropertiesDeprecation)(tree, context, exports.METHOD_PROPERTY_DATA);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=methods-and-properties-deprecations.js.map