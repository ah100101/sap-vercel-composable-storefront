"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getParams = exports.getSuperNode = exports.getConstructor = exports.runMigration = exports.writeFile = exports.epdFeatureModulePath = exports.digitalPaymentsFeatureModulePath = exports.cdsFeatureModulePath = exports.cdcFeatureModulePath = exports.userProfileWrapperModulePath = exports.userAccountWrapperModulePath = exports.userFeatureModulePath = exports.trackingTagManagementFeatureModulePath = exports.trackingPersonalizationFeatureModulePath = exports.storeFinderFeatureModulePath = exports.smartEditFeatureModulePath = exports.qualtricsFeatureModulePath = exports.productConfiguratorRulebasedWrapperModulePath = exports.productConfiguratorFeatureModulePath = exports.productFutureStockFeatureModulePath = exports.productVariantsFeatureModulePath = exports.productImageZoomFeatureModulePath = exports.productBulkPricingFeatureModulePath = exports.organizationAccountSummaryFeatureModulePath = exports.organizationUnitOrderFeatureModulePath = exports.organizationUserRegistrationFeatureModulePath = exports.organizationOrderApprovalFeatureModulePath = exports.organizationAdministrationWrapperModulePath = exports.pickupInStoreFeatureModulePath = exports.organizationAdministrationFeatureModulePath = exports.orderFeatureModulePath = exports.checkoutWrapperModulePath = exports.checkoutFeatureModulePath = exports.savedCartFeatureModulePath = exports.wishListFeatureModulePath = exports.quickOrderFeatureModulePath = exports.importExportFeatureModulePath = exports.customerTicketingFeatureModulePath = exports.cartWrapperModulePath = exports.cartBaseFeatureModulePath = exports.asmFeatureModulePath = exports.spartacusFeaturesModulePath = void 0;
var core_1 = require("@angular-devkit/core");
var ast_utils_1 = require("@schematics/angular/utility/ast-utils");
var typescript_1 = __importDefault(require("typescript"));
var file_utils_1 = require("./file-utils");
exports.spartacusFeaturesModulePath = 'src/app/spartacus/spartacus-features.module.ts';
exports.asmFeatureModulePath = 'src/app/spartacus/features/asm/asm-feature.module.ts';
exports.cartBaseFeatureModulePath = 'src/app/spartacus/features/cart/cart-base-feature.module.ts';
exports.cartWrapperModulePath = 'src/app/spartacus/features/cart/cart-base-wrapper.module.ts';
exports.customerTicketingFeatureModulePath = 'src/app/spartacus/features/customer-ticketing/customer-ticketing-feature.module.ts';
exports.importExportFeatureModulePath = 'src/app/spartacus/features/cart/cart-import-export-feature.module.ts';
exports.quickOrderFeatureModulePath = 'src/app/spartacus/features/cart/cart-quick-order-feature.module.ts';
exports.wishListFeatureModulePath = 'src/app/spartacus/features/cart/wish-list-feature.module.ts';
exports.savedCartFeatureModulePath = 'src/app/spartacus/features/cart/cart-saved-cart-feature.module.ts';
exports.checkoutFeatureModulePath = 'src/app/spartacus/features/checkout/checkout-feature.module.ts';
exports.checkoutWrapperModulePath = 'src/app/spartacus/features/checkout/checkout-wrapper.module.ts';
exports.orderFeatureModulePath = 'src/app/spartacus/features/order/order-feature.module.ts';
exports.organizationAdministrationFeatureModulePath = 'src/app/spartacus/features/organization/organization-administration-feature.module.ts';
exports.pickupInStoreFeatureModulePath = 'src/app/spartacus/features/pickup-in-store/pickup-in-store-feature.module.ts';
exports.organizationAdministrationWrapperModulePath = 'src/app/spartacus/features/organization/administration-wrapper.module.ts';
exports.organizationOrderApprovalFeatureModulePath = 'src/app/spartacus/features/organization/organization-order-approval-feature.module.ts';
exports.organizationUserRegistrationFeatureModulePath = 'src/app/spartacus/features/organization/organization-user-registration-feature.module.ts';
exports.organizationUnitOrderFeatureModulePath = 'src/app/spartacus/features/organization/organization-unit-order-feature.module.ts';
exports.organizationAccountSummaryFeatureModulePath = 'src/app/spartacus/features/organization/organization-account-summary-feature.module.ts';
exports.productBulkPricingFeatureModulePath = 'src/app/spartacus/features/product/product-bulk-pricing-feature.module.ts';
exports.productImageZoomFeatureModulePath = 'src/app/spartacus/features/product/product-image-zoom-feature.module.ts';
exports.productVariantsFeatureModulePath = 'src/app/spartacus/features/product/product-variants-feature.module.ts';
exports.productFutureStockFeatureModulePath = 'src/app/spartacus/features/product/product-future-stock-feature.module.ts';
exports.productConfiguratorFeatureModulePath = 'src/app/spartacus/features/product-configurator/product-configurator-feature.module.ts';
exports.productConfiguratorRulebasedWrapperModulePath = 'src/app/spartacus/features/product-configurator/rulebased-configurator-wrapper.module.ts';
exports.qualtricsFeatureModulePath = 'src/app/spartacus/features/qualtrics/qualtrics-feature.module.ts';
exports.smartEditFeatureModulePath = 'src/app/spartacus/features/smartedit/smart-edit-feature.module.ts';
exports.storeFinderFeatureModulePath = 'src/app/spartacus/features/storefinder/store-finder-feature.module.ts';
exports.trackingPersonalizationFeatureModulePath = 'src/app/spartacus/features/tracking/personalization-feature.module.ts';
exports.trackingTagManagementFeatureModulePath = 'src/app/spartacus/features/tracking/tag-management-feature.module.ts';
exports.userFeatureModulePath = 'src/app/spartacus/features/user/user-feature.module.ts';
exports.userAccountWrapperModulePath = 'src/app/spartacus/features/user/user-account-wrapper.module.ts';
exports.userProfileWrapperModulePath = 'src/app/spartacus/features/user/user-profile-wrapper.module.ts';
exports.cdcFeatureModulePath = 'src/app/spartacus/features/cdc/cdc-feature.module.ts';
exports.cdsFeatureModulePath = 'src/app/spartacus/features/cds/cds-feature.module.ts';
exports.digitalPaymentsFeatureModulePath = 'src/app/spartacus/features/digital-payments/digital-payments-feature.module.ts';
exports.epdFeatureModulePath = 'src/app/spartacus/features/epd-visualization/epd-visualization-feature.module.ts';
function writeFile(host, filePath, contents) {
    host.sync.write((0, core_1.normalize)(filePath), core_1.virtualFs.stringToFileBuffer(contents));
}
exports.writeFile = writeFile;
function runMigration(appTree, schematicRunner, migrationScript, options) {
    if (options === void 0) { options = {}; }
    return schematicRunner
        .runSchematicAsync(migrationScript, options, appTree)
        .toPromise();
}
exports.runMigration = runMigration;
function getConstructor(nodes) {
    var constructorNode = (0, file_utils_1.findConstructor)(nodes);
    if (!constructorNode) {
        throw new Error('No constructor node found');
    }
    return constructorNode;
}
exports.getConstructor = getConstructor;
function getSuperNode(constructorNode) {
    var superNodes = (0, ast_utils_1.findNodes)(constructorNode, typescript_1["default"].SyntaxKind.SuperKeyword);
    if (!superNodes || superNodes.length === 0) {
        return undefined;
    }
    return superNodes[0];
}
exports.getSuperNode = getSuperNode;
function getParams(constructorNode, camelizedParamNames) {
    var superNode = getSuperNode(constructorNode);
    if (!superNode) {
        throw new Error('No super() node found');
    }
    var callExpressions = (0, ast_utils_1.findNodes)(constructorNode, typescript_1["default"].SyntaxKind.CallExpression);
    if (!callExpressions || callExpressions.length === 0) {
        throw new Error('No call expressions found in constructor');
    }
    var params = (0, ast_utils_1.findNodes)(callExpressions[0], typescript_1["default"].SyntaxKind.Identifier);
    camelizedParamNames = camelizedParamNames.map(function (param) {
        return core_1.strings.camelize(param);
    });
    return params
        .filter(function (n) { return n.kind === typescript_1["default"].SyntaxKind.Identifier; })
        .map(function (n) { return n.getText(); })
        .filter(function (text) { return camelizedParamNames.includes(text); });
}
exports.getParams = getParams;
//# sourceMappingURL=test-utils.js.map