"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ADD_TO_CART_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
exports.ADD_TO_CART_COMPONENT_MIGRATION = {
    selector: 'cx-add-to-cart',
    componentClassName: constants_1.ADD_TO_CART_COMPONENT,
    removedProperties: [
        {
            name: 'increment',
            comment: "'increment' property was removed. Use new 'numberOfEntriesBeforeAdd' instead."
        },
        {
            name: 'cartEntry$',
            comment: "'cartEntry$' property was removed. Use 'activeCartService.getLastEntry(productCode)' instead."
        },
    ]
};
//# sourceMappingURL=added-to-cart-dialog.component.migration.js.map