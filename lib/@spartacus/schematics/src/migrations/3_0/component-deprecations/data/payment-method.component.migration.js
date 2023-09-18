"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PAYMENT_METHOD_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
exports.PAYMENT_METHOD_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/checkout/components/payment-method/payment-method.component.ts
    selector: 'cx-payment-method',
    componentClassName: constants_1.PAYMENT_METHOD_COMPONENT,
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
            name: 'goNext',
            comment: "'goNext' method has been renamed to 'next'"
        },
        {
            name: 'goPrevious',
            comment: "'goPrevious' method has been renamed to 'back'"
        },
    ]
};
//# sourceMappingURL=payment-method.component.migration.js.map