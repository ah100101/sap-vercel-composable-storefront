"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORGANIZATION_ACCOUNT_SUMMARY_SCHEMATICS_CONFIG = exports.ACCOUNT_SUMMARY_TRANSLATION_CHUNKS_CONFIG = exports.ACCOUNT_SUMMARY_TRANSLATIONS = exports.ORGANIZATION_ACCOUNT_SUMMARY_FEATURE_NAME_CONSTANT = exports.ACCOUNT_SUMMARY_ROOT_MODULE = exports.ACCOUNT_SUMMARY_MODULE = exports.ORGANIZATION_ACCOUNT_SUMMARY_MODULE_NAME = exports.ORGANIZATION_UNIT_ORDER_SCHEMATICS_CONFIG = exports.ORGANIZATION_UNIT_ORDER_TRANSLATION_CHUNKS_CONFIG = exports.ORGANIZATION_UNIT_ORDER_TRANSLATIONS = exports.ORGANIZATION_UNIT_ORDER_FEATURE_NAME_CONSTANT = exports.ORGANIZATION_UNIT_ORDER_ROOT_MODULE = exports.ORGANIZATION_UNIT_ORDER_MODULE_NAME = exports.ORGANIZATION_UNIT_ORDER_MODULE = exports.ORGANIZATION_USER_REGISTRATION_SCHEMATICS_CONFIG = exports.ORGANIZATION_USER_REGISTRATION_TRANSLATION_CHUNKS_CONFIG = exports.ORGANIZATION_USER_REGISTRATION_TRANSLATIONS = exports.ORGANIZATION_USER_REGISTRATION_FEATURE_NAME_CONSTANT = exports.ORGANIZATION_USER_REGISTRATION_ROOT_MODULE = exports.ORGANIZATION_USER_REGISTRATION_MODULE_NAME = exports.ORGANIZATION_USER_REGISTRATION_MODULE = exports.ORGANIZATION_ORDER_APPROVAL_SCHEMATICS_CONFIG = exports.ORDER_APPROVAL_TRANSLATION_CHUNKS_CONFIG = exports.ORDER_APPROVAL_TRANSLATIONS = exports.ORGANIZATION_ORDER_APPROVAL_FEATURE_NAME_CONSTANT = exports.ORGANIZATION_ORDER_APPROVAL_MODULE_NAME = exports.ORDER_APPROVAL_ROOT_MODULE = exports.ORDER_APPROVAL_MODULE = exports.ORGANIZATION_ADMINISTRATION_SCHEMATICS_CONFIG = exports.ORGANIZATION_TRANSLATION_CHUNKS_CONFIG = exports.ORGANIZATION_TRANSLATIONS = exports.ORGANIZATION_ADMINISTRATION_FEATURE_NAME_CONSTANT = exports.ORGANIZATION_ADMINISTRATION_MODULE_NAME = exports.ADMINISTRATION_ROOT_MODULE = exports.ADMINISTRATION_MODULE = exports.ORGANIZATION_SCSS_FILE_NAME = exports.ORGANIZATION_FOLDER_NAME = void 0;
const libs_constants_1 = require("../libs-constants");
exports.ORGANIZATION_FOLDER_NAME = 'organization';
exports.ORGANIZATION_SCSS_FILE_NAME = 'organization.scss';
exports.ADMINISTRATION_MODULE = 'AdministrationModule';
exports.ADMINISTRATION_ROOT_MODULE = 'AdministrationRootModule';
exports.ORGANIZATION_ADMINISTRATION_MODULE_NAME = 'OrganizationAdministration';
exports.ORGANIZATION_ADMINISTRATION_FEATURE_NAME_CONSTANT = 'ORGANIZATION_ADMINISTRATION_FEATURE';
exports.ORGANIZATION_TRANSLATIONS = 'organizationTranslations';
exports.ORGANIZATION_TRANSLATION_CHUNKS_CONFIG = 'organizationTranslationChunksConfig';
exports.ORGANIZATION_ADMINISTRATION_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.ORGANIZATION_ADMINISTRATION_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_ORGANIZATION,
        featureScope: libs_constants_1.SPARTACUS_ADMINISTRATION,
        b2b: true,
    },
    folderName: exports.ORGANIZATION_FOLDER_NAME,
    moduleName: exports.ORGANIZATION_ADMINISTRATION_MODULE_NAME,
    featureModule: {
        name: exports.ADMINISTRATION_MODULE,
        importPath: libs_constants_1.SPARTACUS_ADMINISTRATION,
    },
    rootModule: {
        name: exports.ADMINISTRATION_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
        namedImports: [exports.ORGANIZATION_ADMINISTRATION_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.ORGANIZATION_TRANSLATIONS,
        chunks: exports.ORGANIZATION_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_ASSETS,
    },
    styles: {
        scssFileName: exports.ORGANIZATION_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_ORGANIZATION,
    },
    dependencyFeatures: [libs_constants_1.USER_PROFILE_FEATURE_NAME],
};
exports.ORDER_APPROVAL_MODULE = 'OrderApprovalModule';
exports.ORDER_APPROVAL_ROOT_MODULE = 'OrderApprovalRootModule';
exports.ORGANIZATION_ORDER_APPROVAL_MODULE_NAME = 'OrganizationOrderApproval';
exports.ORGANIZATION_ORDER_APPROVAL_FEATURE_NAME_CONSTANT = 'ORGANIZATION_ORDER_APPROVAL_FEATURE';
exports.ORDER_APPROVAL_TRANSLATIONS = 'orderApprovalTranslations';
exports.ORDER_APPROVAL_TRANSLATION_CHUNKS_CONFIG = 'orderApprovalTranslationChunksConfig';
exports.ORGANIZATION_ORDER_APPROVAL_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.ORGANIZATION_ORDER_APPROVAL_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_ORGANIZATION,
        featureScope: libs_constants_1.SPARTACUS_ORGANIZATION_ORDER_APPROVAL,
        b2b: true,
    },
    folderName: exports.ORGANIZATION_FOLDER_NAME,
    moduleName: exports.ORGANIZATION_ORDER_APPROVAL_MODULE_NAME,
    featureModule: {
        name: exports.ORDER_APPROVAL_MODULE,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ORDER_APPROVAL,
    },
    rootModule: {
        name: exports.ORDER_APPROVAL_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ORDER_APPROVAL_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_ORGANIZATION_ORDER_APPROVAL_ROOT,
        namedImports: [exports.ORGANIZATION_ORDER_APPROVAL_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.ORDER_APPROVAL_TRANSLATIONS,
        chunks: exports.ORDER_APPROVAL_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ORDER_APPROVAL_ASSETS,
    },
    styles: {
        scssFileName: exports.ORGANIZATION_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_ORGANIZATION,
    },
    dependencyFeatures: [libs_constants_1.USER_PROFILE_FEATURE_NAME, libs_constants_1.ORDER_FEATURE_NAME],
};
exports.ORGANIZATION_USER_REGISTRATION_MODULE = 'OrganizationUserRegistrationModule';
exports.ORGANIZATION_USER_REGISTRATION_MODULE_NAME = 'OrganizationUserRegistration';
exports.ORGANIZATION_USER_REGISTRATION_ROOT_MODULE = 'OrganizationUserRegistrationRootModule';
exports.ORGANIZATION_USER_REGISTRATION_FEATURE_NAME_CONSTANT = 'ORGANIZATION_USER_REGISTRATION_FEATURE';
exports.ORGANIZATION_USER_REGISTRATION_TRANSLATIONS = 'organizationUserRegistrationTranslations';
exports.ORGANIZATION_USER_REGISTRATION_TRANSLATION_CHUNKS_CONFIG = 'organizationUserRegistrationTranslationChunksConfig';
exports.ORGANIZATION_USER_REGISTRATION_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.ORGANIZATION_USER_REGISTRATION_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_ORGANIZATION,
        featureScope: libs_constants_1.SPARTACUS_ORGANIZATION_USER_REGISTRATION,
        b2b: true,
    },
    folderName: exports.ORGANIZATION_FOLDER_NAME,
    moduleName: exports.ORGANIZATION_USER_REGISTRATION_MODULE_NAME,
    featureModule: {
        name: exports.ORGANIZATION_USER_REGISTRATION_MODULE,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION_USER_REGISTRATION,
    },
    rootModule: {
        name: exports.ORGANIZATION_USER_REGISTRATION_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION_USER_REGISTRATION_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_ORGANIZATION_USER_REGISTRATION_ROOT,
        namedImports: [exports.ORGANIZATION_USER_REGISTRATION_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.ORGANIZATION_USER_REGISTRATION_TRANSLATIONS,
        chunks: exports.ORGANIZATION_USER_REGISTRATION_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION_USER_REGISTRATION_ASSETS,
    },
    styles: {
        scssFileName: exports.ORGANIZATION_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_ORGANIZATION,
    },
    dependencyFeatures: [libs_constants_1.USER_PROFILE_FEATURE_NAME],
};
exports.ORGANIZATION_UNIT_ORDER_MODULE = 'UnitOrderModule';
exports.ORGANIZATION_UNIT_ORDER_MODULE_NAME = 'OrganizationUnitOrder';
exports.ORGANIZATION_UNIT_ORDER_ROOT_MODULE = 'UnitOrderRootModule';
exports.ORGANIZATION_UNIT_ORDER_FEATURE_NAME_CONSTANT = 'ORGANIZATION_UNIT_ORDER_FEATURE';
exports.ORGANIZATION_UNIT_ORDER_TRANSLATIONS = 'unitOrderTranslations';
exports.ORGANIZATION_UNIT_ORDER_TRANSLATION_CHUNKS_CONFIG = 'unitOrderTranslationChunksConfig';
exports.ORGANIZATION_UNIT_ORDER_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.ORGANIZATION_UNIT_ORDER_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_ORGANIZATION,
        featureScope: libs_constants_1.SPARTACUS_ORGANIZATION_UNIT_ORDER,
        b2b: true,
    },
    folderName: exports.ORGANIZATION_FOLDER_NAME,
    moduleName: exports.ORGANIZATION_UNIT_ORDER_MODULE_NAME,
    featureModule: {
        name: exports.ORGANIZATION_UNIT_ORDER_MODULE,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION_UNIT_ORDER,
    },
    rootModule: {
        name: exports.ORGANIZATION_UNIT_ORDER_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION_UNIT_ORDER_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_ORGANIZATION_UNIT_ORDER_ROOT,
        namedImports: [exports.ORGANIZATION_UNIT_ORDER_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.ORGANIZATION_UNIT_ORDER_TRANSLATIONS,
        chunks: exports.ORGANIZATION_UNIT_ORDER_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION_UNIT_ORDER_ASSETS,
    },
    styles: {
        scssFileName: exports.ORGANIZATION_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_ORGANIZATION,
    },
    dependencyFeatures: [libs_constants_1.USER_PROFILE_FEATURE_NAME, libs_constants_1.ORDER_FEATURE_NAME],
};
exports.ORGANIZATION_ACCOUNT_SUMMARY_MODULE_NAME = 'organizationAccountSummary';
exports.ACCOUNT_SUMMARY_MODULE = 'AccountSummaryModule';
exports.ACCOUNT_SUMMARY_ROOT_MODULE = 'AccountSummaryRootModule';
exports.ORGANIZATION_ACCOUNT_SUMMARY_FEATURE_NAME_CONSTANT = 'ORGANIZATION_ACCOUNT_SUMMARY_FEATURE';
exports.ACCOUNT_SUMMARY_TRANSLATIONS = 'accountSummaryTranslations';
exports.ACCOUNT_SUMMARY_TRANSLATION_CHUNKS_CONFIG = 'accountSummaryTranslationChunksConfig';
exports.ORGANIZATION_ACCOUNT_SUMMARY_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.ORGANIZATION_ACCOUNT_SUMMARY_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_ORGANIZATION,
        featureScope: libs_constants_1.SPARTACUS_ORGANIZATION_ACCOUNT_SUMMARY,
        b2b: true,
    },
    folderName: exports.ORGANIZATION_FOLDER_NAME,
    moduleName: exports.ORGANIZATION_ACCOUNT_SUMMARY_MODULE_NAME,
    featureModule: {
        name: exports.ACCOUNT_SUMMARY_MODULE,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ACCOUNT_SUMMARY,
    },
    rootModule: {
        name: exports.ACCOUNT_SUMMARY_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ACCOUNT_SUMMARY_ROOT,
    },
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_ORGANIZATION_ACCOUNT_SUMMARY_ROOT,
        namedImports: [exports.ORGANIZATION_ACCOUNT_SUMMARY_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.ACCOUNT_SUMMARY_TRANSLATIONS,
        chunks: exports.ACCOUNT_SUMMARY_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ACCOUNT_SUMMARY_ASSETS,
    },
    styles: {
        scssFileName: exports.ORGANIZATION_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_ORGANIZATION,
    },
    dependencyFeatures: [libs_constants_1.ORGANIZATION_ADMINISTRATION_FEATURE_NAME],
};
//# sourceMappingURL=organization-schematics-config.js.map