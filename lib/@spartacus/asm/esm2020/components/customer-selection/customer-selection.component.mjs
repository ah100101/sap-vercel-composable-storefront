/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Output, ViewChild, ViewChildren, } from '@angular/core';
import { Validators, } from '@angular/forms';
import { DirectionMode } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@spartacus/asm/core";
import * as i3 from "@spartacus/asm/root";
import * as i4 from "@spartacus/storefront";
import * as i5 from "@angular/common";
import * as i6 from "../dot-spinner/dot-spinner.component";
import * as i7 from "@spartacus/core";
export class CustomerSelectionComponent {
    constructor(fb, asmService, config, directionService) {
        this.fb = fb;
        this.asmService = asmService;
        this.config = config;
        this.directionService = directionService;
        this.subscription = new Subscription();
        this.submitEvent = new EventEmitter();
        this.activeFocusedButtonIndex = -1;
    }
    ngOnInit() {
        this.customerSelectionForm = this.fb.group({
            searchTerm: ['', Validators.required],
        });
        this.asmService.customerSearchReset();
        this.searchResultsLoading$ =
            this.asmService.getCustomerSearchResultsLoading();
        this.searchResults = this.asmService.getCustomerSearchResults();
        this.subscription.add(this.customerSelectionForm.controls.searchTerm.valueChanges
            .pipe(debounceTime(300))
            .subscribe((searchTermValue) => {
            this.handleSearchTerm(searchTermValue);
        }));
    }
    handleSearchTerm(searchTermValue) {
        if (!!this.selectedCustomer &&
            searchTermValue !== this.selectedCustomer.name) {
            this.selectedCustomer = undefined;
        }
        if (Boolean(this.selectedCustomer)) {
            return;
        }
        this.asmService.customerSearchReset();
        this.activeFocusedButtonIndex = -1;
        if (searchTermValue.trim().length >= 3) {
            this.asmService.customerSearch({
                query: searchTermValue,
                pageSize: this.config.asm?.customerSearch?.maxResults,
            });
        }
    }
    selectCustomerFromList(event, customer) {
        this.selectedCustomer = customer;
        this.customerSelectionForm.controls.searchTerm.setValue(this.selectedCustomer.name);
        this.asmService.customerSearchReset();
        this.searchTerm.nativeElement.focus();
        event.preventDefault();
        event.stopPropagation();
    }
    onSubmit() {
        if (this.customerSelectionForm.valid && !!this.selectedCustomer) {
            this.submitEvent.emit({ customerId: this.selectedCustomer.customerId });
        }
        else {
            this.customerSelectionForm.markAllAsTouched();
        }
    }
    onDocumentClick(event) {
        if (Boolean(this.resultList)) {
            if (this.resultList.nativeElement.contains(event.target) ||
                this.searchTerm.nativeElement.contains(event.target)) {
                return;
            }
            else {
                this.asmService.customerSearchReset();
            }
        }
    }
    closeResults(event) {
        this.asmService.customerSearchReset();
        this.searchTerm.nativeElement.focus();
        event.preventDefault();
        event.stopPropagation();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.asmService.customerSearchReset();
    }
    /**
     * set focus to the first searched item
     * @param event keyboard event
     */
    focusFirstItem(event) {
        event.preventDefault();
        this.activeFocusedButtonIndex = 0;
        this.updateItemIndex(this.activeFocusedButtonIndex);
    }
    /**
     * set mouse cursor to the end of search text
     * @param event keyboard event
     */
    setSelectionEnd(event) {
        event.preventDefault();
        if (this.searchTerm.nativeElement.value?.length) {
            const selectionStart = this.searchTerm.nativeElement.value.length;
            this.searchTerm.nativeElement.selectionStart = selectionStart;
            this.searchTerm.nativeElement.selectionEnd = selectionStart;
        }
    }
    /**
     * set focus on previous searh result item.  If no previous item then go to end of item.
     * @param event keyboard event
     */
    focusPreviousChild(event) {
        event.preventDefault();
        this.activeFocusedButtonIndex--;
        if (this.activeFocusedButtonIndex < 0) {
            this.activeFocusedButtonIndex = this.searchResultItems.length - 1;
        }
        this.updateItemIndex(this.activeFocusedButtonIndex);
    }
    /**
     * set focus on next searh result item.  if no next item then go to the first item
     * @param event keyboard event
     */
    focusNextChild(event) {
        event.preventDefault();
        this.activeFocusedButtonIndex++;
        if (this.activeFocusedButtonIndex > this.searchResultItems.length - 1) {
            this.activeFocusedButtonIndex = 0;
        }
        this.updateItemIndex(this.activeFocusedButtonIndex);
    }
    /**
     * set focus to input search text
     * @param event keyboard event
     */
    focusInputText(event) {
        event.preventDefault();
        this.activeFocusedButtonIndex = -1;
        this.searchTerm.nativeElement.focus();
        if (this.searchTerm.nativeElement.value?.length) {
            let selectionPos = this.searchTerm.nativeElement.selectionEnd;
            const searchTermLength = this.searchTerm.nativeElement.value.length;
            if (this.isBackNavigation(event)) {
                selectionPos = selectionPos <= 0 ? 0 : selectionPos - 1;
            }
            else if (this.isForwardsNavigation(event)) {
                selectionPos =
                    selectionPos >= searchTermLength
                        ? searchTermLength
                        : selectionPos + 1;
            }
            else if (event.code === 'Home') {
                selectionPos = 0;
            }
            else if (event.code === 'End') {
                selectionPos = searchTermLength;
            }
            this.searchTerm.nativeElement.selectionStart = selectionPos;
            this.searchTerm.nativeElement.selectionEnd = selectionPos;
        }
    }
    /**
     * set focus to selected item
     * @param {number} selectedIndex - current selected item index
     */
    updateItemIndex(selectedIndex) {
        this.searchResultItems.toArray()?.[selectedIndex]?.nativeElement.focus();
    }
    /**
     * Verifies whether the user navigates into a subgroup of the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates into the subgroup, otherwise 'false'.
     * @protected
     */
    isForwardsNavigation(event) {
        return ((event.code === 'ArrowRight' && this.isLTRDirection()) ||
            (event.code === 'ArrowLeft' && this.isRTLDirection()));
    }
    /**
     * Verifies whether the user navigates from a subgroup back to the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
     * @protected
     */
    isBackNavigation(event) {
        return ((event.code === 'ArrowLeft' && this.isLTRDirection()) ||
            (event.code === 'ArrowRight' && this.isRTLDirection()));
    }
    isLTRDirection() {
        return this.directionService.getDirection() === DirectionMode.LTR;
    }
    isRTLDirection() {
        return this.directionService.getDirection() === DirectionMode.RTL;
    }
}
CustomerSelectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CustomerSelectionComponent, deps: [{ token: i1.UntypedFormBuilder }, { token: i2.AsmService }, { token: i3.AsmConfig }, { token: i4.DirectionService }], target: i0.ɵɵFactoryTarget.Component });
CustomerSelectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: CustomerSelectionComponent, selector: "cx-customer-selection", outputs: { submitEvent: "submitEvent" }, host: { listeners: { "document:click": "onDocumentClick($event)" } }, viewQueries: [{ propertyName: "resultList", first: true, predicate: ["resultList"], descendants: true }, { propertyName: "searchTerm", first: true, predicate: ["searchTerm"], descendants: true }, { propertyName: "searchResultItems", predicate: ["searchResultItem"], descendants: true }], ngImport: i0, template: "<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"customerSelectionForm\">\n  <label>\n    <input\n      required=\"true\"\n      #searchTerm\n      type=\"text\"\n      formControlName=\"searchTerm\"\n      [attr.aria-label]=\"'asm.customerSearch.searchTerm.label' | cxTranslate\"\n      placeholder=\"{{ 'asm.customerSearch.searchTerm.label' | cxTranslate }}\"\n      (keydown.arrowdown)=\"focusFirstItem($event)\"\n      (keydown.end)=\"setSelectionEnd($event)\"\n    />\n    <cx-form-errors\n      [control]=\"customerSelectionForm.get('searchTerm')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\" [class.active]=\"selectedCustomer\">\n    {{ 'asm.customerSearch.submit' | cxTranslate }}\n  </button>\n</form>\n\n<div *ngIf=\"searchResults | async as results\" class=\"asm-results\" #resultList>\n  <button\n    #searchResultItem\n    *ngFor=\"let result of results.entries; let i = index\"\n    [tabindex]=\"activeFocusedButtonIndex === i ? 0 : -1\"\n    [attr.aria-selected]=\"activeFocusedButtonIndex === i\"\n    [class.active]=\"activeFocusedButtonIndex === i\"\n    (keydown.arrowup)=\"focusPreviousChild($event)\"\n    (keydown.arrowdown)=\"focusNextChild($event)\"\n    (keydown.arrowright)=\"focusInputText($event)\"\n    (keydown.arrowleft)=\"focusInputText($event)\"\n    (keydown.enter)=\"selectCustomerFromList($event, result)\"\n    (keydown.escape)=\"closeResults($event)\"\n    (keydown.home)=\"focusInputText($event)\"\n    (keydown.end)=\"focusInputText($event)\"\n    (click)=\"selectCustomerFromList($event, result)\"\n  >\n    <span class=\"result-name\">{{ result.name }}</span>\n    <span class=\"result-id\">{{ result.uid }}</span>\n  </button>\n  <button\n    #searchResultItem\n    (click)=\"closeResults($event)\"\n    (keydown.enter)=\"closeResults($event)\"\n    (keydown.escape)=\"closeResults($event)\"\n    (keydown.arrowright)=\"focusInputText($event)\"\n    (keydown.arrowleft)=\"focusInputText($event)\"\n    (keydown.home)=\"focusInputText($event)\"\n    (keydown.end)=\"focusInputText($event)\"\n    [class.active]=\"activeFocusedButtonIndex === 0\"\n    [attr.aria-selected]=\"activeFocusedButtonIndex === 0\"\n    *ngIf=\"\n      !(searchResultsLoading$ | async) &&\n      searchTerm.value.length >= 3 &&\n      !!results.entries &&\n      results.entries.length <= 0\n    \"\n  >\n    {{ 'asm.customerSearch.noMatch' | cxTranslate }}\n  </button>\n</div>\n\n<div class=\"asm-results\" *ngIf=\"searchResultsLoading$ | async\">\n  <cx-dot-spinner\n    aria-hidden=\"false\"\n    [attr.aria-label]=\"'common.loading' | cxTranslate\"\n  ></cx-dot-spinner>\n</div>\n", dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i6.DotSpinnerComponent, selector: "cx-dot-spinner" }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i7.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CustomerSelectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-selection', host: {
                        '(document:click)': 'onDocumentClick($event)',
                    }, template: "<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"customerSelectionForm\">\n  <label>\n    <input\n      required=\"true\"\n      #searchTerm\n      type=\"text\"\n      formControlName=\"searchTerm\"\n      [attr.aria-label]=\"'asm.customerSearch.searchTerm.label' | cxTranslate\"\n      placeholder=\"{{ 'asm.customerSearch.searchTerm.label' | cxTranslate }}\"\n      (keydown.arrowdown)=\"focusFirstItem($event)\"\n      (keydown.end)=\"setSelectionEnd($event)\"\n    />\n    <cx-form-errors\n      [control]=\"customerSelectionForm.get('searchTerm')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\" [class.active]=\"selectedCustomer\">\n    {{ 'asm.customerSearch.submit' | cxTranslate }}\n  </button>\n</form>\n\n<div *ngIf=\"searchResults | async as results\" class=\"asm-results\" #resultList>\n  <button\n    #searchResultItem\n    *ngFor=\"let result of results.entries; let i = index\"\n    [tabindex]=\"activeFocusedButtonIndex === i ? 0 : -1\"\n    [attr.aria-selected]=\"activeFocusedButtonIndex === i\"\n    [class.active]=\"activeFocusedButtonIndex === i\"\n    (keydown.arrowup)=\"focusPreviousChild($event)\"\n    (keydown.arrowdown)=\"focusNextChild($event)\"\n    (keydown.arrowright)=\"focusInputText($event)\"\n    (keydown.arrowleft)=\"focusInputText($event)\"\n    (keydown.enter)=\"selectCustomerFromList($event, result)\"\n    (keydown.escape)=\"closeResults($event)\"\n    (keydown.home)=\"focusInputText($event)\"\n    (keydown.end)=\"focusInputText($event)\"\n    (click)=\"selectCustomerFromList($event, result)\"\n  >\n    <span class=\"result-name\">{{ result.name }}</span>\n    <span class=\"result-id\">{{ result.uid }}</span>\n  </button>\n  <button\n    #searchResultItem\n    (click)=\"closeResults($event)\"\n    (keydown.enter)=\"closeResults($event)\"\n    (keydown.escape)=\"closeResults($event)\"\n    (keydown.arrowright)=\"focusInputText($event)\"\n    (keydown.arrowleft)=\"focusInputText($event)\"\n    (keydown.home)=\"focusInputText($event)\"\n    (keydown.end)=\"focusInputText($event)\"\n    [class.active]=\"activeFocusedButtonIndex === 0\"\n    [attr.aria-selected]=\"activeFocusedButtonIndex === 0\"\n    *ngIf=\"\n      !(searchResultsLoading$ | async) &&\n      searchTerm.value.length >= 3 &&\n      !!results.entries &&\n      results.entries.length <= 0\n    \"\n  >\n    {{ 'asm.customerSearch.noMatch' | cxTranslate }}\n  </button>\n</div>\n\n<div class=\"asm-results\" *ngIf=\"searchResultsLoading$ | async\">\n  <cx-dot-spinner\n    aria-hidden=\"false\"\n    [attr.aria-label]=\"'common.loading' | cxTranslate\"\n  ></cx-dot-spinner>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.UntypedFormBuilder }, { type: i2.AsmService }, { type: i3.AsmConfig }, { type: i4.DirectionService }]; }, propDecorators: { submitEvent: [{
                type: Output
            }], resultList: [{
                type: ViewChild,
                args: ['resultList']
            }], searchTerm: [{
                type: ViewChild,
                args: ['searchTerm']
            }], searchResultItems: [{
                type: ViewChildren,
                args: ['searchResultItem']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItc2VsZWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9jdXN0b21lci1zZWxlY3Rpb24vY3VzdG9tZXItc2VsZWN0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9jdXN0b21lci1zZWxlY3Rpb24vY3VzdG9tZXItc2VsZWN0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFHWixNQUFNLEVBRU4sU0FBUyxFQUNULFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0wsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFLeEIsT0FBTyxFQUFFLGFBQWEsRUFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RSxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7O0FBUzlDLE1BQU0sT0FBTywwQkFBMEI7SUFrQnJDLFlBQ1ksRUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsTUFBaUIsRUFDakIsZ0JBQWtDO1FBSGxDLE9BQUUsR0FBRixFQUFFLENBQW9CO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBcEJwQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFNNUMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBMkIsQ0FBQztRQVExRCw2QkFBd0IsR0FBRyxDQUFDLENBQUMsQ0FBQztJQU8zQixDQUFDO0lBRUosUUFBUTtRQUNOLElBQUks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O0lBRUQ7Ozs7OztPQU1HO0lBQ08sZ0JBQWdCLENBQUMsS0FBb0I7UUFDN0MsT0FBTyxDQUNMLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3JELENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxZQUFZLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQ3ZELENBQUM7SUFDSixDQUFDO0lBQ1MsY0FBYztRQUN0QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsS0FBSyxhQUFhLENBQUMsR0FBRyxDQUFDO0lBQ3BFLENBQUM7SUFFUyxjQUFjO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxLQUFLLGFBQWEsQ0FBQyxHQUFHLENBQUM7SUFDcEUsQ0FBQzs7dUhBNU5VLDBCQUEwQjsyR0FBMUIsMEJBQTBCLDRjQ3JDdkMsNGpGQXFFQTsyRkRoQ2EsMEJBQTBCO2tCQVB0QyxTQUFTOytCQUNFLHVCQUF1QixRQUUzQjt3QkFDSixrQkFBa0IsRUFBRSx5QkFBeUI7cUJBQzlDO3lMQVVELFdBQVc7c0JBRFYsTUFBTTtnQkFHa0IsVUFBVTtzQkFBbEMsU0FBUzt1QkFBQyxZQUFZO2dCQUNFLFVBQVU7c0JBQWxDLFNBQVM7dUJBQUMsWUFBWTtnQkFDVyxpQkFBaUI7c0JBQWxELFlBQVk7dUJBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgVW50eXBlZEZvcm1CdWlsZGVyLFxuICBVbnR5cGVkRm9ybUdyb3VwLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBc21TZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9hc20vY29yZSc7XG5pbXBvcnQgeyBBc21Db25maWcsIEN1c3RvbWVyU2VhcmNoUGFnZSB9IGZyb20gJ0BzcGFydGFjdXMvYXNtL3Jvb3QnO1xuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IERpcmVjdGlvbk1vZGUsIERpcmVjdGlvblNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWN1c3RvbWVyLXNlbGVjdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jdXN0b21lci1zZWxlY3Rpb24uY29tcG9uZW50Lmh0bWwnLFxuICBob3N0OiB7XG4gICAgJyhkb2N1bWVudDpjbGljayknOiAnb25Eb2N1bWVudENsaWNrKCRldmVudCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lclNlbGVjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY3VzdG9tZXJTZWxlY3Rpb25Gb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBzZWFyY2hSZXN1bHRzTG9hZGluZyQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHNlYXJjaFJlc3VsdHM6IE9ic2VydmFibGU8Q3VzdG9tZXJTZWFyY2hQYWdlPjtcbiAgc2VsZWN0ZWRDdXN0b21lcjogVXNlciB8IHVuZGVmaW5lZDtcblxuICBAT3V0cHV0KClcbiAgc3VibWl0RXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPHsgY3VzdG9tZXJJZD86IHN0cmluZyB9PigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3Jlc3VsdExpc3QnKSByZXN1bHRMaXN0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzZWFyY2hUZXJtJykgc2VhcmNoVGVybTogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZHJlbignc2VhcmNoUmVzdWx0SXRlbScpIHNlYXJjaFJlc3VsdEl0ZW1zOiBRdWVyeUxpc3Q8XG4gICAgRWxlbWVudFJlZjxIVE1MRWxlbWVudD5cbiAgPjtcblxuICBhY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXggPSAtMTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZmI6IFVudHlwZWRGb3JtQnVpbGRlcixcbiAgICBwcm90ZWN0ZWQgYXNtU2VydmljZTogQXNtU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBBc21Db25maWcsXG4gICAgcHJvdGVjdGVkIGRpcmVjdGlvblNlcnZpY2U6IERpcmVjdGlvblNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY3VzdG9tZXJTZWxlY3Rpb25Gb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICBzZWFyY2hUZXJtOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgIH0pO1xuICAgIHRoaXMuYXNtU2VydmljZS5jdXN0b21lclNlYXJjaFJlc2V0KCk7XG4gICAgdGhpcy5zZWFyY2hSZXN1bHRzTG9hZGluZyQgPVxuICAgICAgdGhpcy5hc21TZXJ2aWNlLmdldEN1c3RvbWVyU2VhcmNoUmVzdWx0c0xvYWRpbmcoKTtcbiAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSB0aGlzLmFzbVNlcnZpY2UuZ2V0Q3VzdG9tZXJTZWFyY2hSZXN1bHRzKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLmN1c3RvbWVyU2VsZWN0aW9uRm9ybS5jb250cm9scy5zZWFyY2hUZXJtLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoMzAwKSlcbiAgICAgICAgLnN1YnNjcmliZSgoc2VhcmNoVGVybVZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVTZWFyY2hUZXJtKHNlYXJjaFRlcm1WYWx1ZSk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVTZWFyY2hUZXJtKHNlYXJjaFRlcm1WYWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKFxuICAgICAgISF0aGlzLnNlbGVjdGVkQ3VzdG9tZXIgJiZcbiAgICAgIHNlYXJjaFRlcm1WYWx1ZSAhPT0gdGhpcy5zZWxlY3RlZEN1c3RvbWVyLm5hbWVcbiAgICApIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRDdXN0b21lciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKEJvb2xlYW4odGhpcy5zZWxlY3RlZEN1c3RvbWVyKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmFzbVNlcnZpY2UuY3VzdG9tZXJTZWFyY2hSZXNldCgpO1xuICAgIHRoaXMuYWN0aXZlRm9jdXNlZEJ1dHRvbkluZGV4ID0gLTE7XG4gICAgaWYgKHNlYXJjaFRlcm1WYWx1ZS50cmltKCkubGVuZ3RoID49IDMpIHtcbiAgICAgIHRoaXMuYXNtU2VydmljZS5jdXN0b21lclNlYXJjaCh7XG4gICAgICAgIHF1ZXJ5OiBzZWFyY2hUZXJtVmFsdWUsXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLmNvbmZpZy5hc20/LmN1c3RvbWVyU2VhcmNoPy5tYXhSZXN1bHRzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0Q3VzdG9tZXJGcm9tTGlzdChldmVudDogVUlFdmVudCwgY3VzdG9tZXI6IFVzZXIpIHtcbiAgICB0aGlzLnNlbGVjdGVkQ3VzdG9tZXIgPSBjdXN0b21lcjtcbiAgICB0aGlzLmN1c3RvbWVyU2VsZWN0aW9uRm9ybS5jb250cm9scy5zZWFyY2hUZXJtLnNldFZhbHVlKFxuICAgICAgdGhpcy5zZWxlY3RlZEN1c3RvbWVyLm5hbWVcbiAgICApO1xuICAgIHRoaXMuYXNtU2VydmljZS5jdXN0b21lclNlYXJjaFJlc2V0KCk7XG4gICAgdGhpcy5zZWFyY2hUZXJtLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgb25TdWJtaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VzdG9tZXJTZWxlY3Rpb25Gb3JtLnZhbGlkICYmICEhdGhpcy5zZWxlY3RlZEN1c3RvbWVyKSB7XG4gICAgICB0aGlzLnN1Ym1pdEV2ZW50LmVtaXQoeyBjdXN0b21lcklkOiB0aGlzLnNlbGVjdGVkQ3VzdG9tZXIuY3VzdG9tZXJJZCB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXN0b21lclNlbGVjdGlvbkZvcm0ubWFya0FsbEFzVG91Y2hlZCgpO1xuICAgIH1cbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGljayhldmVudDogVUlFdmVudCkge1xuICAgIGlmIChCb29sZWFuKHRoaXMucmVzdWx0TGlzdCkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5yZXN1bHRMaXN0Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSB8fFxuICAgICAgICB0aGlzLnNlYXJjaFRlcm0ubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hc21TZXJ2aWNlLmN1c3RvbWVyU2VhcmNoUmVzZXQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbG9zZVJlc3VsdHMoZXZlbnQ6IFVJRXZlbnQpIHtcbiAgICB0aGlzLmFzbVNlcnZpY2UuY3VzdG9tZXJTZWFyY2hSZXNldCgpO1xuICAgIHRoaXMuc2VhcmNoVGVybS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5hc21TZXJ2aWNlLmN1c3RvbWVyU2VhcmNoUmVzZXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXQgZm9jdXMgdG8gdGhlIGZpcnN0IHNlYXJjaGVkIGl0ZW1cbiAgICogQHBhcmFtIGV2ZW50IGtleWJvYXJkIGV2ZW50XG4gICAqL1xuICBmb2N1c0ZpcnN0SXRlbShldmVudDogVUlFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5hY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXggPSAwO1xuICAgIHRoaXMudXBkYXRlSXRlbUluZGV4KHRoaXMuYWN0aXZlRm9jdXNlZEJ1dHRvbkluZGV4KTtcbiAgfVxuICAvKipcbiAgICogc2V0IG1vdXNlIGN1cnNvciB0byB0aGUgZW5kIG9mIHNlYXJjaCB0ZXh0XG4gICAqIEBwYXJhbSBldmVudCBrZXlib2FyZCBldmVudFxuICAgKi9cbiAgc2V0U2VsZWN0aW9uRW5kKGV2ZW50OiBVSUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5zZWFyY2hUZXJtLm5hdGl2ZUVsZW1lbnQudmFsdWU/Lmxlbmd0aCkge1xuICAgICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnNlYXJjaFRlcm0ubmF0aXZlRWxlbWVudC52YWx1ZS5sZW5ndGg7XG4gICAgICB0aGlzLnNlYXJjaFRlcm0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgICAgdGhpcy5zZWFyY2hUZXJtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBzZXQgZm9jdXMgb24gcHJldmlvdXMgc2VhcmggcmVzdWx0IGl0ZW0uICBJZiBubyBwcmV2aW91cyBpdGVtIHRoZW4gZ28gdG8gZW5kIG9mIGl0ZW0uXG4gICAqIEBwYXJhbSBldmVudCBrZXlib2FyZCBldmVudFxuICAgKi9cbiAgZm9jdXNQcmV2aW91c0NoaWxkKGV2ZW50OiBVSUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmFjdGl2ZUZvY3VzZWRCdXR0b25JbmRleC0tO1xuICAgIGlmICh0aGlzLmFjdGl2ZUZvY3VzZWRCdXR0b25JbmRleCA8IDApIHtcbiAgICAgIHRoaXMuYWN0aXZlRm9jdXNlZEJ1dHRvbkluZGV4ID0gdGhpcy5zZWFyY2hSZXN1bHRJdGVtcy5sZW5ndGggLSAxO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUl0ZW1JbmRleCh0aGlzLmFjdGl2ZUZvY3VzZWRCdXR0b25JbmRleCk7XG4gIH1cbiAgLyoqXG4gICAqIHNldCBmb2N1cyBvbiBuZXh0IHNlYXJoIHJlc3VsdCBpdGVtLiAgaWYgbm8gbmV4dCBpdGVtIHRoZW4gZ28gdG8gdGhlIGZpcnN0IGl0ZW1cbiAgICogQHBhcmFtIGV2ZW50IGtleWJvYXJkIGV2ZW50XG4gICAqL1xuICBmb2N1c05leHRDaGlsZChldmVudDogVUlFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5hY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXgrKztcbiAgICBpZiAodGhpcy5hY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXggPiB0aGlzLnNlYXJjaFJlc3VsdEl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMuYWN0aXZlRm9jdXNlZEJ1dHRvbkluZGV4ID0gMDtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVJdGVtSW5kZXgodGhpcy5hY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXgpO1xuICB9XG4gIC8qKlxuICAgKiBzZXQgZm9jdXMgdG8gaW5wdXQgc2VhcmNoIHRleHRcbiAgICogQHBhcmFtIGV2ZW50IGtleWJvYXJkIGV2ZW50XG4gICAqL1xuICBmb2N1c0lucHV0VGV4dChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5hY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXggPSAtMTtcbiAgICB0aGlzLnNlYXJjaFRlcm0ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIGlmICh0aGlzLnNlYXJjaFRlcm0ubmF0aXZlRWxlbWVudC52YWx1ZT8ubGVuZ3RoKSB7XG4gICAgICBsZXQgc2VsZWN0aW9uUG9zID0gdGhpcy5zZWFyY2hUZXJtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xuICAgICAgY29uc3Qgc2VhcmNoVGVybUxlbmd0aCA9IHRoaXMuc2VhcmNoVGVybS5uYXRpdmVFbGVtZW50LnZhbHVlLmxlbmd0aDtcblxuICAgICAgaWYgKHRoaXMuaXNCYWNrTmF2aWdhdGlvbihldmVudCkpIHtcbiAgICAgICAgc2VsZWN0aW9uUG9zID0gc2VsZWN0aW9uUG9zIDw9IDAgPyAwIDogc2VsZWN0aW9uUG9zIC0gMTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0ZvcndhcmRzTmF2aWdhdGlvbihldmVudCkpIHtcbiAgICAgICAgc2VsZWN0aW9uUG9zID1cbiAgICAgICAgICBzZWxlY3Rpb25Qb3MgPj0gc2VhcmNoVGVybUxlbmd0aFxuICAgICAgICAgICAgPyBzZWFyY2hUZXJtTGVuZ3RoXG4gICAgICAgICAgICA6IHNlbGVjdGlvblBvcyArIDE7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmNvZGUgPT09ICdIb21lJykge1xuICAgICAgICBzZWxlY3Rpb25Qb3MgPSAwO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5jb2RlID09PSAnRW5kJykge1xuICAgICAgICBzZWxlY3Rpb25Qb3MgPSBzZWFyY2hUZXJtTGVuZ3RoO1xuICAgICAgfVxuICAgICAgdGhpcy5zZWFyY2hUZXJtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25Qb3M7XG4gICAgICB0aGlzLnNlYXJjaFRlcm0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25Qb3M7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBzZXQgZm9jdXMgdG8gc2VsZWN0ZWQgaXRlbVxuICAgKiBAcGFyYW0ge251bWJlcn0gc2VsZWN0ZWRJbmRleCAtIGN1cnJlbnQgc2VsZWN0ZWQgaXRlbSBpbmRleFxuICAgKi9cbiAgdXBkYXRlSXRlbUluZGV4KHNlbGVjdGVkSW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoUmVzdWx0SXRlbXMudG9BcnJheSgpPy5bc2VsZWN0ZWRJbmRleF0/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgdXNlciBuYXZpZ2F0ZXMgaW50byBhIHN1Ymdyb3VwIG9mIHRoZSBtYWluIGdyb3VwIG1lbnUuXG4gICAqXG4gICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgLSBLZXlib2FyZCBldmVudFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSd0cnVlJyBpZiB0aGUgdXNlciBuYXZpZ2F0ZXMgaW50byB0aGUgc3ViZ3JvdXAsIG90aGVyd2lzZSAnZmFsc2UnLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNGb3J3YXJkc05hdmlnYXRpb24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgKGV2ZW50LmNvZGUgPT09ICdBcnJvd1JpZ2h0JyAmJiB0aGlzLmlzTFRSRGlyZWN0aW9uKCkpIHx8XG4gICAgICAoZXZlbnQuY29kZSA9PT0gJ0Fycm93TGVmdCcgJiYgdGhpcy5pc1JUTERpcmVjdGlvbigpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgdXNlciBuYXZpZ2F0ZXMgZnJvbSBhIHN1Ymdyb3VwIGJhY2sgdG8gdGhlIG1haW4gZ3JvdXAgbWVudS5cbiAgICpcbiAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCAtIEtleWJvYXJkIGV2ZW50XG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtJ3RydWUnIGlmIHRoZSB1c2VyIG5hdmlnYXRlcyBiYWNrIGludG8gdGhlIG1haW4gZ3JvdXAgbWVudSwgb3RoZXJ3aXNlICdmYWxzZScuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBpc0JhY2tOYXZpZ2F0aW9uKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIChldmVudC5jb2RlID09PSAnQXJyb3dMZWZ0JyAmJiB0aGlzLmlzTFRSRGlyZWN0aW9uKCkpIHx8XG4gICAgICAoZXZlbnQuY29kZSA9PT0gJ0Fycm93UmlnaHQnICYmIHRoaXMuaXNSVExEaXJlY3Rpb24oKSlcbiAgICApO1xuICB9XG4gIHByb3RlY3RlZCBpc0xUUkRpcmVjdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb25TZXJ2aWNlLmdldERpcmVjdGlvbigpID09PSBEaXJlY3Rpb25Nb2RlLkxUUjtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc1JUTERpcmVjdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb25TZXJ2aWNlLmdldERpcmVjdGlvbigpID09PSBEaXJlY3Rpb25Nb2RlLlJUTDtcbiAgfVxufVxuIiwiPGZvcm0gKG5nU3VibWl0KT1cIm9uU3VibWl0KClcIiBbZm9ybUdyb3VwXT1cImN1c3RvbWVyU2VsZWN0aW9uRm9ybVwiPlxuICA8bGFiZWw+XG4gICAgPGlucHV0XG4gICAgICByZXF1aXJlZD1cInRydWVcIlxuICAgICAgI3NlYXJjaFRlcm1cbiAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgIGZvcm1Db250cm9sTmFtZT1cInNlYXJjaFRlcm1cIlxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInYXNtLmN1c3RvbWVyU2VhcmNoLnNlYXJjaFRlcm0ubGFiZWwnIHwgY3hUcmFuc2xhdGVcIlxuICAgICAgcGxhY2Vob2xkZXI9XCJ7eyAnYXNtLmN1c3RvbWVyU2VhcmNoLnNlYXJjaFRlcm0ubGFiZWwnIHwgY3hUcmFuc2xhdGUgfX1cIlxuICAgICAgKGtleWRvd24uYXJyb3dkb3duKT1cImZvY3VzRmlyc3RJdGVtKCRldmVudClcIlxuICAgICAgKGtleWRvd24uZW5kKT1cInNldFNlbGVjdGlvbkVuZCgkZXZlbnQpXCJcbiAgICAvPlxuICAgIDxjeC1mb3JtLWVycm9yc1xuICAgICAgW2NvbnRyb2xdPVwiY3VzdG9tZXJTZWxlY3Rpb25Gb3JtLmdldCgnc2VhcmNoVGVybScpXCJcbiAgICA+PC9jeC1mb3JtLWVycm9ycz5cbiAgPC9sYWJlbD5cbiAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgW2NsYXNzLmFjdGl2ZV09XCJzZWxlY3RlZEN1c3RvbWVyXCI+XG4gICAge3sgJ2FzbS5jdXN0b21lclNlYXJjaC5zdWJtaXQnIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9idXR0b24+XG48L2Zvcm0+XG5cbjxkaXYgKm5nSWY9XCJzZWFyY2hSZXN1bHRzIHwgYXN5bmMgYXMgcmVzdWx0c1wiIGNsYXNzPVwiYXNtLXJlc3VsdHNcIiAjcmVzdWx0TGlzdD5cbiAgPGJ1dHRvblxuICAgICNzZWFyY2hSZXN1bHRJdGVtXG4gICAgKm5nRm9yPVwibGV0IHJlc3VsdCBvZiByZXN1bHRzLmVudHJpZXM7IGxldCBpID0gaW5kZXhcIlxuICAgIFt0YWJpbmRleF09XCJhY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXggPT09IGkgPyAwIDogLTFcIlxuICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiYWN0aXZlRm9jdXNlZEJ1dHRvbkluZGV4ID09PSBpXCJcbiAgICBbY2xhc3MuYWN0aXZlXT1cImFjdGl2ZUZvY3VzZWRCdXR0b25JbmRleCA9PT0gaVwiXG4gICAgKGtleWRvd24uYXJyb3d1cCk9XCJmb2N1c1ByZXZpb3VzQ2hpbGQoJGV2ZW50KVwiXG4gICAgKGtleWRvd24uYXJyb3dkb3duKT1cImZvY3VzTmV4dENoaWxkKCRldmVudClcIlxuICAgIChrZXlkb3duLmFycm93cmlnaHQpPVwiZm9jdXNJbnB1dFRleHQoJGV2ZW50KVwiXG4gICAgKGtleWRvd24uYXJyb3dsZWZ0KT1cImZvY3VzSW5wdXRUZXh0KCRldmVudClcIlxuICAgIChrZXlkb3duLmVudGVyKT1cInNlbGVjdEN1c3RvbWVyRnJvbUxpc3QoJGV2ZW50LCByZXN1bHQpXCJcbiAgICAoa2V5ZG93bi5lc2NhcGUpPVwiY2xvc2VSZXN1bHRzKCRldmVudClcIlxuICAgIChrZXlkb3duLmhvbWUpPVwiZm9jdXNJbnB1dFRleHQoJGV2ZW50KVwiXG4gICAgKGtleWRvd24uZW5kKT1cImZvY3VzSW5wdXRUZXh0KCRldmVudClcIlxuICAgIChjbGljayk9XCJzZWxlY3RDdXN0b21lckZyb21MaXN0KCRldmVudCwgcmVzdWx0KVwiXG4gID5cbiAgICA8c3BhbiBjbGFzcz1cInJlc3VsdC1uYW1lXCI+e3sgcmVzdWx0Lm5hbWUgfX08L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJyZXN1bHQtaWRcIj57eyByZXN1bHQudWlkIH19PC9zcGFuPlxuICA8L2J1dHRvbj5cbiAgPGJ1dHRvblxuICAgICNzZWFyY2hSZXN1bHRJdGVtXG4gICAgKGNsaWNrKT1cImNsb3NlUmVzdWx0cygkZXZlbnQpXCJcbiAgICAoa2V5ZG93bi5lbnRlcik9XCJjbG9zZVJlc3VsdHMoJGV2ZW50KVwiXG4gICAgKGtleWRvd24uZXNjYXBlKT1cImNsb3NlUmVzdWx0cygkZXZlbnQpXCJcbiAgICAoa2V5ZG93bi5hcnJvd3JpZ2h0KT1cImZvY3VzSW5wdXRUZXh0KCRldmVudClcIlxuICAgIChrZXlkb3duLmFycm93bGVmdCk9XCJmb2N1c0lucHV0VGV4dCgkZXZlbnQpXCJcbiAgICAoa2V5ZG93bi5ob21lKT1cImZvY3VzSW5wdXRUZXh0KCRldmVudClcIlxuICAgIChrZXlkb3duLmVuZCk9XCJmb2N1c0lucHV0VGV4dCgkZXZlbnQpXCJcbiAgICBbY2xhc3MuYWN0aXZlXT1cImFjdGl2ZUZvY3VzZWRCdXR0b25JbmRleCA9PT0gMFwiXG4gICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJhY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXggPT09IDBcIlxuICAgICpuZ0lmPVwiXG4gICAgICAhKHNlYXJjaFJlc3VsdHNMb2FkaW5nJCB8IGFzeW5jKSAmJlxuICAgICAgc2VhcmNoVGVybS52YWx1ZS5sZW5ndGggPj0gMyAmJlxuICAgICAgISFyZXN1bHRzLmVudHJpZXMgJiZcbiAgICAgIHJlc3VsdHMuZW50cmllcy5sZW5ndGggPD0gMFxuICAgIFwiXG4gID5cbiAgICB7eyAnYXNtLmN1c3RvbWVyU2VhcmNoLm5vTWF0Y2gnIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9idXR0b24+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cImFzbS1yZXN1bHRzXCIgKm5nSWY9XCJzZWFyY2hSZXN1bHRzTG9hZGluZyQgfCBhc3luY1wiPlxuICA8Y3gtZG90LXNwaW5uZXJcbiAgICBhcmlhLWhpZGRlbj1cImZhbHNlXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidjb21tb24ubG9hZGluZycgfCBjeFRyYW5zbGF0ZVwiXG4gID48L2N4LWRvdC1zcGlubmVyPlxuPC9kaXY+XG4iXX0=