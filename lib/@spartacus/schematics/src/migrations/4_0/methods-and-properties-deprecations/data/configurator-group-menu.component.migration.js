"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_GROUP_MENU_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
//feature-libs/product-configurator/rulebased/components/group-menu/configurator-group-menu.component.ts
exports.CONFIGURATOR_GROUP_MENU_COMPONENT_MIGRATION = [
    {
        "class": constants_1.CONFIGURATOR_GROUP_MENU_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.PREVENT_SCROLLING_ON_SPACE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.PREVENT_SCROLLING_ON_SPACE, "' was removed from '").concat(constants_1.CONFIGURATOR_GROUP_MENU_COMPONENT, "'. It is no longer used.")
    },
    {
        "class": constants_1.CONFIGURATOR_GROUP_MENU_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.CLICK_ON_ENTER,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.CLICK_ON_ENTER, "' was removed from '").concat(constants_1.CONFIGURATOR_GROUP_MENU_COMPONENT, "'. It is no longer used.")
    },
    {
        "class": constants_1.CONFIGURATOR_GROUP_MENU_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.NAVIGATE_UP_ON_ENTER,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.NAVIGATE_UP_ON_ENTER, "' was removed from '").concat(constants_1.CONFIGURATOR_GROUP_MENU_COMPONENT, "'. It is no longer used.")
    },
];
//# sourceMappingURL=configurator-group-menu.component.migration.js.map