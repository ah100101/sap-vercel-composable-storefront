"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = void 0;
var missing_packages_1 = require("../../mechanism/missing-packages/missing-packages");
var MISSING_PACKAGE_DATA = [
    {
        package: '@spartacus/checkout',
        comment: "We've found imports from @spartacus/checkout package which is not installed. If you are using the checkout feature you can configure it by running schematics `ng add @spartacus/checkout`. If you only need to install package add it with npm (`npm i @spartacus/checkout`) or yarn (`yarn add @spartacus/checkout`). If you are not using checkout package check why you have imports from this library."
    },
    {
        package: '@spartacus/asm',
        comment: "We've found imports from @spartacus/asm package which is not installed. If you are using the ASM feature you can configure it by running schematics `ng add @spartacus/asm`. If you only need to install package add it with npm (`npm i @spartacus/asm`) or yarn (`yarn add @spartacus/asm`). If you are not using ASM package check why you have imports from this library."
    },
    {
        package: '@spartacus/user',
        comment: "We've found imports from @spartacus/user package which is not installed. If you are using the user features (account/profile) you can configure it by running schematics `ng add @spartacus/user`. If you only need to install package add it with npm (`npm i @spartacus/user`) or yarn (`yarn add @spartacus/user`). If you are not using user package check why you have imports from this library."
    },
    {
        package: '@spartacus/tracking',
        comment: "We've found imports from @spartacus/tracking package which is not installed. If you are using the tracking features (personalization, tag managers integration) you can configure it by running schematics `ng add @spartacus/tracking`. If you only need to install package add it with npm (`npm i @spartacus/tracking`) or yarn (`yarn add @spartacus/tracking`). If you are not using tracking package check why you have imports from this library."
    },
    {
        package: '@spartacus/smartedit',
        comment: "We've found imports from @spartacus/smartedit package which is not installed. If you are using the Smartedit feature you can configure it by running schematics `ng add @spartacus/smartedit`. If you only need to install package add it with npm (`npm i @spartacus/smartedit`) or yarn (`yarn add @spartacus/smartedit`). If you are not using Smartedit package check why you have imports from this library."
    },
    {
        package: '@spartacus/qualtrics',
        comment: "We've found imports from @spartacus/qualtrics package which is not installed. If you are using the Qualtrics feature you can configure it by running schematics `ng add @spartacus/qualtrics`. If you only need to install package add it with npm (`npm i @spartacus/qualtrics`) or yarn (`yarn add @spartacus/qualtrics`). If you are not using Qualtrics package check why you have imports from this library."
    },
];
function migrate() {
    return function (tree, context) {
        for (var _i = 0, MISSING_PACKAGE_DATA_1 = MISSING_PACKAGE_DATA; _i < MISSING_PACKAGE_DATA_1.length; _i++) {
            var migrationData = MISSING_PACKAGE_DATA_1[_i];
            (0, missing_packages_1.migrateMissingPackage)(tree, context, migrationData);
        }
    };
}
exports.migrate = migrate;
//# sourceMappingURL=missing-packages.js.map