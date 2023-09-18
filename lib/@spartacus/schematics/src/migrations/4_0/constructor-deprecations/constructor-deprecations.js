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
exports.migrate = exports.CONSTRUCTOR_DEPRECATION_DATA = void 0;
var constructor_deprecations_1 = require("../../mechanism/constructor-deprecations/constructor-deprecations");
var abstract_store_item_component_migration_1 = require("./data/abstract-store-item.component.migration");
var add_to_saved_cart_component_migration_1 = require("./data/add-to-saved-cart.component.migration");
var added_to_cart_dialog_component_migration_1 = require("./data/added-to-cart-dialog.component.migration");
var address_book_component_migration_1 = require("./data/address-book.component.migration");
var address_book_component_service_migration_1 = require("./data/address-book.component.service.migration");
var address_form_component_migration_1 = require("./data/address-form.component.migration");
var anonymous_consent_management_banner_component_migration_1 = require("./data/anonymous-consent-management-banner.component.migration");
var anonymous_consent_open_dialog_component_migration_1 = require("./data/anonymous-consent-open-dialog.component.migration");
var asm_auth_http_header_service_migration_1 = require("./data/asm-auth-http-header.service.migration");
var auth_http_header_service_migration_1 = require("./data/auth-http-header.service.migration");
var auth_redirect_service_migration_1 = require("./data/auth-redirect.service.migration");
var base_page_meta_resolver_migration_1 = require("./data/base-page-meta.resolver.migration");
var cart_details_component_migration_1 = require("./data/cart-details.component.migration");
var cart_item_list_component_migration_1 = require("./data/cart-item-list.component.migration");
var cart_item_component_migration_1 = require("./data/cart-item.component.migration");
var cart_list_item_component_migration_1 = require("./data/cart-list-item.component.migration");
var cart_page_event_builder_migration_1 = require("./data/cart-page-event.builder.migration");
var category_page_meta_resolver_migration_1 = require("./data/category-page-meta.resolver.migration");
var cdc_logout_guard_migration_1 = require("./data/cdc-logout.guard.migration");
var checkout_auth_guard_1 = require("./data/checkout-auth.guard");
var checkout_event_module_migration_1 = require("./data/checkout-event.module.migration");
var checkout_page_meta_resolver_migration_1 = require("./data/checkout-page-meta.resolver.migration");
var cms_components_service_migration_1 = require("./data/cms-components.service.migration");
var component_wrapper_directive_migration_1 = require("./data/component-wrapper.directive.migration");
var configuration_service_migration_1 = require("./data/configuration.service.migration");
var configurator_attribute_checkbox_list_component_migration_1 = require("./data/configurator-attribute-checkbox-list.component.migration");
var configurator_attribute_drop_down_component_migration_1 = require("./data/configurator-attribute-drop-down.component.migration");
var configurator_attribute_input_field_component_migration_1 = require("./data/configurator-attribute-input-field.component.migration");
var configurator_attribute_numeric_input_field_component_migration_1 = require("./data/configurator-attribute-numeric-input-field.component.migration");
var configurator_attribute_radio_button_component_migration_1 = require("./data/configurator-attribute-radio-button.component.migration");
var configurator_cart_entry_info_component_migration_1 = require("./data/configurator-cart-entry-info.component.migration");
var configurator_cart_service_migration_1 = require("./data/configurator-cart.service.migration");
var configurator_form_component_migration_1 = require("./data/configurator-form.component.migration");
var configurator_group_menu_component_migration_1 = require("./data/configurator-group-menu.component.migration");
var configurator_issues_notification_component_migration_1 = require("./data/configurator-issues-notification.component.migration");
var configurator_overview_attribute_component_migration_1 = require("./data/configurator-overview-attribute.component.migration");
var configurator_storefront_utils_service_migration_1 = require("./data/configurator-storefront-utils.service.migration");
var configurator_update_message_component_migration_1 = require("./data/configurator-update-message.component.migration");
var content_page_meta_resolver_migration_1 = require("./data/content-page-meta.resolver.migration");
var currency_service_migration_1 = require("./data/currency.service.migration");
var delete_item_component_migration_1 = require("./data/delete-item.component.migration");
var dynamic_attribute_service_migration_1 = require("./data/dynamic-attribute.service.migration");
var event_service_migration_1 = require("./data/event.service.migration");
var express_checkout_service_migration_1 = require("./data/express-checkout.service.migration");
var google_map_renderer_service_migration_1 = require("./data/google-map-renderer.service.migration");
var guest_register_form_component_migration_1 = require("./data/guest-register-form.component.migration");
var home_page_event_builder_migration_1 = require("./data/home-page-event.builder.migration");
var language_service_migration_1 = require("./data/language.service.migration");
var login_register_component_migration_1 = require("./data/login-register.component.migration");
var logout_guard_migration_1 = require("./data/logout.guard.migration");
var media_service_migration_1 = require("./data/media.service.migration");
var modal_service_migration_1 = require("./data/modal.service.migration");
var navigation_ui_component_migration_1 = require("./data/navigation-ui.component.migration");
var on_navigate_focus_service_migration_1 = require("./data/on-navigate-focus.service.migration");
var order_detail_items_component_migration_1 = require("./data/order-detail-items.component.migration");
var organization_page_meta_resolver_migration_1 = require("./data/organization-page-meta.resolver.migration");
var page_meta_service_migration_1 = require("./data/page-meta.service.migration");
var popover_directive_migration_1 = require("./data/popover.directive.migration");
var product_grid_item_component_migration_1 = require("./data/product-grid-item.component.migration");
var product_list_component_service_migration_1 = require("./data/product-list-component.service.migration");
var product_list_item_component_migration_1 = require("./data/product-list-item.component.migration");
var product_loading_service_migration_1 = require("./data/product-loading.service.migration");
var product_page_event_builder_migration_1 = require("./data/product-page-event.builder.migration");
var product_page_meta_resolver_migration_1 = require("./data/product-page-meta.resolver.migration");
var protected_routes_service_migration_1 = require("./data/protected-routes.service.migration");
var qualtrics_loader_service_migration_1 = require("./data/qualtrics-loader.service.migration");
var replenishment_order_cancellation_component_migration_1 = require("./data/replenishment-order-cancellation.component.migration");
var replenishment_order_history_component_migration_1 = require("./data/replenishment-order-history.component.migration");
var routing_service_migration_1 = require("./data/routing.service.migration");
var saved_cart_details_action_component_migration_1 = require("./data/saved-cart-details-action.component.migration");
var saved_cart_details_overview_component_migration_1 = require("./data/saved-cart-details-overview.component.migration");
var saved_cart_form_dialog_component_migration_1 = require("./data/saved-cart-form-dialog.component.migration");
var saved_cart_list_component_migration_1 = require("./data/saved-cart-list.component.migration");
var schedule_component_migration_1 = require("./data/schedule.component.migration");
var search_box_component_service_migration_1 = require("./data/search-box-component.service.migration");
var search_box_component_migration_1 = require("./data/search-box.component.migration");
var search_page_meta_resolver_migration_1 = require("./data/search-page-meta.resolver.migration");
var store_finder_list_item_component_migration_1 = require("./data/store-finder-list-item.component.migration");
var store_finder_list_component_migration_1 = require("./data/store-finder-list.component.migration");
var store_finder_store_description_component_migration_1 = require("./data/store-finder-store-description.component.migration");
var store_finder_service_migration_1 = require("./data/store-finder.service.migration");
var tab_paragraph_container_component_migration_1 = require("./data/tab-paragraph-container.component.migration");
var toggle_status_component_migration_1 = require("./data/toggle-status.component.migration");
var unit_address_form_service_migration_1 = require("./data/unit-address-form.service.migration");
var unit_children_component_migration_1 = require("./data/unit-children.component.migration");
var unit_cost_centers_component_migration_1 = require("./data/unit-cost-centers.component.migration");
var unit_user_list_component_migration_1 = require("./data/unit-user-list.component.migration");
var update_email_component_service_migration_1 = require("./data/update-email-component.service.migration");
var user_address_service_migration_1 = require("./data/user-address-service.migration");
var user_group_user_list_component_migration_1 = require("./data/user-group-user-list.component.migration");
var window_ref_migration_1 = require("./data/window-ref.migration");
exports.CONSTRUCTOR_DEPRECATION_DATA = __spreadArray(__spreadArray([
    configuration_service_migration_1.CONFIGURATION_SERVICE_MIGRATION,
    media_service_migration_1.MEDIA_SERVICE_MIGRATION,
    unit_children_component_migration_1.UNIT_CHILDREN_COMPONENT_MIGRATION,
    unit_cost_centers_component_migration_1.UNIT_COST_CENTERS_COMPONENT_MIGRATION,
    unit_user_list_component_migration_1.UNIT_USER_LIST_COMPONENT_MIGRATION,
    cart_page_event_builder_migration_1.CART_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION_V1,
    cart_page_event_builder_migration_1.CART_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION_V2,
    home_page_event_builder_migration_1.HOME_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION,
    event_service_migration_1.EVENT_SERVICE_CONSTRUCTOR_DEPRECATION,
    product_page_event_builder_migration_1.PRODUCT_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION,
    search_box_component_service_migration_1.SEARCH_BOX_COMPONENT_SERVICE_MIGRATION,
    currency_service_migration_1.CURRENCY_SERVICE_MIGRATION,
    language_service_migration_1.LANGUAGE_SERVICE_MIGRATION,
    page_meta_service_migration_1.PAGE_META_SERVICE_MIGRATION,
    base_page_meta_resolver_migration_1.BASE_PAGE_META_RESOLVER_MIGRATION,
    content_page_meta_resolver_migration_1.CONTENT_PAGE_META_RESOLVER_MIGRATION_V1,
    content_page_meta_resolver_migration_1.CONTENT_PAGE_META_RESOLVER_MIGRATION_V2,
    product_page_meta_resolver_migration_1.PRODUCT_PAGE_META_RESOLVER_MIGRATION_V1,
    product_page_meta_resolver_migration_1.PRODUCT_PAGE_META_RESOLVER_MIGRATION_V2,
    search_page_meta_resolver_migration_1.SEARCH_PAGE_META_RESOLVER_MIGRATION,
    checkout_page_meta_resolver_migration_1.CHECKOUT_PAGE_META_RESOLVER_MIGRATION,
    category_page_meta_resolver_migration_1.CATEGORY_PAGE_META_RESOLVER_MIGRATION,
    organization_page_meta_resolver_migration_1.ORGANIZATION_PAGE_META_RESOLVER_MIGRATION,
    routing_service_migration_1.ROUTING_SERVICE_MIGRATION_V1,
    routing_service_migration_1.ROUTING_SERVICE_MIGRATION_V2,
    component_wrapper_directive_migration_1.COMPONENT_WRAPPER_CONSTRUCTOR_MIGRATION,
    store_finder_service_migration_1.STORE_FINDER_SERVICE_MIGRATION,
    abstract_store_item_component_migration_1.ABSTRACT_STORE_ITEM_COMPONENT_MIGRATION,
    schedule_component_migration_1.SCHEDULE_COMPONENT_MIGRATION,
    store_finder_list_item_component_migration_1.STORE_FINDER_LIST_ITEM_COMPONENT_MIGRATION,
    store_finder_list_component_migration_1.STORE_FINDER_LIST_COMPONENT_MIGRATION,
    store_finder_store_description_component_migration_1.STORE_FINDER_STORE_DESCRIPTION_COMPONENT_MIGRATION,
    google_map_renderer_service_migration_1.GOOGLE_MAP_RENDERER_SERVICE_MIGRATION_V1,
    google_map_renderer_service_migration_1.GOOGLE_MAP_RENDERER_SERVICE_MIGRATION_V2,
    configurator_cart_service_migration_1.CONFIGURATOR_CART_SERVICE_MIGRATION,
    address_book_component_service_migration_1.ADDRESS_BOOK_COMPONENT_SERVICE_MIGRATION,
    address_book_component_migration_1.ADDRESS_BOOK_COMPONENT_MIGRATION,
    address_form_component_migration_1.ADDRESS_FORM_COMPONENT_MIGRATION_V1,
    address_form_component_migration_1.ADDRESS_FORM_COMPONENT_MIGRATION_V2,
    user_address_service_migration_1.USER_ADDRESS_SERVICE_MIGRATION,
    checkout_event_module_migration_1.CHECKOUT_EVENT_MODULE_MIGRATION,
    saved_cart_list_component_migration_1.SAVED_CART_LIST_COMPONENT_MIGRATION_V1,
    saved_cart_list_component_migration_1.SAVED_CART_LIST_COMPONENT_MIGRATION_V2,
    saved_cart_form_dialog_component_migration_1.SAVED_CART_FORM_DIALOG_COMPONENT_MIGRATION,
    qualtrics_loader_service_migration_1.QUALTRICS_LOADER_SERVICE_MIGRATION,
    login_register_component_migration_1.LOGIN_REGISTER_COMPONENT_MIGRATION,
    add_to_saved_cart_component_migration_1.ADD_TO_SAVED_CART_COMPONENT_MIGRATION_V1,
    add_to_saved_cart_component_migration_1.ADD_TO_SAVED_CART_COMPONENT_MIGRATION_V2,
    anonymous_consent_management_banner_component_migration_1.ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT_MIGRATION_V1,
    anonymous_consent_management_banner_component_migration_1.ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT_MIGRATION_V2,
    anonymous_consent_open_dialog_component_migration_1.ANONYMOUS_CONSENT_OPEN_DIALOG_COMPONENT_MIGRATION_V1,
    anonymous_consent_open_dialog_component_migration_1.ANONYMOUS_CONSENT_OPEN_DIALOG_COMPONENT_MIGRATION_V2,
    replenishment_order_cancellation_component_migration_1.REPLENISHMENT_ORDER_CANCELLATION_COMPONENT_MIGRATION_V1,
    replenishment_order_cancellation_component_migration_1.REPLENISHMENT_ORDER_CANCELLATION_COMPONENT_MIGRATION_V2,
    replenishment_order_history_component_migration_1.REPLENISHMENT_ORDER_HISTORY_COMPONENT_MIGRATION_V1,
    replenishment_order_history_component_migration_1.REPLENISHMENT_ORDER_HISTORY_COMPONENT_MIGRATION_V2,
    saved_cart_details_action_component_migration_1.SAVED_CART_DETAILS_ACTION_COMPONENT_MIGRATION_V1,
    saved_cart_details_action_component_migration_1.SAVED_CART_DETAILS_ACTION_COMPONENT_MIGRATION_V2,
    saved_cart_details_action_component_migration_1.SAVED_CART_DETAILS_ACTION_COMPONENT_MIGRATION_V3,
    saved_cart_details_overview_component_migration_1.SAVED_CART_DETAILS_OVERVIEW_COMPONENT_MIGRATION_V1,
    saved_cart_details_overview_component_migration_1.SAVED_CART_DETAILS_OVERVIEW_COMPONENT_MIGRATION_V2,
    dynamic_attribute_service_migration_1.DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION,
    window_ref_migration_1.WINDOW_REF_MIGRATION,
    configurator_attribute_checkbox_list_component_migration_1.CONFIGURATOR_ATTRIBUTE_CHECKBOX_LIST_COMPONENT_MIGRATION,
    configurator_attribute_drop_down_component_migration_1.CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION,
    configurator_attribute_numeric_input_field_component_migration_1.CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT_MIGRATION,
    configurator_attribute_input_field_component_migration_1.CONFIGURATOR_ATTRIBUTE_INPUT_FIELD_COMPONENT_MIGRATION,
    configurator_attribute_radio_button_component_migration_1.CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION,
    configurator_group_menu_component_migration_1.CONFIGURATOR_GROUP_MENU_COMPONENT_MIGRATION,
    configurator_storefront_utils_service_migration_1.CONFIGURATOR_STOREFRONT_UTILS_SERVICE_MIGRATION,
    navigation_ui_component_migration_1.NAVIGATION_UI_COMPONENT_MIGRATION,
    configurator_form_component_migration_1.CONFIGURATOR_FORM_COMPONENT_MIGRATION,
    configurator_update_message_component_migration_1.CONFIGURATOR_UPDATE_MESSAGE_COMPONENT_MIGRATION,
    cart_list_item_component_migration_1.CART_LIST_ITEM_COMPONENT_MIGRATION_V1,
    cart_list_item_component_migration_1.CART_LIST_ITEM_COMPONENT_MIGRATION_V2,
    cart_list_item_component_migration_1.CART_LIST_ITEM_COMPONENT_MIGRATION_V3,
    search_box_component_migration_1.SEARCH_BOX_COMPONENT_MIGRATION,
    user_group_user_list_component_migration_1.USER_GROUP_USER_LIST_COMPONENT_MIGRATION,
    toggle_status_component_migration_1.TOGGLE_STATUS_COMPONENT_MIGRATION_V1,
    toggle_status_component_migration_1.TOGGLE_STATUS_COMPONENT_MIGRATION_V2,
    delete_item_component_migration_1.DELETE_ITEM_COMPONENT_MIGRATION,
    cms_components_service_migration_1.CMS_COMPONENTS_SERVICE_MIGRATION_1,
    cms_components_service_migration_1.CMS_COMPONENTS_SERVICE_MIGRATION_2,
    cms_components_service_migration_1.CMS_COMPONENTS_SERVICE_MIGRATION_3,
    asm_auth_http_header_service_migration_1.ASM_AUTH_HTTP_HEADER_SERVICE_MIGRATION,
    auth_http_header_service_migration_1.AUTH_HTTP_HEADER_SERVICE_MIGRATION,
    auth_redirect_service_migration_1.AUTH_REDIRECT_SERVICE_MIGRATION,
    protected_routes_service_migration_1.PROTECTED_ROUTES_SERVICE_MIGRATION,
    product_list_item_component_migration_1.PRODUCT_LIST_ITEM_COMPONENT_MIGRATION,
    product_list_component_service_migration_1.PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION,
    product_grid_item_component_migration_1.PRODUCT_GRID_ITEM_COMPONENT_MIGRATION,
    cart_item_component_migration_1.CART_ITEM_COMPONENT_MIGRATION
], cart_item_list_component_migration_1.CART_ITEM_LIST_COMPONENT_MIGRATIONS, true), [
    configurator_cart_entry_info_component_migration_1.CONFIGURATOR_CART_ENTRY_INFO_COMPONENT_MIGRATION,
    configurator_issues_notification_component_migration_1.CONFIGURATOR_ISSUES_NOTIFICATION_COMPONENT_MIGRATION,
    configurator_overview_attribute_component_migration_1.CONFIGURATOR_OVERVIEW_ATTRIBUTE_COMPONENT_MIGRATION,
    logout_guard_migration_1.LOGOUT_GUARD_CONSTRUCTOR_MIGRATION,
    cdc_logout_guard_migration_1.CDC_LOGOUT_GUARD_CONSTRUCTOR_MIGRATION,
    update_email_component_service_migration_1.UPDATE_EMAIL_COMPONENT_SERVICE_MIGRATION,
    added_to_cart_dialog_component_migration_1.ADDED_TO_CART_DIALOG_COMPONENT_MIGRATION,
    cart_details_component_migration_1.CART_DETAILS_COMPONENT_MIGRATION,
    order_detail_items_component_migration_1.ORDER_DETAIL_ITEMS_COMPONENT_MIGRATION,
    express_checkout_service_migration_1.EXPRESS_CHECKOUT_SERVICE_MIGRATION,
    modal_service_migration_1.MODAL_SERVICE_MIGRATION_V1,
    modal_service_migration_1.MODAL_SERVICE_MIGRATION_V2,
    tab_paragraph_container_component_migration_1.TAB_PARAGRAPH_CONTAINER_COMPONENT_CONSTRUCTOR_DEPRECATION,
    tab_paragraph_container_component_migration_1.TAB_PARAGRAPH_CONTAINER_COMPONENT_CONSTRUCTOR_DEPRECATION_2,
    checkout_auth_guard_1.CHECKOUT_AUTH_GUARD_MIGRATION,
    unit_address_form_service_migration_1.UNIT_ADDRESS_FORM_SERVICE_MIGRATION,
    guest_register_form_component_migration_1.GUEST_REGISTER_FORM_COMPONENT_MIGRATION,
    product_loading_service_migration_1.PRODUCT_LOADING_SERVICE_MIGRATION,
    popover_directive_migration_1.POPOVER_DIRECTIVE_CONSTRUCTOR_MIGRATION,
    on_navigate_focus_service_migration_1.ON_NAVIGATE_FOCUS_SERVICE_MIGRATION,
], false);
function migrate() {
    return function (tree, context) {
        return (0, constructor_deprecations_1.migrateConstructorDeprecation)(tree, context, exports.CONSTRUCTOR_DEPRECATION_DATA);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=constructor-deprecations.js.map