"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CHECKOUT_RENAMED_SYMBOLS_DATA = void 0;
var libs_constants_1 = require("../../../shared/libs-constants");
exports.CHECKOUT_RENAMED_SYMBOLS_DATA = [
    // core-libs/setup/recipes/b2b/config/default-b2b-checkout-config.ts
    {
        previousImportPath: libs_constants_1.SPARTACUS_SETUP,
        previousNode: "defaultB2bCheckoutConfig",
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_B2B_ROOT
    },
    // core-libs/setup/recipes/b2b/config/default-b2b-occ-config.ts
    {
        previousImportPath: libs_constants_1.SPARTACUS_SETUP,
        previousNode: "defaultB2bOccConfig",
        newImportPath: libs_constants_1.SPARTACUS_CHECKOUT_B2B_ROOT
    },
];
//# sourceMappingURL=checkout-rename-symbol.js.map