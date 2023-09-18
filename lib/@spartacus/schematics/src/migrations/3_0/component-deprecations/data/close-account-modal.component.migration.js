"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CLOSE_ACCOUNT_MODAL_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
exports.CLOSE_ACCOUNT_MODAL_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/myaccount/close-account/components/close-account-modal/close-account-modal.component.ts
    selector: 'cx-close-account-modal',
    componentClassName: constants_1.CLOSE_ACCOUNT_MODAL_COMPONENT,
    removedProperties: [
        {
            name: 'userToken$',
            comment: "'userToken$' property has been replaced with isLoggedIn$ Observable."
        },
    ]
};
//# sourceMappingURL=close-account-modal.component.migration.js.map