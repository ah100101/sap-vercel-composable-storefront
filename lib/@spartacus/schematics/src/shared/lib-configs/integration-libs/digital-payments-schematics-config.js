"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIGITAL_PAYMENTS_SCHEMATICS_CONFIG = exports.DIGITAL_PAYMENTS_TRANSLATION_CHUNKS_CONFIG = exports.DIGITAL_PAYMENTS_TRANSLATIONS = exports.DIGITAL_PAYMENTS_MODULE = exports.DIGITAL_PAYMENTS_MODULE_NAME = exports.DIGITAL_PAYMENTS_FOLDER_NAME = void 0;
const libs_constants_1 = require("../../libs-constants");
const checkout_schematics_config_1 = require("../checkout-schematics-config");
exports.DIGITAL_PAYMENTS_FOLDER_NAME = 'digital-payments';
exports.DIGITAL_PAYMENTS_MODULE_NAME = 'DigitalPayments';
exports.DIGITAL_PAYMENTS_MODULE = 'DigitalPaymentsModule';
exports.DIGITAL_PAYMENTS_TRANSLATIONS = 'dpTranslations';
exports.DIGITAL_PAYMENTS_TRANSLATION_CHUNKS_CONFIG = 'dpTranslationChunksConfig';
exports.DIGITAL_PAYMENTS_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.DIGITAL_PAYMENTS_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_DIGITAL_PAYMENTS,
    },
    folderName: exports.DIGITAL_PAYMENTS_FOLDER_NAME,
    moduleName: exports.DIGITAL_PAYMENTS_MODULE_NAME,
    featureModule: {
        name: exports.DIGITAL_PAYMENTS_MODULE,
        importPath: libs_constants_1.SPARTACUS_DIGITAL_PAYMENTS,
    },
    i18n: {
        resources: exports.DIGITAL_PAYMENTS_TRANSLATIONS,
        chunks: exports.DIGITAL_PAYMENTS_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_DIGITAL_PAYMENTS_ASSETS,
    },
    dependencyFeatures: [libs_constants_1.CHECKOUT_BASE_FEATURE_NAME],
    importAfter: [
        {
            markerModuleName: checkout_schematics_config_1.CHECKOUT_BASE_MODULE,
            featureModuleName: exports.DIGITAL_PAYMENTS_MODULE,
        },
    ],
};
//# sourceMappingURL=digital-payments-schematics-config.js.map