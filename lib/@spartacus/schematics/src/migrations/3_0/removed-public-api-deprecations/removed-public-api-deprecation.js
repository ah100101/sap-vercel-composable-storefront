"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = exports.REMOVED_PUBLIC_API_DATA = void 0;
var constants_1 = require("../../../shared/constants");
var libs_constants_1 = require("../../../shared/libs-constants");
var removed_public_api_deprecation_1 = require("../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation");
exports.REMOVED_PUBLIC_API_DATA = [
    // projects/core/src/auth/store/selectors/index.ts
    {
        node: constants_1.AUTH_SELECTORS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.AUTH_SELECTORS, "' were removed. To access selectors related to client token use 'ClientAuthSelectors'. To get user token use 'AuthStorageService.getToken' method.")
    },
    // projects/core/src/auth/store/auth-state.ts
    {
        node: constants_1.STATE_WITH_AUTH,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STATE_WITH_AUTH, "' was removed. State related to client token was moved to 'StateWithClientAuth'. Data related to user token are stored in 'AuthStorageService' and 'UserIdService'")
    },
    // projects/core/src/auth/store/auth-state.ts
    {
        node: constants_1.AUTH_STATE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.AUTH_STATE, "' was removed. State related to client token was moved to 'ClientAuthState'. Data related to user token are stored in 'AuthStorageService' and 'UserIdService'")
    },
    // projects/core/src/auth/store/auth-state.ts
    {
        node: constants_1.USER_TOKEN_STATE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.USER_TOKEN_STATE, "' was removed. Data related to user token are no longer stored in ngrx store. User token is stored in 'AuthStorageService' and user id is stored in 'UserIdService'")
    },
    // projects/core/src/auth/store/auth-state.ts
    {
        node: constants_1.AUTH_FEATURE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.AUTH_FEATURE, "' was removed. The key for store feature related to client token is in variable 'CLIENT_AUTH_FEATURE'.")
    },
    // projects/core/src/auth/models/token-types.model.ts
    {
        node: constants_1.USER_TOKEN,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.USER_TOKEN, " was removed. Instead of 'AuthToken'. Adjust old properties to new interface shape.")
    },
    // projects/core/src/auth/models/token-types.model.ts
    {
        node: constants_1.AUTHENTICATION_TOKEN,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.AUTHENTICATION_TOKEN, " was removed. Instead use directly 'AuthToken' or 'ClientToken'.")
    },
    // projects/core/src/kyma/store/selectors/index.ts
    {
        node: constants_1.KYMA_SELECTORS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.KYMA_SELECTORS, "' were removed. For replacement look into 3.0 migration documentation.")
    },
    // projects/core/src/kyma/store/kyma-state.ts
    {
        node: constants_1.KYMA_FEATURE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.KYMA_FEATURE, "' was removed. For replacement look into 3.0 migration documentation.")
    },
    // projects/core/src/kyma/store/kyma-state.ts
    {
        node: constants_1.OPEN_ID_TOKEN_DATA,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.OPEN_ID_TOKEN_DATA, "' was removed. For replacement look into 3.0 migration documentation.")
    },
    // projects/core/src/kyma/store/kyma-state.ts
    {
        node: constants_1.STATE_WITH_KYMA,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STATE_WITH_KYMA, "' was removed. For replacement look into 3.0 migration documentation.")
    },
    // projects/core/src/kyma/store/kyma-state.ts
    {
        node: constants_1.KYMA_STATE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.KYMA_STATE, "' was removed. For replacement look into 3.0 migration documentation.")
    },
    // projects/core/src/kyma/store/actions/index.ts
    {
        node: constants_1.KYMA_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.KYMA_ACTIONS, "' were removed. For replacement look into 3.0 migration documentation.")
    },
    // projects/core/src/kyma/services/open-id-token/open-id-token.service.ts
    {
        node: constants_1.OPEN_ID_AUTHENTICATION_TOKEN_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.OPEN_ID_AUTHENTICATION_TOKEN_SERVICE, "' was removed. For replacement look into 3.0 migration documentation.")
    },
    // projects/core/src/kyma/models/kyma-token-types.model.ts
    {
        node: constants_1.OPEN_ID_TOKEN,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.OPEN_ID_TOKEN, "' was removed. For replacement look into 3.0 migration documentation.")
    },
    // projects/core/src/kyma/kyma.module.ts
    {
        node: constants_1.KYMA_MODULE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.KYMA_MODULE, "' was removed. For replacement look into 3.0 migration documentation.")
    },
    // projects/core/src/kyma/facade/kyma.service.ts
    {
        node: constants_1.KYMA_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.KYMA_SERVICE, "' was removed. For replacement look into 3.0 migration documentation.")
    },
    // projects/core/src/kyma/config/kyma-config.ts
    {
        node: constants_1.KYMA_CONFIG,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.KYMA_CONFIG, "' was removed. For replacement look into 3.0 migration documentation.")
    },
    // projects/core/src/asm/facade/asm-auth.service.ts
    {
        node: constants_1.ASM_AUTH_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.ASM_AUTH_SERVICE, "' was renamed to ").concat(constants_1.CS_AGENT_AUTH_SERVICE, ". New '").concat(constants_1.ASM_AUTH_SERVICE, "' is responsible for making '").concat(constants_1.AUTH_SERVICE, "' aware of ASM, but not for managing CS agent session.")
    },
    // projects/core/src/asm/store/asm-state.ts
    {
        node: constants_1.CSAGENT_TOKEN_DATA,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.CSAGENT_TOKEN_DATA, "' was removed. Token is now stored in 'AuthStorageService'.")
    },
    // projects/core/src/asm/http-interceptors/csagent-token.interceptor.ts
    {
        node: constants_1.CUSTOMER_SUPPORT_AGENT_TOKEN_INTERCEPTOR,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.CUSTOMER_SUPPORT_AGENT_TOKEN_INTERCEPTOR, " was removed. The functionality is now provided by 'AuthInterceptor' and 'AsmAuthHttpHeaderService'.")
    },
    // projects/core/src/store-finder/model/search-config.ts
    {
        node: constants_1.STORE_FINDER_SEARCH_CONFIG,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_FINDER_SEARCH_CONFIG, "' is no longer part of the public API. Instead use the interface '").concat(constants_1.SEARCH_CONFIG, "'.")
    },
    // projects/core/src/global-message/http-interceptors/handlers/unauthorized/unauthorized.handler.ts
    {
        node: constants_1.UNAUTHORIZED_ERROR_HANDLER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.UNAUTHORIZED_ERROR_HANDLER, "' has been removed and is no longer part of the public API.")
    },
    // projects/core/src/occ/adapters/store-finder/occ-store-finder.adapter.ts
    {
        node: constants_1.OCC_STORE_FINDER_ADAPTER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.OCC_STORE_FINDER_ADAPTER, "' was moved to @spartacus/storefinder/occ.")
    },
    // projects/core/src/occ/adapters/store-finder/store-finder-occ.module.ts
    {
        node: constants_1.STORE_FINDER_OCC_MODULE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_FINDER_OCC_MODULE, " was moved to @spartacus/storefinder/occ.")
    },
    // projects/core/src/store-finder/config/store-finder-config.ts
    {
        node: constants_1.STORE_FINDER_CONFIG,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_FINDER_CONFIG, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/connectors/converters.ts
    {
        node: constants_1.STORE_FINDER_SEARCH_PAGE_NORMALIZER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_FINDER_SEARCH_PAGE_NORMALIZER, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/connectors/converters.ts
    {
        node: constants_1.STORE_COUNT_NORMALIZER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_COUNT_NORMALIZER, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/connectors/store-finder.connector.ts
    {
        node: constants_1.STORE_FINDER_CONNECTOR,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_FINDER_CONNECTOR, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/connectors/store-finder.adapter.ts
    {
        node: constants_1.STORE_FINDER_ADAPTER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_FINDER_ADAPTER, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/facade/store-data.service.ts
    {
        node: constants_1.STORE_DATA_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_DATA_SERVICE, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/facade/store-finder.service.ts
    {
        node: constants_1.STORE_FINDER_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_FINDER_SERVICE, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/model/store-entities.ts
    {
        node: constants_1.STORE_ENTITIES,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_ENTITIES, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/model/search-query.ts
    {
        node: constants_1.STORE_FINDER_SEARCH_QUERY,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_FINDER_SEARCH_QUERY, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/service/google-map-renderer.service.ts
    {
        node: constants_1.GOOGLE_MAP_RENDERER_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.GOOGLE_MAP_RENDERER_SERVICE, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/store-finder.module.ts
    {
        node: constants_1.STORE_FINDER_CORE_MODULE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_FINDER_CORE_MODULE, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/store/store-finder-state.ts
    {
        node: constants_1.STORE_FINDER_FEATURE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_FINDER_FEATURE, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/store/store-finder-state.ts
    {
        node: constants_1.STORE_FINDER_DATA,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_FINDER_DATA, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/store/store-finder-state.ts
    {
        node: constants_1.STATE_WITH_STORE_FINDER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STATE_WITH_STORE_FINDER, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/store/store-finder-state.ts
    {
        node: constants_1.STORES_STATE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORES_STATE, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/store/store-finder-state.ts
    {
        node: constants_1.FIND_STORES_STATE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.FIND_STORES_STATE, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/store/store-finder-state.ts
    {
        node: constants_1.VIEW_ALL_STORES_STATE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.VIEW_ALL_STORES_STATE, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/store/selectors/index.ts
    {
        node: constants_1.STORE_FINDER_SELECTORS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_FINDER_SELECTORS, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/store/actions/index.ts
    {
        node: constants_1.STORE_FINDER_ACTIONS,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_FINDER_ACTIONS, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/model/store-finder.model.ts
    {
        node: constants_1.STORE_COUNT,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_COUNT, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/core/src/store-finder/model/store-finder.model.ts
    {
        node: constants_1.STORE_FINDER_SEARCH_PAGE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.STORE_FINDER_SEARCH_PAGE, "' was moved to @spartacus/storefinder/core.")
    },
    // projects/storefrontlib/cms-components/storefinder/components/abstract-store-item/abstract-store-item.component.ts
    {
        node: constants_1.ABSTRACT_STORE_ITEM_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.ABSTRACT_STORE_ITEM_COMPONENT, "' was moved to @spartacus/storefinder/components.")
    },
    // projects/storefrontlib/cms-components/storefinder/components/schedule-component/schedule.component.ts
    {
        node: constants_1.SCHEDULE_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.SCHEDULE_COMPONENT, "' was moved to @spartacus/storefinder/components.")
    },
    // projects/storefrontlib/cms-components/storefinder/components/store-finder-grid/store-finder-grid.component.ts
    {
        node: constants_1.STORE_FINDER_GRID_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.STORE_FINDER_GRID_COMPONENT, "' was moved to @spartacus/storefinder/components.")
    },
    // projects/storefrontlib/cms-components/storefinder/components/store-finder-list-item/store-finder-list-item.component.ts
    {
        node: constants_1.STORE_FINDER_LIST_ITEM_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.STORE_FINDER_LIST_ITEM_COMPONENT, "' was moved to @spartacus/storefinder/components.")
    },
    // projects/storefrontlib/cms-components/storefinder/components/store-finder-map/store-finder-map.component.ts
    {
        node: constants_1.STORE_FINDER_MAP_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.STORE_FINDER_MAP_COMPONENT, "' was moved to @spartacus/storefinder/components.")
    },
    // projects/storefrontlib/cms-components/storefinder/components/store-finder-search-result/store-finder-list/store-finder-list.component.ts
    {
        node: constants_1.STORE_FINDER_LIST_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.STORE_FINDER_LIST_COMPONENT, "' was moved to @spartacus/storefinder/components.")
    },
    // projects/storefrontlib/cms-components/storefinder/components/store-finder-search-result/store-finder-search-result.component.ts
    {
        node: constants_1.STORE_FINDER_SEARCH_RESULT_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.STORE_FINDER_SEARCH_RESULT_COMPONENT, "' was moved to @spartacus/storefinder/components.")
    },
    // projects/storefrontlib/cms-components/storefinder/components/store-finder-search/store-finder-search.component.ts
    {
        node: constants_1.STORE_FINDER_SEARCH_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.STORE_FINDER_SEARCH_COMPONENT, "' was moved to @spartacus/storefinder/components.")
    },
    // projects/storefrontlib/cms-components/storefinder/components/store-finder-store-description/store-finder-store-description.component.ts
    {
        node: constants_1.STORE_FINDER_STORE_DESCRIPTION_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.STORE_FINDER_STORE_DESCRIPTION_COMPONENT, "' was moved to @spartacus/storefinder/components.")
    },
    // projects/storefrontlib/cms-components/storefinder/components/store-finder-store/store-finder-store.component.ts
    {
        node: constants_1.STORE_FINDER_STORE_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.STORE_FINDER_STORE_COMPONENT, "' was moved to @spartacus/storefinder/components.")
    },
    // projects/storefrontlib/cms-components/storefinder/components/store-finder-stores-count/store-finder-stores-count.component.ts
    {
        node: constants_1.STORE_FINDER_STORES_COUNT_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.STORE_FINDER_STORES_COUNT_COMPONENT, "' was moved to @spartacus/storefinder/components.")
    },
    // projects/storefrontlib/cms-components/storefinder/store-finder.module.ts
    {
        node: constants_1.STORE_FINDER_MODULE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.STORE_FINDER_MODULE, "' was renamed to 'StoreFinderComponentsModule' and moved to @spartacus/storefinder/components.")
    },
    // projects/storefrontlib/cms-components/storefinder/components/store-finder-header/store-finder-header.component.ts
    {
        node: constants_1.STORE_FINDER_HEADER_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.STORE_FINDER_HEADER_COMPONENT, "' was moved to @spartacus/storefinder/components.")
    },
    // projects/storefrontlib/cms-components/storefinder/components/store-finder-pagination-details/store-finder-pagination-details.component.ts
    {
        node: constants_1.STORE_FINDER_PAGINATION_DETAILS_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.STORE_FINDER_PAGINATION_DETAILS_COMPONENT, "' was moved to @spartacus/storefinder/components.")
    },
    // projects/storefrontlib/cms-components/storefinder/components/store-finder/store-finder.component.ts
    {
        node: constants_1.STORE_FINDER_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.STORE_FINDER_COMPONENT, "' was moved to @spartacus/storefinder/components.")
    },
    // projects/core/src/occ/utils/interceptor-util.ts
    {
        node: constants_1.TOKEN_REVOCATION_HEADER,
        importPath: libs_constants_1.SPARTACUS_CORE,
        comment: "'".concat(constants_1.TOKEN_REVOCATION_HEADER, " has been removed and is no longer part of the public API.")
    },
    // projects/storefrontlib/shared/components/split-view/split-view-deactivate.guard.ts
    {
        node: constants_1.SPLIT_VIEW_DEACTIVATE_GUARD,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        comment: "'".concat(constants_1.SPLIT_VIEW_DEACTIVATE_GUARD, " has been removed and is no longer part of the public API.")
    },
];
function migrate() {
    return function (tree, context) {
        return (0, removed_public_api_deprecation_1.removedPublicApiDeprecation)(tree, context, exports.REMOVED_PUBLIC_API_DATA);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=removed-public-api-deprecation.js.map