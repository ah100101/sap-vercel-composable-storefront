"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.STAR_RATING_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
// projects/storefrontlib/shared/components/star-rating/star-rating.component.ts
exports.STAR_RATING_COMPONENT_MIGRATION = {
    selector: 'cx-star-rating',
    componentClassName: constants_1.STAR_RATING_COMPONENT,
    removedProperties: [
        {
            name: constants_1.SET_RATE_ON_EVENT,
            comment: "'".concat(constants_1.SET_RATE_ON_EVENT, "' method was removed. The '").concat(constants_1.SET_RATE, "' method should be used instead")
        },
    ]
};
//# sourceMappingURL=star-rating.component.migration.js.map