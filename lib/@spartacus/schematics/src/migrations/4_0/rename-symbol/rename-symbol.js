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
exports.migrate = exports.CHECKOUT_LIB_MOVED_SYMBOLS_DATA = exports.RENAMED_SYMBOLS_DATA = void 0;
var constants_1 = require("../../../shared/constants");
var asm_schematics_config_1 = require("../../../shared/lib-configs/asm-schematics-config");
var qualtrics_schematics_config_1 = require("../../../shared/lib-configs/qualtrics-schematics-config");
var libs_constants_1 = require("../../../shared/libs-constants");
var rename_symbol_1 = require("../../mechanism/rename-symbol/rename-symbol");
exports.RENAMED_SYMBOLS_DATA = [
    // feature-libs/organization/administration/root/config/default-budget-routing.config.ts
    {
        previousNode: constants_1.BUDGET_ROUTING_CONFIG,
        previousImportPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
        newNode: constants_1.DEFAULT_BUDGET_ROUTING_CONFIG,
        newImportPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT
    },
    // feature-libs/organization/administration/root/config/default-cost-center-routing.config.ts
    {
        previousNode: constants_1.COST_CENTER_ROUTING_CONFIG,
        previousImportPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
        newNode: constants_1.DEFAULT_COST_CENTER_ROUTING_CONFIG,
        newImportPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT
    },
    // feature-libs/organization/administration/root/config/default-permission-routing.config.ts
    {
        previousNode: constants_1.PERMISSION_ROUTING_CONFIG,
        previousImportPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
        newNode: constants_1.DEFAULT_PERMISSION_ROUTING_CONFIG,
        newImportPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT
    },
    // feature-libs/organization/administration/root/config/default-units-routing.config.ts
    {
        previousNode: constants_1.UNITS_ROUTING_CONFIG,
        previousImportPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
        newNode: constants_1.DEFAULT_UNITS_ROUTING_CONFIG,
        newImportPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT
    },
    // feature-libs/organization/administration/root/config/default-user-group-routing.config.ts
    {
        previousNode: constants_1.USER_GROUP_ROUTING_CONFIG,
        previousImportPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
        newNode: constants_1.DEFAULT_USER_GROUP_ROUTING_CONFIG,
        newImportPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT
    },
    // feature-libs/organization/administration/root/config/default-user-routing.config.ts
    {
        previousNode: constants_1.USER_ROUTING_CONFIG,
        previousImportPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
        newNode: constants_1.DEFAULT_USER_ROUTING_CONFIG,
        newImportPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT
    },
    // projects/storefrontlib/cms-components/product/config/default-view-config.ts
    {
        previousNode: 'defaultScrollConfig',
        previousImportPath: '@spartacus/storefront',
        newNode: 'defaultViewConfig'
    },
    // projects/storefrontlib/cms-components/misc/qualtrics/qualtrics-loader.service.ts
    {
        previousNode: constants_1.QUALTRICS_LOADER_SERVICE,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_QUALTRICS, "/components")
    },
    // projects/storefrontlib/cms-components/misc/qualtrics/config/qualtrics-config.ts
    {
        previousNode: constants_1.QUALTRICS_CONFIG,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_QUALTRICS, "/components")
    },
    // projects/storefrontlib/cms-components/misc/qualtrics/qualtrics-loader.service.ts
    {
        previousNode: constants_1.QUALTRICS_EVENT_NAME,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_QUALTRICS, "/components")
    },
    // projects/storefrontlib/cms-components/misc/qualtrics/qualtrics.component.ts
    {
        previousNode: constants_1.QUALTRICS_COMPONENT,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_QUALTRICS, "/components")
    },
    // projects/storefrontlib/cms-components/misc/qualtrics/qualtrics.module.ts
    {
        previousNode: qualtrics_schematics_config_1.QUALTRICS_MODULE,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newNode: 'QualtricsComponentsModule',
        newImportPath: "".concat(libs_constants_1.SPARTACUS_QUALTRICS, "/components")
    },
    // projects/storefrontlib/cms-components/asm/asm.module.ts
    {
        previousNode: asm_schematics_config_1.ASM_MODULE,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newNode: 'AsmComponentsModule',
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/components")
    },
    // projects/core/src/occ/adapters/asm/asm-occ.module.ts
    {
        previousNode: constants_1.ASM_OCC_MODULE,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/occ")
    },
    // projects/core/src/occ/adapters/asm/occ-asm.adapter.ts
    {
        previousNode: constants_1.OCC_ASM_ADAPTER,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/occ")
    },
    // projects/core/src/asm/config/asm-config.ts
    {
        previousNode: constants_1.ASM_CONFIG,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/connectors/asm.adapter.ts
    {
        previousNode: constants_1.ASM_ADAPTER,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/connectors/asm.connector.ts
    {
        previousNode: constants_1.ASM_CONNECTOR,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/connectors/converters.ts
    {
        previousNode: constants_1.CUSTOMER_SEARCH_PAGE_NORMALIZER,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/facade/asm.service.ts
    {
        previousNode: constants_1.ASM_SERVICE,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/facade/csagent-auth.service.ts
    {
        previousNode: constants_1.CS_AGENT_AUTH_SERVICE,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/root")
    },
    // projects/core/src/asm/models/asm.models.ts
    {
        previousNode: constants_1.CUSTOMER_SEARCH_PAGE,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/models/asm.models.ts
    {
        previousNode: constants_1.CUSTOMER_SEARCH_OPTIONS,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/models/asm.models.ts
    {
        previousNode: constants_1.ASM_UI,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/services/asm-auth-http-header.service.ts
    {
        previousNode: constants_1.ASM_AUTH_HTTP_HEADER_SERVICE,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/root")
    },
    // projects/core/src/asm/services/asm-auth.service.ts
    {
        previousNode: constants_1.TOKEN_TARGET,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/root")
    },
    // projects/core/src/asm/services/asm-auth-storage.service.ts
    {
        previousNode: constants_1.ASM_AUTH_STORAGE_SERVICE,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/root")
    },
    // projects/core/src/asm/services/asm-state-persistence.service.ts
    {
        previousNode: constants_1.SYNCED_ASM_STATE,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/services/asm-state-persistence.service.ts
    {
        previousNode: constants_1.ASM_STATE_PERSISTENCE_SERVICE,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/store/actions/asm-ui.action.ts
    // projects/core/src/asm/store/actions/customer.action.ts
    // projects/core/src/asm/store/actions/logout-agent.action.ts
    {
        previousNode: constants_1.ASM_ACTIONS,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/store/asm-state.ts
    {
        previousNode: constants_1.ASM_FEATURE,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/store/asm-state.ts
    {
        previousNode: constants_1.CUSTOMER_SEARCH_DATA,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/store/asm-state.ts
    {
        previousNode: constants_1.STATE_WITH_ASM,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/store/asm-state.ts
    {
        previousNode: constants_1.ASM_STATE,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
    // projects/core/src/asm/store/selectors/feature.selector.ts
    {
        previousNode: constants_1.ASM_SELECTORS,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/core")
    },
    // projects/core/src/asm/services/asm-auth.service.ts
    {
        previousNode: constants_1.ASM_AUTH_SERVICE,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_ASM, "/root")
    },
    // projects/core/src/personalization/config/personalization-config.ts
    {
        previousNode: constants_1.PERSONALIZATION_CONFIG,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_TRACKING, "/personalization/root")
    },
    // projects/core/src/personalization/services/personalization-context.service.ts
    {
        previousNode: constants_1.PERSONALIZATION_CONTEXT_SERVICE,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_TRACKING, "/personalization/core")
    },
    // projects/core/src/personalization/model/personalization-context.model.ts
    {
        previousNode: constants_1.PERSONALIZATION_ACTION,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_TRACKING, "/personalization/core")
    },
    // projects/core/src/personalization/model/personalization-context.model.ts
    {
        previousNode: constants_1.PERSONALIZATION_CONTEXT,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_TRACKING, "/personalization/core")
    },
    // projects/core/src/smart-edit/services/smart-edit.service.ts
    {
        previousNode: constants_1.SMART_EDIT_SERVICE,
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_SMARTEDIT, "/core")
    },
    // projects/storefrontlib/cms-components/product/product-variants/variant-style-icons/variant-style-icons.component.ts
    {
        previousNode: constants_1.VARIANT_STYLE_ICONS_COMPONENT,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newNode: constants_1.PRODUCT_VARIANT_STYLE_ICONS_COMPONENT,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_PRODUCT, "/variants/root")
    },
    // projects/storefrontlib/cms-components/product/product-variants/variant-style-icons/variant-style-icons.module.ts
    {
        previousNode: constants_1.VARIANT_STYLE_ICONS_MODULE,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newNode: constants_1.PRODUCT_VARIANT_STYLE_ICONS_MODULE,
        newImportPath: "".concat(libs_constants_1.SPARTACUS_PRODUCT, "/variants/root")
    },
    // projects/storefrontlib/cms-components/myaccount/close-account/close-account.module.ts
    {
        previousNode: constants_1.CLOSE_ACCOUNT_MODULE,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS
    },
    // projects/storefrontlib/cms-components/myaccount/forgot-password/forgot-password.module.ts
    {
        previousNode: constants_1.FORGOT_PASSWORD_MODULE,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS
    },
    // projects/storefrontlib/cms-components/user/register/register.module.ts
    {
        previousNode: constants_1.REGISTER_COMPONENT_MODULE,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS
    },
    // projects/storefrontlib/cms-components/myaccount/reset-password/reset-password.module.ts
    {
        previousNode: constants_1.RESET_PASSWORD_MODULE,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS
    },
    // projects/storefrontlib/cms-components/myaccount/update-email/update-email.module.ts
    {
        previousNode: constants_1.UPDATE_EMAIL_MODULE,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS
    },
    // projects/storefrontlib/cms-components/myaccount/update-password/update-password.module.ts
    {
        previousNode: constants_1.UPDATE_PASSWORD_MODULE,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS
    },
    // projects/storefrontlib/cms-components/myaccount/update-profile/update-profile.module.ts
    {
        previousNode: constants_1.UPDATE_PROFILE_MODULE,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS
    },
    // projects/storefrontlib/cms-components/user/login/login.module.ts
    {
        previousNode: constants_1.LOGIN_MODULE,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_USER_ACCOUNT_COMPONENTS
    },
    // projects/storefrontlib/cms-components/user/login-form/login-form.module.ts
    {
        previousNode: constants_1.LOGIN_FORM_MODULE,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_USER_ACCOUNT_COMPONENTS
    },
    // projects/storefrontlib/cms-components/user/login-register/login-register.module.ts
    {
        previousNode: constants_1.LOGIN_REGISTER_MODULE,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_USER_ACCOUNT_COMPONENTS
    },
    // projects/storefrontlib/cms-components/myaccount/close-account/components/close-account/close-account.component.ts
    {
        previousNode: constants_1.CLOSE_ACCOUNT_COMPONENT,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS
    },
    // projects/storefrontlib/cms-components/user/login-register/login-register.component.ts
    {
        previousNode: constants_1.LOGIN_REGISTER_COMPONENT,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_USER_ACCOUNT_COMPONENTS
    },
    // projects/storefrontlib/cms-components/cart/cart-shared/cart-item/cart-item.component.ts
    {
        previousNode: constants_1.ITEM,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newNode: constants_1.ORDER_ENTRY,
        newImportPath: libs_constants_1.SPARTACUS_CORE
    },
];
exports.CHECKOUT_LIB_MOVED_SYMBOLS_DATA = [
    // projects/storefrontlib/cms-components/user/checkout-login/*
    {
        previousNode: 'CheckoutLoginComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutLoginModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    // projects/storefrontlib/cms-components/order-confirmation/*
    {
        previousNode: 'OrderConfirmationModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'ReplenishmentOrderConfirmationModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'OrderConfirmationGuard',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'GuestRegisterFormComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'OrderConfirmationItemsComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'OrderConfirmationOverviewComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'OrderConfirmationThankYouMessageComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'OrderConfirmationTotalsComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    // projects/storefrontlib/cms-components/checkout/*
    {
        previousNode: 'CheckoutComponentModule',
        newNode: 'CheckoutComponentsModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutOrchestratorComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutOrchestratorModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutOrderSummaryComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutOrderSummaryModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutProgressComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutProgressModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutProgressMobileBottomComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutProgressMobileBottomModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutProgressMobileTopComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutProgressMobileTopModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'DeliveryModeComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'DeliveryModeModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'PaymentMethodComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'PaymentMethodModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'PaymentFormComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'PaymentFormModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'PlaceOrderComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'PlaceOrderModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'ReviewSubmitComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'ReviewSubmitModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'ScheduleReplenishmentOrderComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'ScheduleReplenishmentOrderModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CardWithAddress',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'ShippingAddressComponent',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'ShippingAddressModule',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'DeliveryModePreferences',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
    },
    {
        previousNode: 'CheckoutConfig',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
    },
    {
        previousNode: 'CheckoutAuthGuard',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutStepsSetGuard',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutGuard',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'NotCheckoutAuthGuard',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutStepType',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
    },
    {
        previousNode: 'checkoutShippingSteps',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
    },
    {
        previousNode: 'checkoutPaymentSteps',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
    },
    {
        previousNode: 'CheckoutStep',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
    },
    {
        previousNode: 'CheckoutConfigService',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutDetailsService',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutReplenishmentFormService',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'CheckoutStepService',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    {
        previousNode: 'ExpressCheckoutService',
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
    // projects/core/src/occ/adapters/checkout/*
    {
        previousNode: 'CheckoutOccModule',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_OCC
    },
    {
        previousNode: 'OccCheckoutCostCenterAdapter',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_OCC
    },
    {
        previousNode: 'OccCheckoutDeliveryAdapter',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_OCC
    },
    {
        previousNode: 'OccCheckoutPaymentTypeAdapter',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_OCC
    },
    {
        previousNode: 'OccCheckoutPaymentAdapter',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_OCC
    },
    {
        previousNode: 'OccCheckoutReplenishmentOrderAdapter',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_OCC
    },
    {
        previousNode: 'OccCheckoutAdapter',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_OCC
    },
    {
        previousNode: 'OccReplenishmentOrderFormSerializer',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_OCC
    },
    // projects/core/src/checkout/*
    {
        previousNode: 'CheckoutModule',
        newNode: 'CheckoutCoreModule',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutAdapter',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutConnector',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutCostCenterAdapter',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutCostCenterConnector',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutDeliveryAdapter',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutDeliveryConnector',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'DELIVERY_MODE_NORMALIZER',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutPaymentAdapter',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutPaymentConnector',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'PAYMENT_DETAILS_SERIALIZER',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CARD_TYPE_NORMALIZER',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'PAYMENT_TYPE_NORMALIZER',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'PaymentTypeAdapter',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'PaymentTypeConnector',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'PaymentTypeConnector',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutReplenishmentOrderAdapter',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutReplenishmentOrderConnector',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'REPLENISHMENT_ORDER_FORM_SERIALIZER',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutEventBuilder',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutEventModule',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'OrderPlacedEvent',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
    },
    {
        previousNode: 'CheckoutCostCenterService',
        newNode: 'CheckoutCostCenterFacade',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
    },
    {
        previousNode: 'CheckoutDeliveryService',
        newNode: 'CheckoutDeliveryFacade',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
    },
    {
        previousNode: 'CheckoutPaymentService',
        newNode: 'CheckoutPaymentFacade',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
    },
    {
        previousNode: 'CheckoutService',
        newNode: 'CheckoutFacade',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
    },
    {
        previousNode: 'PaymentTypeService',
        newNode: 'PaymentTypeFacade',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
    },
    {
        previousNode: 'ClearCheckoutService',
        newNode: 'ClearCheckoutFacade',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_ROOT
    },
    {
        previousNode: 'CheckoutDetails',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutPageMetaResolver',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CHECKOUT_FEATURE',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CHECKOUT_DETAILS',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'SET_DELIVERY_ADDRESS_PROCESS_ID',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'SET_DELIVERY_MODE_PROCESS_ID',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'SET_PAYMENT_DETAILS_PROCESS_ID',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'GET_PAYMENT_TYPES_PROCESS_ID',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'SET_COST_CENTER_PROCESS_ID',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'PLACED_ORDER_PROCESS_ID',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'StateWithCheckout',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CardTypesState',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutStepsState',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'PaymentTypesState',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'OrderTypesState',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'PaymentTypesState',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutState',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutActions',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    {
        previousNode: 'CheckoutSelectors',
        previousImportPath: libs_constants_1.SPARTACUS_CORE,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_CORE
    },
    // projects/storefrontlib/cms-components/cart/cart-not-empty.guard.ts
    {
        previousNode: constants_1.CART_NOT_EMPTY_GUARD,
        previousImportPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_OLD_COMPONENTS
    },
];
function migrate() {
    return function (tree) {
        return (0, rename_symbol_1.migrateRenamedSymbols)(tree, __spreadArray(__spreadArray([], exports.RENAMED_SYMBOLS_DATA, true), exports.CHECKOUT_LIB_MOVED_SYMBOLS_DATA, true));
    };
}
exports.migrate = migrate;
//# sourceMappingURL=rename-symbol.js.map