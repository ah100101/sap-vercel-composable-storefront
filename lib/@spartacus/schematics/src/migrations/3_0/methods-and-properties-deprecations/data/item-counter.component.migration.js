"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ITEM_COUNTER_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/storefrontlib/shared/components/item-counter/item-counter.component.ts
exports.ITEM_COUNTER_COMPONENT_MIGRATION = [
    {
        "class": constants_1.ITEM_COUNTER_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_CONTROL,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_CONTROL, "' was removed from '").concat(constants_1.ITEM_COUNTER_COMPONENT, "'. Instead of returning an Observable in the method, it is being subscribed in the ngOnInit.")
    },
];
//# sourceMappingURL=item-counter.component.migration.js.map