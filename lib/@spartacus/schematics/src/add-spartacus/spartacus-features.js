"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.setupSpartacusFeaturesModule = void 0;
var schematics_1 = require("@angular-devkit/schematics");
var libs_constants_1 = require("../shared/libs-constants");
var new_module_utils_1 = require("../shared/utils/new-module-utils");
var program_1 = require("../shared/utils/program");
var project_tsconfig_paths_1 = require("../shared/utils/project-tsconfig-paths");
/** Migration which ensures the spartacus features are being correctly set up */
function setupSpartacusFeaturesModule(options) {
    return function (tree, context) {
        if (options.debug) {
            context.logger.info("\u231B\uFE0F Setting up Spartacus features module...");
        }
        var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, options.project).buildPaths;
        if (!buildPaths.length) {
            throw new schematics_1.SchematicsException("Could not find any tsconfig file. Cannot configure ".concat(libs_constants_1.SPARTACUS_FEATURES_NG_MODULE, "."));
        }
        var basePath = process.cwd();
        for (var _i = 0, buildPaths_1 = buildPaths; _i < buildPaths_1.length; _i++) {
            var tsconfigPath = buildPaths_1[_i];
            configureSpartacusModules(tree, tsconfigPath, basePath);
        }
        if (options.debug) {
            context.logger.info("\u2705 Spartacus features module setup complete.");
        }
        return tree;
    };
}
exports.setupSpartacusFeaturesModule = setupSpartacusFeaturesModule;
function configureSpartacusModules(tree, tsconfigPath, basePath) {
    var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
    var _loop_1 = function (sourceFile) {
        if (sourceFile
            .getFilePath()
            .includes("".concat(libs_constants_1.SPARTACUS_FEATURES_MODULE, ".module.ts"))) {
            ['AuthModule.forRoot(),', 'LogoutModule,', 'LoginRouteModule,'].forEach(function (content) {
                (0, new_module_utils_1.addModuleImport)(sourceFile, {
                    "import": [
                        {
                            moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                            namedImports: ['AuthModule']
                        },
                        {
                            moduleSpecifier: libs_constants_1.SPARTACUS_STOREFRONTLIB,
                            namedImports: ['LogoutModule', 'LoginRouteModule']
                        },
                    ],
                    content: content
                });
            });
            [
                'HamburgerMenuModule,',
                'SiteContextSelectorModule,',
                'LinkModule,',
                'BannerModule,',
                'CmsParagraphModule,',
                'TabParagraphContainerModule,',
                'BannerCarouselModule,',
                'CategoryNavigationModule,',
                'NavigationModule,',
                'FooterNavigationModule,',
                'BreadcrumbModule,',
                'ScrollToTopModule,',
                'PageTitleModule',
            ].forEach(function (content) {
                (0, new_module_utils_1.addModuleImport)(sourceFile, {
                    "import": [
                        {
                            moduleSpecifier: libs_constants_1.SPARTACUS_STOREFRONTLIB,
                            namedImports: [
                                'HamburgerMenuModule',
                                'SiteContextSelectorModule',
                                'LinkModule',
                                'BannerModule',
                                'CmsParagraphModule',
                                'TabParagraphContainerModule',
                                'BannerCarouselModule',
                                'CategoryNavigationModule',
                                'FooterNavigationModule',
                                'NavigationModule',
                                'BreadcrumbModule',
                                'ScrollToTopModule',
                                'PageTitleModule',
                            ]
                        },
                    ],
                    content: content
                });
            });
            [
                'UserModule,',
                'UserOccModule,',
                'AddressBookModule,',
                'PaymentMethodsModule,',
                'NotificationPreferenceModule,',
                'MyInterestsModule,',
                'StockNotificationModule,',
                'ConsentManagementModule,',
                'MyCouponsModule,',
            ].forEach(function (content) {
                (0, new_module_utils_1.addModuleImport)(sourceFile, {
                    "import": [
                        {
                            moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                            namedImports: ['UserModule', 'UserOccModule']
                        },
                        {
                            moduleSpecifier: libs_constants_1.SPARTACUS_STOREFRONTLIB,
                            namedImports: [
                                'AddressBookModule',
                                'PaymentMethodsModule',
                                'NotificationPreferenceModule',
                                'MyInterestsModule',
                                'StockNotificationModule',
                                'ConsentManagementModule',
                                'MyCouponsModule',
                            ]
                        },
                    ],
                    content: content
                });
            });
            [
                'AnonymousConsentsModule.forRoot(),',
                'AnonymousConsentsDialogModule,',
                'AnonymousConsentManagementBannerModule,',
            ].forEach(function (content) {
                (0, new_module_utils_1.addModuleImport)(sourceFile, {
                    "import": [
                        {
                            moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                            namedImports: ['AnonymousConsentsModule']
                        },
                        {
                            moduleSpecifier: libs_constants_1.SPARTACUS_STOREFRONTLIB,
                            namedImports: [
                                'AnonymousConsentManagementBannerModule',
                                'AnonymousConsentsDialogModule',
                            ]
                        },
                    ],
                    content: content
                });
            });
            [
                'ProductModule.forRoot(),',
                'ProductOccModule,',
                'ProductDetailsPageModule,',
                'ProductListingPageModule,',
                'ProductListModule,',
                'SearchBoxModule,',
                'ProductFacetNavigationModule,',
                'ProductTabsModule,',
                'ProductCarouselModule,',
                'ProductReferencesModule,',
                'ProductImagesModule,',
                'ProductSummaryModule,',
                'ProductIntroModule,',
            ].forEach(function (content) {
                (0, new_module_utils_1.addModuleImport)(sourceFile, {
                    "import": [
                        {
                            moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                            namedImports: ['ProductModule', 'ProductOccModule']
                        },
                        {
                            moduleSpecifier: libs_constants_1.SPARTACUS_STOREFRONTLIB,
                            namedImports: [
                                'ProductCarouselModule',
                                'ProductDetailsPageModule',
                                'ProductFacetNavigationModule',
                                'ProductImagesModule',
                                'ProductIntroModule',
                                'ProductListingPageModule',
                                'ProductListModule',
                                'ProductPageEventModule',
                                'ProductReferencesModule',
                                'ProductSummaryModule',
                                'ProductTabsModule',
                                'SearchBoxModule',
                            ]
                        },
                    ],
                    content: content
                });
            });
            ['CostCenterOccModule,'].forEach(function (content) {
                (0, new_module_utils_1.addModuleImport)(sourceFile, {
                    "import": [
                        {
                            moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                            namedImports: ['CostCenterOccModule']
                        },
                    ],
                    content: content
                });
            });
            [
                'NavigationEventModule,',
                'HomePageEventModule,',
                'ProductPageEventModule,',
            ].forEach(function (content) {
                (0, new_module_utils_1.addModuleImport)(sourceFile, {
                    "import": [
                        {
                            moduleSpecifier: libs_constants_1.SPARTACUS_STOREFRONTLIB,
                            namedImports: [
                                'NavigationEventModule',
                                'HomePageEventModule',
                                'ProductPageEventModule',
                            ]
                        },
                    ],
                    content: content
                });
            });
            ['ExternalRoutesModule.forRoot()'].forEach(function (content) {
                (0, new_module_utils_1.addModuleImport)(sourceFile, {
                    "import": [
                        {
                            moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                            namedImports: ['ExternalRoutesModule']
                        },
                    ],
                    content: content
                });
            });
            (0, program_1.saveAndFormat)(sourceFile);
            return "break";
        }
    };
    for (var _i = 0, appSourceFiles_1 = appSourceFiles; _i < appSourceFiles_1.length; _i++) {
        var sourceFile = appSourceFiles_1[_i];
        var state_1 = _loop_1(sourceFile);
        if (state_1 === "break")
            break;
    }
}
//# sourceMappingURL=spartacus-features.js.map