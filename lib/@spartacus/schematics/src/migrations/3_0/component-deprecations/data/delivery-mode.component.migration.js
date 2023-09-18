"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.DELIVERY_MODE_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
exports.DELIVERY_MODE_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/checkout/components/delivery-mode/delivery-mode.component.ts
    selector: 'cx-delivery-mode',
    componentClassName: constants_1.DELIVERY_MODE_COMPONENT,
    removedProperties: [
        {
            name: 'checkoutStepUrlNext',
            comment: "'checkoutStepUrlNext' property has been removed."
        },
        {
            name: 'checkoutStepUrlPrevious',
            comment: "'checkoutStepUrlPrevious' property has been removed."
        },
        {
            name: 'currentDeliveryModeId',
            comment: "'currentDeliveryModeId' property has been removed. The current delivery mode selection is stored in the form called \"mode\" in the \"deliveryModeId\" input field."
        },
    ]
};
//# sourceMappingURL=delivery-mode.component.migration.js.map