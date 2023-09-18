"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
exports.CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/checkout/components/checkout-progress/checkout-progress-mobile-top/checkout-progress-mobile-top.component.ts
    selector: 'cx-checkout-progress-mobile-top',
    componentClassName: constants_1.CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT,
    removedProperties: [
        {
            name: 'routerState$',
            comment: "'routerState$' property has been removed."
        },
        {
            name: 'activeStepUrl',
            comment: "'activeStepUrl' property has been removed."
        },
        {
            name: 'steps',
            comment: "'steps' property has been removed. Use '$steps' observable instead"
        },
    ]
};
//# sourceMappingURL=checkout-progress-mobile-top.component.migration.js.map