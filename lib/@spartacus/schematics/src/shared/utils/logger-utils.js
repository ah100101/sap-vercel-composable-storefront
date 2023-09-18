"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFeatureComplete = exports.formatFeatureStart = exports.debugLogRule = void 0;
/**
 * Logs the provided message if the debug option is set to true.
 */
function debugLogRule(message, debug) {
    return (_tree, context) => {
        if (debug) {
            context.logger.info(message);
        }
    };
}
exports.debugLogRule = debugLogRule;
/**
 * Formats the given message.
 */
function formatFeatureStart(feature, message) {
    return `⌛️ ${feature}: ${message}`;
}
exports.formatFeatureStart = formatFeatureStart;
/**
 * Formats the given message.
 */
function formatFeatureComplete(feature, message) {
    return `✅ ${feature}: ${message}`;
}
exports.formatFeatureComplete = formatFeatureComplete;
//# sourceMappingURL=logger-utils.js.map