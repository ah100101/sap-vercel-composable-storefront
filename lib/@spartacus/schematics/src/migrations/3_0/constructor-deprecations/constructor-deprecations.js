"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = exports.CONSTRUCTOR_DEPRECATION_DATA = void 0;
var constructor_deprecations_1 = require("../../mechanism/constructor-deprecations/constructor-deprecations");
var active_cart_service_migration_1 = require("./data/active-cart.service.migration");
var auth_redirect_service_migration_1 = require("./data/auth-redirect.service.migration");
var auth_guard_migration_1 = require("./data/auth.guard.migration");
var auth_service_migration_1 = require("./data/auth.service.migration");
var breakpoint_service_migration_1 = require("./data/breakpoint.service.migration");
var cart_not_empty_guard_migration_1 = require("./data/cart-not-empty.guard.migration");
var cart_voucher_service_migration_1 = require("./data/cart-voucher.service.migration");
var cdc_auth_service_migration_1 = require("./data/cdc-auth.service.migration");
var checkout_auth_guard_migration_1 = require("./data/checkout-auth.guard.migration");
var checkout_config_service_migration_1 = require("./data/checkout-config.service.migration");
var checkout_delivery_service_migration_1 = require("./data/checkout-delivery.service.migration");
var checkout_payment_service_migration_1 = require("./data/checkout-payment.service.migration");
var checkout_progress_mobile_bottom_component_migration_1 = require("./data/checkout-progress-mobile-bottom.component.migration");
var checkout_progress_mobile_top_component_migration_1 = require("./data/checkout-progress-mobile-top.component.migration");
var checkout_progress_component_migration_1 = require("./data/checkout-progress.component.migration");
var checkout_guard_migration_1 = require("./data/checkout.guard.migration");
var checkout_service_migration_1 = require("./data/checkout.service.migration");
var content_page_meta_resolver_migration_1 = require("./data/content-page-meta.resolver.migration");
var customer_coupon_service_migration_1 = require("./data/customer-coupon.service.migration");
var delivery_mode_set_guard_migration_1 = require("./data/delivery-mode-set.guard.migration");
var delivery_mode_component_migration_1 = require("./data/delivery-mode.component.migration");
var feature_modules_service_migration_1 = require("./data/feature-modules.service.migration");
var forbidden_handler_migration_1 = require("./data/forbidden.handler.migration");
var forgot_password_component_migration_1 = require("./data/forgot-password.component.migration");
var json_ld_script_factory_migration_1 = require("./data/json-ld.script.factory.migration");
var jsonld_product_review_builder_migration_1 = require("./data/jsonld-product-review.builder.migration");
var login_form_component_migration_1 = require("./data/login-form.component.migration");
var logout_guard_migration_1 = require("./data/logout-guard.migration");
var multi_cart_service_migration_1 = require("./data/multi-cart.service.migration");
var not_auth_guard_migration_1 = require("./data/not-auth.guard.migration");
var not_checkout_auth_guard_migration_1 = require("./data/not-checkout-auth.guard.migration");
var order_cancellation_guard_migration_1 = require("./data/order-cancellation.guard.migration");
var order_confirmation_overview_component_migration_1 = require("./data/order-confirmation-overview.component.migration");
var order_detail_shipping_component_migration_1 = require("./data/order-detail-shipping.component.migration");
var order_history_component_migration_1 = require("./data/order-history-component.migration");
var order_return_request_service_migration_1 = require("./data/order-return-request.service.migration");
var order_return_guard_migration_1 = require("./data/order-return.guard.migration");
var outlet_ref_directive_migration_1 = require("./data/outlet-ref.directive.migration");
var outlet_service_migration_1 = require("./data/outlet.service.migration");
var page_slot_component_migration_1 = require("./data/page-slot.component.migration");
var payment_details_set_guard_migration_1 = require("./data/payment-details-set.guard.migration");
var payment_method_component_migration_1 = require("./data/payment-method.component.migration");
var place_order_component_migration_1 = require("./data/place-order.component.migration");
var product_carousel_service_migration_1 = require("./data/product-carousel.service.migration");
var product_variant_guard_migration_1 = require("./data/product-variant.guard.migration");
var register_component_migration_1 = require("./data/register.component.migration");
var review_submit_component_migration_1 = require("./data/review-submit.component.migration");
var routing_service_migration_1 = require("./data/routing.service.migration");
var selective_cart_service_migration_1 = require("./data/selective-cart.service.migration");
var shipping_address_set_guard_migration_1 = require("./data/shipping-address-set.guard.migration");
var shipping_address_component_migration_1 = require("./data/shipping-address.component.migration");
var split_view_component_migration_1 = require("./data/split-view.component.migration");
var star_rating_component_migration_1 = require("./data/star-rating.component.migration");
var stock_notification_component_migration_1 = require("./data/stock-notification.component.migration");
var user_address_service_migration_1 = require("./data/user-address.service.migration");
var user_consent_service_migration_1 = require("./data/user-consent.service.migration");
var user_interests_service_migration_1 = require("./data/user-interests.service.migration");
var user_notification_preference_service_migration_1 = require("./data/user-notification-preference.service.migration");
var user_order_effect_migration_1 = require("./data/user-order.effect.migration");
var user_order_service_migration_1 = require("./data/user-order.service.migration");
var user_payment_service_migration_1 = require("./data/user-payment.service.migration");
var user_register_effect_migration_1 = require("./data/user-register.effect.migration");
var user_service_migration_1 = require("./data/user.service.migration");
var view_component_migration_1 = require("./data/view.component.migration");
var wish_list_service_migration_1 = require("./data/wish-list.service.migration");
exports.CONSTRUCTOR_DEPRECATION_DATA = [
    checkout_progress_mobile_bottom_component_migration_1.CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT_MIGRATION,
    checkout_progress_mobile_top_component_migration_1.CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION,
    checkout_progress_component_migration_1.CHECKOUT_PROGRESS_COMPONENT_MIGRATION,
    delivery_mode_component_migration_1.DELIVERY_MODE_COMPONENT_MIGRATION,
    stock_notification_component_migration_1.STOCK_NOTIFICATION_COMPONENT_MIGRATION,
    payment_method_component_migration_1.PAYMENT_METHOD_COMPONENT_MIGRATION,
    review_submit_component_migration_1.REVIEW_SUBMIT_COMPONENT_MIGRATION,
    place_order_component_migration_1.PLACE_ORDER_COMPONENT_MIGRATION,
    shipping_address_component_migration_1.SHIPPING_ADDRESS_COMPONENT_MIGRATION,
    shipping_address_set_guard_migration_1.SHIPPING_ADDRESS_SET_GUARD_MIGRATION,
    delivery_mode_set_guard_migration_1.DELIVERY_MODE_SET_GUARD_MIGRATION,
    payment_details_set_guard_migration_1.PAYMENT_DETAILS_SET_GUARD_MIGRATION,
    checkout_config_service_migration_1.CHECKOUT_CONFIG_SERVICE_MIGRATION,
    login_form_component_migration_1.LOGIN_FORM_COMPONENT_MIGRATION,
    checkout_guard_migration_1.CHECKOUT_GUARD_MIGRATION,
    checkout_auth_guard_migration_1.CHECKOUT_AUTH_GUARD_MIGRATION,
    routing_service_migration_1.ROUTING_SERVICE_MIGRATION,
    feature_modules_service_migration_1.FEATURE_MODULES_SERVICE_MIGRATION,
    not_auth_guard_migration_1.NOT_AUTH_GUARD_CONSTRUCTOR_MIGRATION,
    auth_guard_migration_1.AUTH_GUARD_CONSTRUCTOR_MIGRATION,
    auth_redirect_service_migration_1.AUTH_REDIRECT_SERVICE_CONSTRUCTOR_MIGRATION,
    auth_service_migration_1.AUTH_SERVICE_CONSTRUCTOR_MIGRATION,
    cdc_auth_service_migration_1.CDC_AUTH_SERVICE_CONSTRUCTOR_MIGRATION,
    order_confirmation_overview_component_migration_1.ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION,
    order_detail_shipping_component_migration_1.ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION,
    order_history_component_migration_1.ORDER_HISTORY_COMPONENT_MIGRATION,
    user_order_service_migration_1.USER_ORDER_SERVICE_MIGRATION,
    user_order_effect_migration_1.USER_ORDERS_EFFECT_MIGRATION,
    active_cart_service_migration_1.ACTIVE_CART_SERVICE_MIGRATION,
    cart_voucher_service_migration_1.CART_VOUCHER_SERVICE_MIGRATION,
    selective_cart_service_migration_1.SELECTIVE_CART_SERVICE_MIGRATION,
    wish_list_service_migration_1.WISH_LIST_SERVICE_MIGRATION,
    checkout_delivery_service_migration_1.CHECKOUT_DELIVERY_SERVICE_MIGRATION,
    multi_cart_service_migration_1.MULTI_CART_SERVICE_MIGRATION,
    content_page_meta_resolver_migration_1.CONTENT_PAGE_META_RESOLVER_MIGRATION,
    cart_not_empty_guard_migration_1.CART_NOT_EMPTY_GUARD_MIGRATION,
    not_checkout_auth_guard_migration_1.NOT_CHECKOUT_AUTH_GUARD_MIGRATION,
    order_cancellation_guard_migration_1.ORDER_CANCELLATION_GUARD_MIGRATION,
    order_return_guard_migration_1.ORDER_RETURN_GUARD_MIGRATION,
    product_variant_guard_migration_1.PRODUCT_VARIANT_GUARD_MIGRATION,
    page_slot_component_migration_1.PAGE_SLOT_COMPONENT_MIGRATION,
    logout_guard_migration_1.LOGOUT_GUARD_MIGRATION,
    user_notification_preference_service_migration_1.USER_NOTIFICATION_PREFERENCE_SERVICE_MIGRATION,
    user_interests_service_migration_1.USER_INTERESTS_SERVICE_MIGRATION,
    user_consent_service_migration_1.USER_CONSENT_SERVICE_MIGRATION,
    user_address_service_migration_1.USER_ADDRESS_SERVICE_MIGRATION,
    order_return_request_service_migration_1.ORDER_RETURN_REQUEST_SERVICE_MIGRATION,
    customer_coupon_service_migration_1.CUSTOMER_COUPON_SERVICE_MIGRATION,
    forbidden_handler_migration_1.FORBIDDEN_HANDLER_MIGRATION,
    checkout_payment_service_migration_1.CHECKOUT_PAYMENT_SERVICE_MIGRATION,
    checkout_service_migration_1.CHECKOUT_SERVICE_MIGRATION,
    jsonld_product_review_builder_migration_1.JSONLD_PRODUCT_REVIEW_BUILDER_MIGRATION,
    forgot_password_component_migration_1.FORGOT_PASSWORD_COMPONENT_MIGRATION,
    user_payment_service_migration_1.USER_PAYMENT_SERVICE_MIGRATION,
    user_register_effect_migration_1.USER_REGISTER_EFFECT_MIGRATION,
    user_service_migration_1.USER_SERVICE_MIGRATION,
    star_rating_component_migration_1.STAR_RATING_COMPONENT_MIGRATION,
    outlet_ref_directive_migration_1.OUTLET_REF_DIRECTIVE_CONSTRUCTOR_MIGRATION,
    outlet_service_migration_1.OUTLET_SERVICE_CONSTRUCTOR_MIGRATION,
    json_ld_script_factory_migration_1.JSON_LD_SCRIPT_FACTORY_CONSTRUCTOR_MIGRATION,
    register_component_migration_1.REGISTER_COMPONENT_MIGRATION,
    product_carousel_service_migration_1.PRODUCT_CAROUSEL_SERVICE_MIGRATION,
    view_component_migration_1.VIEW_COMPONENT_MIGRATION,
    split_view_component_migration_1.SPLIT_VIEW_COMPONENT_MIGRATION,
    breakpoint_service_migration_1.BREAKPOINT_SERVICE_MIGRATION,
];
function migrate() {
    return function (tree, context) {
        return (0, constructor_deprecations_1.migrateConstructorDeprecation)(tree, context, exports.CONSTRUCTOR_DEPRECATION_DATA);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=constructor-deprecations.js.map