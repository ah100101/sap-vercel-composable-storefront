"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.SHIPPING_ADDRESS_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
exports.SHIPPING_ADDRESS_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/checkout/components/shipping-address/shipping-address.component.ts
    selector: 'cx-shipping-address',
    componentClassName: constants_1.SHIPPING_ADDRESS_COMPONENT,
    removedProperties: [
        {
            name: 'existingAddresses$',
            comment: "'existingAddresses$' property has been removed."
        },
        {
            name: 'newAddressFormManuallyOpened',
            comment: "'newAddressFormManuallyOpened' property has been renamed to 'addressFormOpened'"
        },
        {
            name: 'goNext',
            comment: "'goNext' method has been renamed to 'next'"
        },
        {
            name: 'goPrevious',
            comment: "'goPrevious' method has been renamed to 'back'"
        },
    ]
};
//# sourceMappingURL=shipping-address.component.migration.js.map