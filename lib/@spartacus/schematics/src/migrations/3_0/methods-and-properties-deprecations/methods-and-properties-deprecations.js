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
var anonymous_consent_templates_adapter_migration_1 = require("./data/anonymous-consent-templates.adapter.migration");
var anonymous_consent_templates_connector_migration_1 = require("./data/anonymous-consent-templates.connector.migration");
var asm_auth_service_migration_1 = require("./data/asm-auth.service.migration");
var asm_group_actions_migration_1 = require("./data/asm-group.actions.migration");
var asm_group_selectors_migration_1 = require("./data/asm-group.selectors.migration");
var auth_group_actions_migration_1 = require("./data/auth-group.actions.migration");
var auth_guard_migration_1 = require("./data/auth.guard.migration");
var auth_service_migration_1 = require("./data/auth.service.migration");
var base_site_service_migration_1 = require("./data/base-site.service.migration");
var breakpoint_service_migration_1 = require("./data/breakpoint.service.migration");
var cart_not_empty_guard_migration_1 = require("./data/cart-not-empty.guard.migration");
var cdc_auth_service_migration_1 = require("./data/cdc-auth.service.migration");
var checkout_auth_guard_migration_1 = require("./data/checkout-auth.guard.migration");
var checkout_config_service_migration_1 = require("./data/checkout-config.service.migration");
var checkout_group_actions_migration_1 = require("./data/checkout-group.actions.migration");
var checkout_adapter_migration_1 = require("./data/checkout.adapter.migration");
var checkout_connector_migration_1 = require("./data/checkout.connector.migration");
var checkout_service_migration_1 = require("./data/checkout.service.migration");
var cms_components_service_migration_1 = require("./data/cms-components.service.migration");
var currency_service_migration_1 = require("./data/currency.service.migration");
var feature_modules_service_migration_1 = require("./data/feature-modules.service.migration");
var item_counter_component_migration_1 = require("./data/item-counter.component.migration");
var language_service_migration_1 = require("./data/language.service.migration");
var login_form_component_migration_1 = require("./data/login-form.component.migration");
var logout_guard_migration_1 = require("./data/logout.guard.migration");
var multi_cart_state_persistence_service_migration_1 = require("./data/multi-cart-state-persistence.service.migration");
var not_auth_guard_migration_1 = require("./data/not-auth.guard.migration");
var not_checkout_auth_guard_migration_1 = require("./data/not-checkout-auth.guard.migration");
var occ_checkout_adapter_migration_1 = require("./data/occ-checkout.adapter.migration");
var occ_cms_component_adapter_migration_1 = require("./data/occ-cms-component.adapter.migration");
var order_confirmation_overview_component_migration_1 = require("./data/order-confirmation-overview.component.migration");
var order_detail_shipping_component_migration_1 = require("./data/order-detail-shipping.component.migration");
var page_meta_service_migration_1 = require("./data/page-meta.service.migration");
var product_carousel_service_migration_1 = require("./data/product-carousel.service.migration");
var product_list_component_service_migration_1 = require("./data/product-list-component.service.migration");
var product_reference_service_migration_1 = require("./data/product-reference.service.migration");
var protected_routes_guard_migration_1 = require("./data/protected-routes.guard.migration");
var star_rating_component_migration_1 = require("./data/star-rating-component.migration");
var store_finder_group_actions_migration_1 = require("./data/store-finder-group.actions.migration");
var storefront_component_migration_1 = require("./data/storefront-component.migration");
var update_email_component_migration_1 = require("./data/update-email.component.migration");
exports.METHOD_PROPERTY_DATA = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], checkout_connector_migration_1.CHECKOUT_CONNECTOR_MIGRATION, true), checkout_adapter_migration_1.CHECKOUT_ADAPTER_MIGRATION, true), checkout_service_migration_1.CHECKOUT_SERVICE_MIGRATION, true), cms_components_service_migration_1.CMS_COMPONENTS_SERVICE_MIGRATION, true), occ_checkout_adapter_migration_1.OCC_CHECKOUT_ADAPTER_MIGRATION, true), product_list_component_service_migration_1.PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION, true), checkout_group_actions_migration_1.CHECKOUT_GROUP_ACTIONS_MIGRATION, true), checkout_config_service_migration_1.CHECKOUT_CONFIG_SERVICE_MIGRATION, true), checkout_auth_guard_migration_1.CHECKOUT_AUTH_GUARD_MIGRATION, true), protected_routes_guard_migration_1.PROTECTED_ROUTES_GUARD_MIGRATION, true), breakpoint_service_migration_1.BREAKPOINT_SERVICE_MIGRATION, true), login_form_component_migration_1.LOGIN_FORM_COMPONENT_MIGRATION, true), item_counter_component_migration_1.ITEM_COUNTER_COMPONENT_MIGRATION, true), store_finder_group_actions_migration_1.STORE_FINDER_ACTIONS_MIGRATION, true), update_email_component_migration_1.UPDATE_EMAIL_COMPONENT_MIGRATION, true), base_site_service_migration_1.BASE_SITE_SERVICE_MIGRATION, true), cart_not_empty_guard_migration_1.CART_NOT_EMPTY_GUARD_MIGRATION, true), not_checkout_auth_guard_migration_1.NOT_CHECKOUT_AUTH_GUARD_MIGRATION, true), logout_guard_migration_1.LOGOUT_GUARD_MIGRATION, true), order_confirmation_overview_component_migration_1.ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION, true), order_detail_shipping_component_migration_1.ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION, true), product_carousel_service_migration_1.PRODUCT_CAROUSEL_SERVICE_MIGRATION, true), product_reference_service_migration_1.PRODUCT_REFERENCE_SERVICE_MIGRATION, true), storefront_component_migration_1.STOREFRONT_COMPONENT_MIGRATION, true), multi_cart_state_persistence_service_migration_1.MULTI_CART_STATE_PERSISTENCE_SERVICE_MIGRATION, true), auth_group_actions_migration_1.AUTH_ACTIONS_MIGRATION, true), not_auth_guard_migration_1.NOT_AUTH_GUARD_MIGRATION, true), auth_guard_migration_1.AUTH_GUARD_MIGRATION, true), auth_service_migration_1.AUTH_SERVICE_MIGRATION, true), asm_group_selectors_migration_1.ASM_SELECTORS_MIGRATION, true), asm_group_actions_migration_1.ASM_ACTIONS_MIGRATION, true), asm_auth_service_migration_1.ASM_AUTH_SERVICE_MIGRATION, true), cdc_auth_service_migration_1.CDC_AUTH_SERVICE_MIGRATION, true), language_service_migration_1.LANGUAGE_SERVICE_MIGRATION, true), currency_service_migration_1.CURRENCY_SERVICE_MIGRATION, true), star_rating_component_migration_1.STAR_RATING_COMPONENT_MIGRATION, true), feature_modules_service_migration_1.FEATURE_MODULES_SERVICE_MIGRATION, true), anonymous_consent_templates_adapter_migration_1.ANONYMOUS_CONSENT_TEMPLATES_ADAPTER_MIGRATION, true), anonymous_consent_templates_connector_migration_1.ANONYMOUS_CONSENT_TEMPLATES_CONNECTOR_MIGRATION, true), occ_cms_component_adapter_migration_1.OCC_CMS_COMPONENT_ADAPTER_MIGRATION, true), page_meta_service_migration_1.PAGE_META_SERVICE_MIGRATION, true);
function migrate() {
    return function (tree, context) {
        return (0, methods_and_properties_deprecations_1.migrateMethodPropertiesDeprecation)(tree, context, exports.METHOD_PROPERTY_DATA);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=methods-and-properties-deprecations.js.map