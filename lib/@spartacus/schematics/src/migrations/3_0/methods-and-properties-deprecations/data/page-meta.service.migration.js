"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PAGE_META_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/cms/facade/page-meta.service.ts
exports.PAGE_META_SERVICE_MIGRATION = [
    {
        "class": constants_1.PAGE_META_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GET_META,
        newNode: constants_1.GET_META,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method ").concat(constants_1.GET_META, " return type has been changed from 'Observable<PageMeta>' to 'Observable<PageMeta | null>'.")
    },
    {
        "class": constants_1.PAGE_META_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GET_META_RESOLVER,
        newNode: constants_1.GET_META_RESOLVER,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method ").concat(constants_1.GET_META_RESOLVER, " return type has been changed from 'PageMetaResolver' to 'Observable<PageMetaResolver>'.")
    },
];
//# sourceMappingURL=page-meta.service.migration.js.map