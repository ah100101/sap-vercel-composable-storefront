"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.migrate = exports.COMPONENT_DEPRECATION_DATA = void 0;
var load_esm_module_1 = require("../../../shared/utils/load-esm-module");
var component_deprecations_1 = require("../../mechanism/component-deprecations/component-deprecations");
var added_to_cart_dialog_component_migration_1 = require("./data/added-to-cart-dialog.component.migration");
var cart_item_component_migration_1 = require("./data/cart-item.component.migration");
var checkout_progress_mobile_bottom_component_migration_1 = require("./data/checkout-progress-mobile-bottom.component.migration");
var checkout_progress_mobile_top_component_migration_1 = require("./data/checkout-progress-mobile-top.component.migration");
var checkout_progress_component_migration_1 = require("./data/checkout-progress.component.migration");
var close_account_modal_component_migration_1 = require("./data/close-account-modal.component.migration");
var delivery_mode_component_migration_1 = require("./data/delivery-mode.component.migration");
var order_detail_shipping_component_migration_1 = require("./data/order-detail-shipping.component.migration");
var payment_method_component_migration_1 = require("./data/payment-method.component.migration");
var place_order_component_migration_1 = require("./data/place-order.component.migration");
var shipping_address_component_migration_1 = require("./data/shipping-address.component.migration");
var star_rating_component_migration_1 = require("./data/star-rating.component.migration");
exports.COMPONENT_DEPRECATION_DATA = [
    checkout_progress_mobile_bottom_component_migration_1.CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT_MIGRATION,
    checkout_progress_mobile_top_component_migration_1.CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION,
    checkout_progress_component_migration_1.CHECKOUT_PROGRESS_COMPONENT_MIGRATION,
    delivery_mode_component_migration_1.DELIVERY_MODE_COMPONENT_MIGRATION,
    payment_method_component_migration_1.PAYMENT_METHOD_COMPONENT_MIGRATION,
    shipping_address_component_migration_1.SHIPPING_ADDRESS_COMPONENT_MIGRATION,
    order_detail_shipping_component_migration_1.ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION,
    place_order_component_migration_1.PLACE_ORDER_COMPONENT_MIGRATION,
    added_to_cart_dialog_component_migration_1.ADD_TO_CART_COMPONENT_MIGRATION,
    cart_item_component_migration_1.CART_ITEM_COMPONENT_MIGRATION,
    close_account_modal_component_migration_1.CLOSE_ACCOUNT_MODAL_COMPONENT_MIGRATION,
    star_rating_component_migration_1.STAR_RATING_COMPONENT_MIGRATION,
];
function migrate() {
    var _this = this;
    // This workaround is needed only for schematics depending on `@angular/compiler` since Ng13
    // It can be removed as soon as Angular Schematics starts supporting ES Modules
    // (https://github.com/angular/angular-cli/issues/22786) and when we change in
    // our `tsconfig.schematics.json` to `"module": "es2015"` (or higher).
    //
    // The workaround consists of:
    // - importing dynamically `@angular/compiler` via `loadEsmModule` function
    // - a wrapper function returning Promise<Rule>
    // - passing the resolved `angularCompiler` as an argument down to other helper functions
    return function (tree, context) { return __awaiter(_this, void 0, void 0, function () {
        var angularCompiler;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, load_esm_module_1.loadEsmModule)('@angular/compiler')];
                case 1:
                    angularCompiler = _a.sent();
                    return [2 /*return*/, function () {
                            return (0, component_deprecations_1.migrateComponentMigration)(tree, context, exports.COMPONENT_DEPRECATION_DATA, angularCompiler);
                        }];
            }
        });
    }); };
}
exports.migrate = migrate;
//# sourceMappingURL=component-deprecations.js.map