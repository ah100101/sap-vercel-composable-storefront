"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.SAVED_CART_EVENT_BUILDER_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// feature-libs/cart/saved-cart/core/events/saved-cart-event.builder.ts
exports.SAVED_CART_EVENT_BUILDER_MIGRATION = [
    {
        "class": constants_1.SAVED_CART_EVENT_BUILDER,
        importPath: libs_constants_1.SPARTACUS_CART_SAVED_CART_CORE,
        deprecatedNode: constants_1.REGISTER_DELETE_SAVED_CART_EVENTS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.REGISTER_DELETE_SAVED_CART_EVENTS, "' was moved to '").concat(constants_1.CART_EVENT_BUILDER, "', and was renamed to '").concat(constants_1.REGISTER_DELETE_CART, "''.")
    },
];
//# sourceMappingURL=saved-cart-event.builder.migration.js.map