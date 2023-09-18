"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = exports.CONSTRUCTOR_DEPRECATIONS_DATA = void 0;
var constructor_deprecations_1 = require("../../mechanism/constructor-deprecations/constructor-deprecations");
var address_book_component_migration_1 = require("./data/address-book.component.migration");
var banner_component_migration_1 = require("./data/banner.component.migration");
var cart_totals_component_migration_1 = require("./data/cart-totals.component.migration");
var cdc_logout_guard_migration_1 = require("./data/cdc-logout.guard.migration");
var component_wrapper_directive_migration_1 = require("./data/component-wrapper.directive.migration");
var configurator_add_to_cart_button_component_migration_1 = require("./data/configurator-add-to-cart-button.component.migration");
var configurator_attribute_drop_down_component_migration_1 = require("./data/configurator-attribute-drop-down.component.migration");
var configurator_attribute_header_component_migration_1 = require("./data/configurator-attribute-header.component.migration");
var configurator_attribute_numeric_input_field_component_migration_1 = require("./data/configurator-attribute-numeric-input-field.component.migration");
var configurator_attribute_product_card_component_migration_1 = require("./data/configurator-attribute-product-card.component.migration");
var configurator_attribute_radio_button_component_migration_1 = require("./data/configurator-attribute-radio-button.component.migration");
var configurator_attribute_single_selection_base_component_migration_1 = require("./data/configurator-attribute-single-selection-base.component.migration");
var configurator_cart_entry_bundle_info_component_migration_1 = require("./data/configurator-cart-entry-bundle-info.component.migration");
var configurator_group_menu_component_migration_1 = require("./data/configurator-group-menu.component.migration");
var configurator_overview_bundle_attribute_component_migration_1 = require("./data/configurator-overview-bundle-attribute.component.migration");
var configurator_tab_bar_component_migration_1 = require("./data/configurator-tab-bar.component.migration");
var form_errors_component_migration_1 = require("./data/form-errors.component.migration");
var generic_link_component_migration_1 = require("./data/generic-link.component.migration");
var inner_components_host_directive_migration_1 = require("./data/inner-components-host.directive.migration");
var login_guard_migration_1 = require("./data/login.guard.migration");
var logout_guard_migration_1 = require("./data/logout.guard.migration");
var navigation_ui_component_migration_1 = require("./data/navigation-ui.component.migration");
var not_auth_guard_migration_1 = require("./data/not-auth.guard.migration");
var page_layout_service_migration_1 = require("./data/page-layout.service.migration");
var paragraph_component_migration_1 = require("./data/paragraph.component.migration");
var quick_order_form_component_migration_1 = require("./data/quick-order-form.component.migration");
var quick_order_service_migration_1 = require("./data/quick-order.service.migration");
var shipping_address_component_migration_1 = require("./data/shipping-address.component.migration");
var tab_paragraph_container_component_migration_1 = require("./data/tab-paragraph-container.component.migration");
var cds_merchandising_product_service_migration_1 = require("./data/cds-merchandising-product.service.migration");
var cds_merchandising_user_context_service_migration_1 = require("./data/cds-merchandising-user-context.service.migration");
var consignment_tracking_component_migration_1 = require("./data/consignment-tracking.component.migration");
var suggested_addresses_dialog_component_migration_1 = require("./data/suggested-addresses-dialog.component-migration");
var address_form_component_migration_1 = require("./data/address-form.component.migration");
var added_to_cart_dialog_event_listener_migration_1 = require("./data/added-to-cart-dialog-event.listener.migration");
var added_to_cart_dialog_component_migration_1 = require("./data/added-to-cart-dialog.component.migration");
var close_account_modal_component_migration_1 = require("./data/close-account-modal.component.migration");
var close_account_component_migration_1 = require("./data/close-account.component.migration");
var coupon_card_component_migration_1 = require("./data/coupon-card.component.migration");
var coupon_dialog_component_migration_1 = require("./data/coupon-dialog.component.migration");
var stock_notification_dialog_component_migration_1 = require("./data/stock-notification-dialog.component.migration");
var stock_notification_component_migration_1 = require("./data/stock-notification.component.migration");
var json_ld_directive_migration_1 = require("./data/json-ld.directive.migration");
var json_ld_script_factory_migration_1 = require("./data/json-ld.script.factory.migration");
var cdc_js_service_migration_1 = require("./data/cdc-js-service.migration");
var register_component_migration_1 = require("./data/register.component.migration");
var tracking_events_component_migration_1 = require("./data/tracking-events.component.migration");
exports.CONSTRUCTOR_DEPRECATIONS_DATA = [
    cart_totals_component_migration_1.CART_TOTALS_COMPONENT_MIGRATION,
    configurator_add_to_cart_button_component_migration_1.CONFIGURATOR_ADD_TO_CART_BUTTON_COMPONENT_MIGRATION,
    not_auth_guard_migration_1.NOT_AUTH_GUARD_MIGRATION,
    logout_guard_migration_1.LOGOUT_GUARD_CONSTRUCTOR_MIGRATION,
    login_guard_migration_1.LOGIN_GUARD_CONSTRUCTOR_MIGRATION,
    cdc_logout_guard_migration_1.CDC_LOGOUT_GUARD_CONSTRUCTOR_MIGRATION,
    configurator_cart_entry_bundle_info_component_migration_1.CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_COMPONENT_MIGRATION,
    configurator_tab_bar_component_migration_1.CONFIGURATOR_TAB_BAR_COMPONENT_MIGRATION,
    quick_order_service_migration_1.QUICK_ORDER_SERVICE_MIGRATION,
    quick_order_form_component_migration_1.QUICK_ORDER_FORM_COMPONENT_MIGRATION,
    address_book_component_migration_1.ADDRESS_BOOK_COMPONENT_MIGRATION,
    shipping_address_component_migration_1.SHIPPING_ADDRESS_COMPONENT_MIGRATION,
    configurator_attribute_product_card_component_migration_1.CONFIGURATOR_ATTRIBUTE_PRODUCT_CARD_COMPONENT_MIGRATION,
    configurator_attribute_header_component_migration_1.CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT_MIGRATION,
    configurator_group_menu_component_migration_1.CONFIGURATOR_GROUP_MENU_COMPONENT_MIGRATION,
    configurator_attribute_numeric_input_field_component_migration_1.CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT_MIGRATION,
    configurator_overview_bundle_attribute_component_migration_1.CONFIGURATOR_OVERVIEW_BUNDLE_ATTRIBUTE_COMPONENT_MIGRATION,
    configurator_attribute_single_selection_base_component_migration_1.CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BASE_COMPONENT_MIGRATION,
    configurator_attribute_drop_down_component_migration_1.CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION,
    configurator_attribute_radio_button_component_migration_1.CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION,
    navigation_ui_component_migration_1.NAVIGATION_UI_COMPONENT_MIGRATION,
    page_layout_service_migration_1.PAGE_LAYOUT_SERVICE_MIGRATION,
    paragraph_component_migration_1.PARAGRAPH_COMPONENT_MIGRATION,
    form_errors_component_migration_1.FORM_ERRORS_COMPONENT_MIGRATION,
    tab_paragraph_container_component_migration_1.TAB_PARAGRAPH_CONTAINER_COMPONENT_MIGRATION,
    component_wrapper_directive_migration_1.COMPONENT_WRAPPER_DIRECTIVE_MIGRATION,
    inner_components_host_directive_migration_1.INNER_COMPONENTS_HOST_DIRECTIVE_MIGRATION,
    generic_link_component_migration_1.GENERIC_LINK_COMPONENT_MIGRATION,
    banner_component_migration_1.BANNER_COMPONENT_MIGRATION,
    cds_merchandising_product_service_migration_1.CDS_MERCHANDISING_PRODUCT_SERVICE_CONSTRUCTOR_MIGRATION,
    cds_merchandising_user_context_service_migration_1.CDS_MERCHANDISING_USER_CONTEXT_SERVICE_CONSTRUCTOR_MIGRATION,
    consignment_tracking_component_migration_1.CONSIGNMENT_TRACKING_COMPONENT_CONSTRUCTOR_MIGRATION,
    tracking_events_component_migration_1.TRACKING_EVENTS_COMPONENT_CONSTRUCTOR_MIGRATION,
    suggested_addresses_dialog_component_migration_1.SUGGESTED_ADDRESS_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION,
    address_form_component_migration_1.ADDRESS_FORM_COMPONENT_CONSTRUCTOR_MIGRATION,
    added_to_cart_dialog_component_migration_1.ADDED_TO_CART_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION,
    added_to_cart_dialog_event_listener_migration_1.ADDED_TO_CART_DIALOG_EVENT_LISTENER_CONSTRUCTOR_MIGRATION,
    close_account_component_migration_1.CLOSE_ACCOUNT_COMPONENT_CONSTRUCTOR_MIGRATION,
    close_account_modal_component_migration_1.CLOSE_ACCOUNT_MODAL_COMPONENT_CONSTRUCTOR_MIGRATION,
    coupon_card_component_migration_1.COUPON_CARD_COMPONENT_CONSTRUCTOR_MIGRATION,
    coupon_dialog_component_migration_1.COUPON_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION,
    stock_notification_dialog_component_migration_1.STOCK_NOTIFICATION_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION,
    stock_notification_component_migration_1.STOCK_NOTIFICATION_COMPONENT_CONSTRUCTOR_MIGRATION,
    json_ld_script_factory_migration_1.JSON_LD_SCRIPT_FACTORY_CONSTRUCTOR_MIGRATION,
    json_ld_directive_migration_1.JSON_LD_DIRECTIVE_CONSTRUCTOR_MIGRATION,
    cdc_js_service_migration_1.CDC_JS_SERVICE_CONSTRUCTOR_MIGRATION,
    register_component_migration_1.REGISTER_COMPONENT_CONSTRUCTOR_MIGRATION,
];
function migrate() {
    return function (tree, context) {
        return (0, constructor_deprecations_1.migrateConstructorDeprecation)(tree, context, exports.CONSTRUCTOR_DEPRECATIONS_DATA);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=constructor-deprecations.js.map