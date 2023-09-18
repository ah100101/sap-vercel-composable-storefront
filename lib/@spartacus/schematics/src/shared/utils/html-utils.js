"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.appendHtmlElementToHead = void 0;
var schematics_1 = require("@angular-devkit/schematics");
var parse5_1 = require("parse5");
/*
 * Copyright Google LLC All Rights Reserved.
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/** Appends the given element HTML fragment to the `<head>` element of the specified HTML file. */
function appendHtmlElementToHead(host, htmlFilePath, elementHtml) {
    var htmlFileBuffer = host.read(htmlFilePath);
    if (!htmlFileBuffer) {
        throw new schematics_1.SchematicsException("Could not read file for path: ".concat(htmlFilePath));
    }
    var htmlContent = htmlFileBuffer.toString();
    if (htmlContent.includes(elementHtml)) {
        return;
    }
    var headTag = getHtmlHeadTagElement(htmlContent);
    if (!headTag) {
        throw Error("Could not find '<head>' element in HTML file: ".concat(htmlFileBuffer));
    }
    // We always have access to the source code location here because the `getHeadTagElement`
    // function explicitly has the `sourceCodeLocationInfo` option enabled.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    var endTagOffset = headTag.sourceCodeLocation.endTag.startOffset;
    var indentationOffset = getChildElementIndentation(headTag);
    var insertion = "".concat(' '.repeat(indentationOffset)).concat(elementHtml);
    var recordedChange = host
        .beginUpdate(htmlFilePath)
        .insertRight(endTagOffset, "".concat(insertion, "\n"));
    host.commitUpdate(recordedChange);
}
exports.appendHtmlElementToHead = appendHtmlElementToHead;
/** Parses the given HTML file and returns the head element if available. */
function getHtmlHeadTagElement(htmlContent) {
    return getElementByTagName('head', htmlContent);
}
/** Finds an element by its tag name. */
function getElementByTagName(tagName, htmlContent) {
    var document = (0, parse5_1.parse)(htmlContent, {
        sourceCodeLocationInfo: true
    });
    var nodeQueue = __spreadArray([], document.childNodes, true);
    while (nodeQueue.length) {
        var node = nodeQueue.shift();
        if (node.nodeName.toLowerCase() === tagName) {
            return node;
        }
        else if (node.childNodes) {
            nodeQueue.push.apply(nodeQueue, node.childNodes);
        }
    }
    return null;
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * See https://github.com/angular/components/blob/master/src/cdk/schematics/utils/parse5-element.ts
 */
/** Determines the indentation of child elements for the given Parse5 element. */
function getChildElementIndentation(element) {
    var childElement = element.childNodes.find(function (node) {
        return !!node.tagName;
    });
    if ((childElement && !childElement.sourceCodeLocation) ||
        !element.sourceCodeLocation) {
        throw new schematics_1.SchematicsException('Cannot determine child element indentation because the ' +
            'specified Parse5 element does not have any source code location metadata.');
    }
    var startColumns = childElement
        ? // In case there are child elements inside of the element, we assume that their
            // indentation is also applicable for other child elements.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            childElement.sourceCodeLocation.startCol
        : // In case there is no child element, we just assume that child elements should be indented
            // by two spaces.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            element.sourceCodeLocation.startCol + 2;
    // Since Parse5 does not set the `startCol` properties as zero-based, we need to subtract
    // one column in order to have a proper zero-based offset for the indentation.
    return startColumns - 1;
}
//# sourceMappingURL=html-utils.js.map