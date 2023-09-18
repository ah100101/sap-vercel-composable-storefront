"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = exports.REMOVED_PUBLIC_API_DATA = void 0;
var constants_1 = require("../../../shared/constants");
var asm_schematics_config_1 = require("../../../shared/lib-configs/asm-schematics-config");
var tracking_schematics_config_1 = require("../../../shared/lib-configs/tracking-schematics-config");
var user_schematics_config_1 = require("../../../shared/lib-configs/user-schematics-config");
var libs_constants_1 = require("../../../shared/libs-constants");
var removed_public_api_deprecation_1 = require("../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation");
exports.REMOVED_PUBLIC_API_DATA = [
    //projects/core/src/occ/config-loader/occ-config-loader.module.ts
    {
        node: constants_1.OCC_CONFIG_LOADER_MODULE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.OCC_CONFIG_LOADER_MODULE, " has been removed and is no longer part of the public API. Please use 'SiteContextConfigInitializer' and 'I18nConfigInitializer' instead")
    },
    //projects/core/src/occ/config-loader/occ-config-loader.service.ts
    {
        node: constants_1.OCC_CONFIG_LOADER_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.OCC_CONFIG_LOADER_SERVICE, " has been removed and is no longer part of the public API. Please use 'SiteContextConfigInitializer' and 'I18nConfigInitializer' instead")
    },
    //projects/core/src/occ/config-loader/occ-loaded-config-converter.ts
    {
        node: constants_1.OCC_LOADED_CONFIG_CONVERTER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.OCC_LOADED_CONFIG_CONVERTER, " has been removed and is no longer part of the public API.  Please use 'SiteContextConfigInitializer' and 'I18nConfigInitializer' instead")
    },
    //projects/core/src/occ/config-loader/occ-loaded-config.ts
    {
        node: constants_1.OCC_LOADED_CONFIG,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.OCC_LOADED_CONFIG, " has been removed and is no longer part of the public API. Please use 'SiteContextConfigInitializer' and 'I18nConfigInitializer' instead")
    },
    //projects/core/src/occ/config-loader/occ-sites-config-loader.ts
    {
        node: constants_1.OCC_SITES_CONFIG_LOADER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.OCC_SITES_CONFIG_LOADER, " has been removed and is no longer part of the public API. Please use 'SiteContextConfigInitializer' and 'I18nConfigInitializer' instead")
    },
    {
        node: constants_1.B2C_STOREFRONT_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "".concat(constants_1.B2C_STOREFRONT_MODULE, " was removed. Check \"Migrating to new, reference app structure\" section in the migration docs on how to replace it.")
    },
    {
        node: constants_1.B2B_STOREFRONT_MODULE,
        importPath: libs_constants_1.SPARTACUS_SETUP,
        comment: "".concat(constants_1.B2B_STOREFRONT_MODULE, " was removed. Check \"Migrating to new, reference app structure\" section in the migration docs on how to replace it.")
    },
    {
        node: constants_1.STOREFRONT_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "".concat(constants_1.STOREFRONT_MODULE, " was removed. Check \"Migrating to new, reference app structure\" section in the migration docs on how to replace it.")
    },
    {
        node: constants_1.CMS_LIB_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "".concat(constants_1.CMS_LIB_MODULE, " was removed. Check \"Migrating to new, reference app structure\" section in the migration docs on how to replace it.")
    },
    {
        node: constants_1.MAIN_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "".concat(constants_1.MAIN_MODULE, " was removed. Check \"Migrating to new, reference app structure\" section in the migration docs on how to replace it.")
    },
    {
        node: constants_1.STOREFRONT_FOUNDATION_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "".concat(constants_1.STOREFRONT_FOUNDATION_MODULE, " was removed. Check \"Migrating to new, reference app structure\" section in the migration docs on how to replace it.")
    },
    {
        node: constants_1.VIEW_CONFIG_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "".concat(constants_1.VIEW_CONFIG_MODULE, " was removed as it was only providing empty config, which is not needed.")
    },
    {
        node: constants_1.OCC_MODULE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "".concat(constants_1.OCC_MODULE, " was removed. Check \"Migrating to new, reference app structure\" section in the migration docs on how to replace it.")
    },
    {
        node: constants_1.EVENTS_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "".concat(constants_1.EVENTS_MODULE, " was removed. Check \"Migrating to new, reference app structure\" section in the migration docs on how to replace it.")
    },
    // projects/core/src/asm/asm.module.ts
    {
        node: asm_schematics_config_1.ASM_MODULE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(asm_schematics_config_1.ASM_MODULE, "' was moved to @spartacus/asm/core. To benefit from lazy loading it by default, consider removing the module import and running the command 'ng add @spartacus/asm'.")
    },
    {
        node: constants_1.SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CART_SAVED_CART_COMPONENTS,
        comment: "'".concat(constants_1.SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE, "' has been removed.' 'openDialog' method has been moved to 'LaunchDialogService'.")
    },
    {
        node: constants_1.ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE, "' has been removed.' 'openDialog' method has been moved to 'LaunchDialogService'.")
    },
    {
        node: constants_1.REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE, "' has been removed.' 'openDialog' method has been moved to 'LaunchDialogService'.")
    },
    // projects/core/src/smart-edit/smart-edit.module.ts
    {
        node: constants_1.SMART_EDIT_MODULE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.SMART_EDIT_MODULE, "' was removed. Use @spartacus/smartedit instead. To benefit from lazy loading it by default, consider removing the module import and running the command 'ng add @spartacus/smartedit'.")
    },
    // projects/core/src/personalization/personalization.module.ts
    {
        node: tracking_schematics_config_1.PERSONALIZATION_MODULE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(tracking_schematics_config_1.PERSONALIZATION_MODULE, "' was removed. Use @spartacus/tracking/personalization instead. To benefit from lazy loading it by default, consider removing the module import and running the command 'ng add @spartacus/tracking --features=Personalization'.")
    },
    // projects/storefrontlib/cms-components/product/product-variants/product-variants.module.ts
    {
        node: constants_1.PRODUCT_VARIANTS_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.PRODUCT_VARIANTS_MODULE, "' was removed from @spartacus/storefront. Use @spartacus/product/variants feature-library instead. To benefit from lazy loading it by default, consider removing the module import and running the command 'ng add @spartacus/product --features=Product-Variants'.")
    },
    // projects/storefrontlib/cms-components/product/product-variants/product-variants.component.ts
    {
        node: constants_1.PRODUCT_VARIANT_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.PRODUCT_VARIANT_COMPONENT, "' was removed from @spartacus/storefront. Use ProductVariantsContainerComponent from @spartacus/product/variants/components as a replacement.")
    },
    // projects/storefrontlib/cms-components/product/product-variants/variant-color-selector/variant-color-selector.component.ts
    {
        node: constants_1.VARIANT_COLOR_SELECTOR_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.VARIANT_COLOR_SELECTOR_COMPONENT, "' was removed from @spartacus/storefront. Use ProductVariantColorSelectorComponent from @spartacus/product/variants/components as a replacement.")
    },
    // projects/storefrontlib/cms-components/product/product-variants/variant-color-selector/variant-color-selector.module.ts
    {
        node: constants_1.VARIANT_COLOR_SELECTOR_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.VARIANT_COLOR_SELECTOR_MODULE, "' was removed from @spartacus/storefront. Use ProductVariantColorSelectorModule from @spartacus/product/variants/components as a replacement.")
    },
    // projects/storefrontlib/cms-components/product/product-variants/variant-size-selector/variant-size-selector.component.ts
    {
        node: constants_1.VARIANT_SIZE_SELECTOR_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.VARIANT_SIZE_SELECTOR_COMPONENT, "' was removed from @spartacus/storefront. Use ProductVariantSizeSelectorComponent from @spartacus/product/variants/components as a replacement.")
    },
    // projects/storefrontlib/cms-components/product/product-variants/variant-size-selector/variant-size-selector.module.ts
    {
        node: constants_1.VARIANT_SIZE_SELECTOR_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.VARIANT_SIZE_SELECTOR_MODULE, "' was removed from @spartacus/storefront. Use ProductVariantSizeSelectorModule from @spartacus/product/variants/components as a replacement.")
    },
    // projects/storefrontlib/cms-components/product/product-variants/variant-style-selector/variant-style-selector.component.ts
    {
        node: constants_1.VARIANT_STYLE_SELECTOR_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.VARIANT_STYLE_SELECTOR_COMPONENT, "' was removed from @spartacus/storefront. Use ProductVariantStyleSelectorComponent from @spartacus/product/variants/components as a replacement.")
    },
    // projects/storefrontlib/cms-components/product/product-variants/variant-style-selector/variant-style-selector.module.ts
    {
        node: constants_1.VARIANT_STYLE_SELECTOR_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.VARIANT_STYLE_SELECTOR_MODULE, "' was removed from @spartacus/storefront. Use ProductVariantStyleSelectorModule from @spartacus/product/variants/components as a replacement.")
    },
    // projects/storefrontlib/cms-components/product/product-variants/guards/product-variant.guard.ts
    {
        node: constants_1.PRODUCT_VARIANT_GUARD,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.PRODUCT_VARIANT_GUARD, "' was removed from @spartacus/storefront. Use ProductVariantsGuard from @spartacus/product/variants/components instead. Additionally method: findVariant was renamed to findPurchasableProductCode.")
    },
    {
        node: constants_1.PRODUCT_VARIANT_STYLE_ICONS_MODULE,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_VARIANTS_COMPONENTS,
        comment: "'".concat(constants_1.PRODUCT_VARIANT_STYLE_ICONS_MODULE, "' was removed from ").concat(libs_constants_1.SPARTACUS_PRODUCT_VARIANTS_COMPONENTS, ". Use @spartacus/product/variants/root instead.")
    },
    {
        node: constants_1.PRODUCT_VARIANT_STYLE_ICONS_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_VARIANTS_COMPONENTS,
        comment: "'".concat(constants_1.PRODUCT_VARIANT_STYLE_ICONS_COMPONENT, "' was removed from ").concat(libs_constants_1.SPARTACUS_PRODUCT_VARIANTS_COMPONENTS, ". Use @spartacus/product/variants/root instead.")
    },
    {
        node: constants_1.DEFAULT_STATE_CONFIG,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.DEFAULT_STATE_CONFIG, "' was removed with the whole storage sync mechanism. For syncing your data to and from browser storage use StatePersistenceService.")
    },
    {
        node: constants_1.DEFAULT_LOCAL_STORAGE_KEY,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.DEFAULT_LOCAL_STORAGE_KEY, "' was removed with the whole storage sync mechanism. For syncing your data to and from browser storage use StatePersistenceService.")
    },
    {
        node: constants_1.DEFAULT_SESSION_STORAGE_KEY,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.DEFAULT_SESSION_STORAGE_KEY, "' was removed with the whole storage sync mechanism. For syncing your data to and from browser storage use StatePersistenceService.")
    },
    {
        node: constants_1.CART_PAGE_META_RESOLVER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.CART_PAGE_META_RESOLVER, "' was removed since all data is now data driven by CMS page data and is resolved by the ").concat(constants_1.CONTENT_PAGE_META_RESOLVER)
    },
    {
        node: constants_1.FEATURE_MODULES_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.FEATURE_MODULES_SERVICE, "' was removed. Use '").concat(constants_1.CMS_FEATURES_SERVICE, "' instead.")
    },
    // projects/assets/src/translations/translation-chunks-config.ts
    {
        node: constants_1.TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.TRANSLATION_CHUNKS_CONFIG, "' - Following translation chunks '").concat(constants_1.MINI_LOGIN_TRANSLATION_CHUNK, "', '").concat(constants_1.UPDATE_EMAIL_FORM_TRANSLATION_CHUNK, "', '").concat(constants_1.FORGOTTEN_PASSWORD_TRANSLATION_CHUNK, "', '").concat(constants_1.LOGIN_FORM_TRANSLATION_CHUNK, "', '").concat(constants_1.REGISTER_TRANSLATION_CHUNK, "' were moved to ").concat(libs_constants_1.SPARTACUS_USER, ".")
    },
    // projects/storefrontlib/cms-components/cms-lib.module.ts
    {
        node: constants_1.CMS_LIB_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.CMS_LIB_MODULE, "' - Following module imports '").concat(constants_1.CLOSE_ACCOUNT_MODULE, "', '").concat(constants_1.FORGOT_PASSWORD_MODULE, "', '").concat(constants_1.RESET_PASSWORD_MODULE, "', '").concat(constants_1.UPDATE_EMAIL_MODULE, "', '").concat(constants_1.UPDATE_PASSWORD_MODULE, "', '").concat(constants_1.UPDATE_PROFILE_MODULE, "', '").concat(constants_1.USER_COMPONENT_MODULE, "' were removed. Those modules are now part of ").concat(libs_constants_1.SPARTACUS_USER, ".")
    },
    // projects/storefrontlib/cms-components/user/user.module.ts
    {
        node: constants_1.USER_COMPONENT_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.USER_COMPONENT_MODULE, "' - Following module imports '").concat(constants_1.LOGIN_MODULE, "', '").concat(constants_1.LOGIN_FORM_MODULE, "', '").concat(constants_1.LOGIN_REGISTER_MODULE, "', '").concat(constants_1.REGISTER_COMPONENT_MODULE, "' were removed. Those modules are now part of ").concat(libs_constants_1.SPARTACUS_USER, ".")
    },
    // projects/storefrontlib/cms-components/myaccount/close-account/components/close-account-modal/close-account-modal.component.ts
    {
        node: constants_1.CLOSE_ACCOUNT_MODAL_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.CLOSE_ACCOUNT_MODAL_COMPONENT, "' was moved to ").concat(libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS, ". Also there were small changes in component's logic. For more details please look into 4.0 migration documentation.")
    },
    // projects/storefrontlib/cms-components/myaccount/forgot-password/forgot-password.component.ts
    {
        node: constants_1.FORGOT_PASSWORD_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.FORGOT_PASSWORD_COMPONENT, "' was moved to ").concat(libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS, ". Logic for this component was changed and introduced in new 'ForgotPasswordService'. For more details please look into 4.0 migration documentation.")
    },
    // projects/storefrontlib/cms-components/user/login/login.component.ts
    {
        node: constants_1.LOGIN_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.LOGIN_COMPONENT, "' was moved to '").concat(libs_constants_1.SPARTACUS_USER_ACCOUNT_COMPONENTS, "'. Logic for this component was changed. For more details please look into 4.0 migration documentation.")
    },
    // projects/storefrontlib/cms-components/user/login-form/login-form.component.ts
    {
        node: constants_1.LOGIN_FORM_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.LOGIN_FORM_COMPONENT, "' was moved to '").concat(libs_constants_1.SPARTACUS_USER_ACCOUNT_COMPONENTS, "'. Logic for this component was changed. For more details please look into 4.0 migration documentation.")
    },
    // projects/storefrontlib/cms-components/user/register/register.component.ts
    {
        node: constants_1.REGISTER_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.REGISTER_COMPONENT, "' was moved to '").concat(libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS, "'. Logic for this component was changed. For more details please look into 4.0 migration documentation.")
    },
    // projects/storefrontlib/cms-components/myaccount/reset-password/reset-password-form.component.ts
    {
        node: constants_1.RESET_PASSWORD_FORM_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.RESET_PASSWORD_FORM_COMPONENT, "' was renamed to '").concat(constants_1.RESET_PASSWORD_COMPONENT, "' and now it can be used from ").concat(libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS, ". Also logic for this component was changed. For more details please look into 4.0 migration documentation.")
    },
    // projects/storefrontlib/cms-components/myaccount/update-email/update-email.component.ts
    {
        node: constants_1.UPDATE_EMAIL_FORM_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.UPDATE_EMAIL_FORM_COMPONENT, "' was removed. For replacement use '").concat(constants_1.UPDATE_EMAIL_COMPONENT, "' from ").concat(libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS, ".")
    },
    // projects/storefrontlib/cms-components/myaccount/update-email/update-email-form/update-email-form.component.ts
    {
        node: constants_1.UPDATE_EMAIL_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.UPDATE_EMAIL_COMPONENT, "' was moved to ").concat(libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS, ". Logic for this component was changed. For more details please look into 4.0 migration documentation.")
    },
    // projects/storefrontlib/cms-components/myaccount/update-password/components/update-password-form/update-password-form.component.ts
    {
        node: constants_1.UPDATE_PASSWORD_FORM_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.UPDATE_PASSWORD_FORM_COMPONENT, "' was removed. For replacement use '").concat(constants_1.UPDATE_PASSWORD_COMPONENT, "' from ").concat(libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS, ".")
    },
    // projects/storefrontlib/cms-components/myaccount/update-password/components/update-password/update-password.component.ts
    {
        node: constants_1.UPDATE_PASSWORD_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.UPDATE_PASSWORD_COMPONENT, "' was moved to ").concat(libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS, ". Logic for this component was changed. For more details please look into 4.0 migration documentation.")
    },
    // projects/storefrontlib/cms-components/myaccount/update-profile/update-profile.component.ts
    {
        node: constants_1.UPDATE_PROFILE_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.UPDATE_PROFILE_COMPONENT, "' was moved to ").concat(libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS, ". Logic for this component was changed. For more details please look into 4.0 migration documentation.")
    },
    // projects/core/src/routing/store/actions/router.action.ts
    {
        node: constants_1.ROUTING_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "The following ngrx '".concat(constants_1.ROUTING_ACTIONS, "' have been removed: '").concat(constants_1.ROUTE_GO_ACTION, "', '").concat(constants_1.ROUTE_GO_BY_URL_ACTION, "', '").concat(constants_1.ROUTE_BACK_ACTION, "' and '").concat(constants_1.ROUTE_FORWARD_ACTION, "'. Please use instead the methods of the ").concat(constants_1.ROUTING_SERVICE, ", respectively: 'go()', 'goByUrl()', 'back()' and 'forward()'.")
    },
    {
        node: constants_1.PAGE_EVENT_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.PAGE_EVENT_MODULE, "' was removed, please use 'NavigationEventModule' from '").concat(libs_constants_1.SPARTACUS_STOREFRONTLIB, "' instead.")
    },
    {
        node: constants_1.PAGE_EVENT_BUILDER,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.PAGE_EVENT_BUILDER, "' was removed, please use 'NavigationEventBuilder' from '").concat(libs_constants_1.SPARTACUS_STOREFRONTLIB, "' instead.")
    },
    // projects/storefrontlib/storefront-config.ts
    {
        node: constants_1.STOREFRONT_CONFIG,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.STOREFRONT_CONFIG, "' type purpose is now covered by 'Config' interface. Replace usage of 'StorefrontConfig' with 'Config'.")
    },
    // feature-libs/storefinder/core/facade/store-data.service.ts
    {
        node: constants_1.STORE_DATA_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFINDER,
        comment: "'".concat(constants_1.STORE_DATA_SERVICE, "' was removed, please use 'StoreFinderService' from '").concat(libs_constants_1.SPARTACUS_STOREFINDER, " instead.")
    },
    // projects/core/src/occ/adapters/user/occ-user.adapter.ts
    {
        node: constants_1.OCC_USER_ADAPTER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.OCC_USER_ADAPTER, "' was removed, please use '").concat(constants_1.OCC_USER_ACCOUNT_ADAPTER, "' from '").concat(libs_constants_1.SPARTACUS_USER_ACCOUNT_OCC, "' and '").concat(constants_1.OCC_USER_PROFILE_ADAPTER, "' from '").concat(libs_constants_1.SPARTACUS_USER_PROFILE_OCC, "'. Also there was method name change, for more details please look into 4.0 migration documentation.")
    },
    // projects/core/src/occ/occ-models/occ-endpoints.model.ts
    {
        node: constants_1.OCC_ENDPOINTS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.OCC_ENDPOINTS, " - Following endpoints '").concat(constants_1.TITLES_ENDPOINT, "', '").concat(constants_1.USER_ENDPOINT, "', '").concat(constants_1.USER_REGISTER_ENDPOINT, "', '").concat(constants_1.USER_FORGOT_PASSWORD_ENDPOINT, "', '").concat(constants_1.USER_RESET_PASSWORD_ENDPOINT, "', '").concat(constants_1.USER_UPDATE_LOGIN_ID_ENDPOINT, "', '").concat(constants_1.USER_UPDATE_PASSWORD_ENDPOINT, "' , '").concat(constants_1.USER_UPDATE_PROFILE_ENDPOINT, "' , '").concat(constants_1.USER_CLOSE_ACCOUNT_ENDPOINT, "' were removed. For replacement please use following endpoints from '").concat(libs_constants_1.SPARTACUS_USER_ACCOUNT, "' and '").concat(libs_constants_1.SPARTACUS_USER_PROFILE, "'.")
    },
    // projects/core/src/user/connectors/user/converters.ts
    {
        node: constants_1.TITLE_NORMALIZER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.TITLE_NORMALIZER, "' was moved to '").concat(libs_constants_1.SPARTACUS_USER_PROFILE, "'.")
    },
    // projects/core/src/user/connectors/user/converters.ts
    {
        node: constants_1.USER_SIGN_UP_SERIALIZER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.USER_SIGN_UP_SERIALIZER, "' was moved to '").concat(libs_constants_1.SPARTACUS_USER_PROFILE, "'.")
    },
    // projects/core/src/user/connectors/user/converters.ts
    {
        node: constants_1.USER_SERIALIZER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.USER_SERIALIZER, "' was removed. For replacement please use '").concat(constants_1.USER_ACCOUNT_SERIALIZER, "' from '").concat(libs_constants_1.SPARTACUS_USER_ACCOUNT, "' and '").concat(constants_1.USER_PROFILE_SERIALIZER, "' from '").concat(libs_constants_1.SPARTACUS_USER_PROFILE, "'.")
    },
    // projects/core/src/user/connectors/user/converters.ts
    {
        node: constants_1.USER_NORMALIZER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.USER_NORMALIZER, "' was removed. For replacement please use '").concat(constants_1.USER_ACCOUNT_NORMALIZER, "' from '").concat(libs_constants_1.SPARTACUS_USER_ACCOUNT, "' and '").concat(constants_1.USER_PROFILE_NORMALIZER, "' from '").concat(libs_constants_1.SPARTACUS_USER_PROFILE, "'.")
    },
    // projects/core/src/user/connectors/user/user.adapter.ts
    {
        node: constants_1.USER_ADAPTER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.USER_ADAPTER, "' was removed, please use '").concat(constants_1.USER_ACCOUNT_ADAPTER, "' from '").concat(libs_constants_1.SPARTACUS_USER_ACCOUNT_CORE, "' and '").concat(constants_1.USER_PROFILE_ADAPTER, "' from '").concat(libs_constants_1.SPARTACUS_USER_PROFILE_CORE, "'. Also there was method name change, for more details please look into 4.0 migration documentation.")
    },
    // projects/core/src/user/connectors/user/user.connector.ts
    {
        node: constants_1.USER_CONNECTOR,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.USER_CONNECTOR, "' was removed, please use '").concat(constants_1.USER_ACCOUNT_CONNECTOR, "' from '").concat(libs_constants_1.SPARTACUS_USER_ACCOUNT_CORE, "' and '").concat(constants_1.USER_PROFILE_CONNECTOR, "' from '").concat(libs_constants_1.SPARTACUS_USER_PROFILE_CORE, "'. Also there was slighly change in method logic, for more details please look into 4.0 migration documentation.")
    },
    // projects/core/src/user/facade/user.service.ts
    {
        node: constants_1.USER_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "Many methods from '".concat(constants_1.USER_SERVICE, "' were removed, for more details please look into 4.0 migration documentation.")
    },
    // projects/core/src/model/misc.model.ts
    {
        node: constants_1.USER_SIGN_UP_INTERFACE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.USER_SIGN_UP_INTERFACE, "' was removed, for replacement please use '").concat(constants_1.USER_SIGN_UP_INTERFACE, "' from '").concat(libs_constants_1.SPARTACUS_USER_PROFILE, "'.")
    },
    // projects/core/src/user/store/actions/index.ts
    {
        node: constants_1.USER_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "".concat(constants_1.USER_ACTIONS, " - Following actions '").concat(constants_1.FORGOT_PASSWORD_EMAIL_ACTION, "', '").concat(constants_1.RESET_PASSWORD_ACTION, "', '").concat(constants_1.EMAIL_ACTIONS, "', '").concat(constants_1.UPDATE_PASSWORD_ACTION, "', '").concat(constants_1.USER_DETAILS_ACTION, "' were removed. Logic was moved to '").concat(libs_constants_1.SPARTACUS_USER, "'.")
    },
    // projects/core/src/user/store/user-state.ts
    {
        node: constants_1.USER_DETAILS_STATE_INTERFACE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.USER_DETAILS_STATE_INTERFACE, "' was removed.")
    },
    // projects/core/src/user/store/user-state.ts
    {
        node: constants_1.USER_STATE_INTERFACE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "Properties 'account' 'titles', and 'resetPassword' were removed from '".concat(constants_1.USER_DETAILS_STATE_INTERFACE, "' interface.")
    },
    // projects/core/src/user/user-transitional-tokens.ts
    {
        node: constants_1.USER_PROFILE_FACADE_TRANSITIONAL_TOKEN,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "Abstract methods 'get', 'update', 'close' were removed from '".concat(constants_1.USER_PROFILE_FACADE_TRANSITIONAL_TOKEN, "'.")
    },
    // projects/core/src/user/user-transitional-tokens.ts
    {
        node: constants_1.USER_REGISTER_FACADE_TRANSITIONAL_TOKEN,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.USER_REGISTER_FACADE_TRANSITIONAL_TOKEN, "' class was removed.")
    },
    // projects/core/src/user/user.module.ts
    {
        node: constants_1.USER_MODULE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.USER_MODULE, "' was removed. Main modules currently are '").concat(user_schematics_config_1.USER_ACCOUNT_MODULE, "' in '").concat(libs_constants_1.SPARTACUS_USER_ACCOUNT, "' and '").concat(user_schematics_config_1.USER_PROFILE_MODULE, "' in '").concat(libs_constants_1.SPARTACUS_USER_PROFILE, "'. To benefit from lazy loading it by default, consider removing the module import and running the command 'ng add @spartacus/user'.")
    },
    // projects/storefrontlib/shared/components/table/table.model.ts
    {
        node: constants_1.TABLE_HEADER,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.SORT_CODE, "' was removed from interface 'TableHeader'")
    },
    // feature-libs/product-configurator/rulebased/components/config/message-config.ts
    {
        node: constants_1.MESSAGE_CONFIG,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        comment: "'".concat(constants_1.MESSAGE_CONFIG, "' was removed. For replacement use '").concat(constants_1.CONFIGURATOR_MESSAGE_CONFIG, "' from ").concat(libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED, ".")
    },
    // projects/core/src/util/external-js-file-loader/external-js-file-loader.service.ts
    {
        node: constants_1.EXTERNAL_JS_FILE_LOADER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.EXTERNAL_JS_FILE_LOADER, "' was removed, please use 'ScriptLoader' from '").concat(libs_constants_1.SPARTACUS_CORE, " instead.")
    },
    // projects/storefrontlib/recipes/config/layout-config.ts#b2cLayoutConfig
    {
        node: constants_1.B2C_LAYOUT_CONFIG,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.B2C_LAYOUT_CONFIG, "' was removed from '").concat(libs_constants_1.SPARTACUS_STOREFRONTLIB, "', please use corresponding feature-lib specific layout.")
    },
];
function migrate() {
    return function (tree, context) {
        return (0, removed_public_api_deprecation_1.removedPublicApiDeprecation)(tree, context, exports.REMOVED_PUBLIC_API_DATA);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=removed-public-api-deprecation.js.map