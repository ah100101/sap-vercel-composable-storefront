/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { GlobalMessageType, } from '../../../global-message/index';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../connectors/address/user-address.connector";
import * as i3 from "../../facade/user-address.service";
import * as i4 from "../../../global-message/index";
export class UserAddressesEffects {
    constructor(actions$, userAddressConnector, userAddressService, messageService) {
        this.actions$ = actions$;
        this.userAddressConnector = userAddressConnector;
        this.userAddressService = userAddressService;
        this.messageService = messageService;
        this.loadUserAddresses$ = createEffect(() => this.actions$.pipe(ofType(UserActions.LOAD_USER_ADDRESSES), map((action) => action.payload), switchMap((payload) => {
            return this.userAddressConnector.getAll(payload).pipe(map((addresses) => {
                return new UserActions.LoadUserAddressesSuccess(addresses);
            }), catchError((error) => of(new UserActions.LoadUserAddressesFail(normalizeHttpError(error)))));
        })));
        this.addUserAddress$ = createEffect(() => this.actions$.pipe(ofType(UserActions.ADD_USER_ADDRESS), map((action) => action.payload), mergeMap((payload) => {
            return this.userAddressConnector
                .add(payload.userId, payload.address)
                .pipe(map((data) => {
                return new UserActions.AddUserAddressSuccess(data);
            }), catchError((error) => of(new UserActions.AddUserAddressFail(normalizeHttpError(error)))));
        })));
        this.updateUserAddress$ = createEffect(() => this.actions$.pipe(ofType(UserActions.UPDATE_USER_ADDRESS), map((action) => action.payload), mergeMap((payload) => {
            return this.userAddressConnector
                .update(payload.userId, payload.addressId, payload.address)
                .pipe(map(() => {
                return new UserActions.UpdateUserAddressSuccess(payload);
            }), catchError((error) => of(new UserActions.UpdateUserAddressFail(normalizeHttpError(error)))));
        })));
        this.deleteUserAddress$ = createEffect(() => this.actions$.pipe(ofType(UserActions.DELETE_USER_ADDRESS), map((action) => action.payload), mergeMap((payload) => {
            return this.userAddressConnector
                .delete(payload.userId, payload.addressId)
                .pipe(map((data) => {
                return new UserActions.DeleteUserAddressSuccess(data);
            }), catchError((error) => of(new UserActions.DeleteUserAddressFail(normalizeHttpError(error)))));
        })));
        /**
         *  Reload addresses and notify about add success
         */
        this.showGlobalMessageOnAddSuccess$ = createEffect(() => this.actions$.pipe(ofType(UserActions.ADD_USER_ADDRESS_SUCCESS), tap(() => {
            this.loadAddresses();
            this.showGlobalMessage('addressForm.userAddressAddSuccess');
        })), { dispatch: false });
        /**
         *  Reload addresses and notify about update success
         */
        this.showGlobalMessageOnUpdateSuccess$ = createEffect(() => this.actions$.pipe(ofType(UserActions.UPDATE_USER_ADDRESS_SUCCESS), map((action) => action.payload), tap((payload) => {
            this.loadAddresses();
            // don't show the message if just setting address as default
            if (Object.keys(payload?.address).length !== 1 ||
                !payload?.address?.defaultAddress) {
                this.showGlobalMessage('addressForm.userAddressUpdateSuccess');
            }
        })), { dispatch: false });
        /**
         *  Reload addresses and notify about delete success
         */
        this.showGlobalMessageOnDeleteSuccess$ = createEffect(() => this.actions$.pipe(ofType(UserActions.DELETE_USER_ADDRESS_SUCCESS), tap(() => {
            this.loadAddresses();
            this.showGlobalMessage('addressForm.userAddressDeleteSuccess');
        })), { dispatch: false });
    }
    /**
     * Show global confirmation message with provided text
     */
    showGlobalMessage(text) {
        this.messageService.add({ key: text }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
    }
    loadAddresses() {
        this.userAddressService.loadAddresses();
    }
}
UserAddressesEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: UserAddressesEffects, deps: [{ token: i1.Actions }, { token: i2.UserAddressConnector }, { token: i3.UserAddressService }, { token: i4.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
UserAddressesEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: UserAddressesEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: UserAddressesEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.UserAddressConnector }, { type: i3.UserAddressService }, { type: i4.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hZGRyZXNzZXMuZWZmZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvdXNlci9zdG9yZS9lZmZlY3RzL3VzZXItYWRkcmVzc2VzLmVmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQVcsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0UsT0FBTyxFQUVMLGlCQUFpQixHQUNsQixNQUFNLCtCQUErQixDQUFDO0FBRXZDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBR3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7O0FBRy9DLE1BQU0sT0FBTyxvQkFBb0I7SUFrSi9CLFlBQ1UsUUFBaUIsRUFDakIsb0JBQTBDLEVBQzFDLGtCQUFzQyxFQUN0QyxjQUFvQztRQUhwQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxtQkFBYyxHQUFkLGNBQWMsQ0FBc0I7UUFySjlDLHVCQUFrQixHQUNoQixZQUFZLENBQUMsR0FBRyxFQUFFLENBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNoQixNQUFNLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLEVBQ3ZDLEdBQUcsQ0FBQyxDQUFDLE1BQXFDLEVBQUUsRUFBRSxDQUFDLE1B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QUFPLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFDakM7Z0JBQ0EsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHNDQUFzQyxDQUFDLENBQUM7YUFDaEU7UUFDSCxDQUFDLENBQUMsQ0FDSCxFQUNILEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUNwQixDQUFDO1FBRUY7O1dBRUc7UUFFSCxzQ0FBaUMsR0FBRyxZQUFZLENBQzlDLEdBQUcsRUFBRSxDQUNILElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNoQixNQUFNLENBQUMsV0FBVyxDQUFDLDJCQUEyQixDQUFDLEVBQy9DLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQ0gsRUFDSCxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FDcEIsQ0FBQztJQU9DLENBQUM7SUFFSjs7T0FFRztJQUNLLGlCQUFpQixDQUFDLElBQVk7UUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUNiLGlCQUFpQixDQUFDLHFCQUFxQixDQUN4QyxDQUFDO0lBQ0osQ0FBQztJQUVPLGFBQWE7UUFDbkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFDLENBQUM7O2lIQXJLVSxvQkFBb0I7cUhBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQURoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9ucywgY3JlYXRlRWZmZWN0LCBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIG1lcmdlTWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbn0gZnJvbSAnLi4vLi4vLi4vZ2xvYmFsLW1lc3NhZ2UvaW5kZXgnO1xuaW1wb3J0IHsgQWRkcmVzcyB9IGZyb20gJy4uLy4uLy4uL21vZGVsL2FkZHJlc3MubW9kZWwnO1xuaW1wb3J0IHsgbm9ybWFsaXplSHR0cEVycm9yIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9ub3JtYWxpemUtaHR0cC1lcnJvcic7XG5pbXBvcnQgeyBVc2VyQWRkcmVzc0Nvbm5lY3RvciB9IGZyb20gJy4uLy4uL2Nvbm5lY3RvcnMvYWRkcmVzcy91c2VyLWFkZHJlc3MuY29ubmVjdG9yJztcbmltcG9ydCB7IFVzZXJBZGRyZXNzU2VydmljZSB9IGZyb20gJy4uLy4uL2ZhY2FkZS91c2VyLWFkZHJlc3Muc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlckFkZHJlc3Nlc0VmZmVjdHMge1xuICBsb2FkVXNlckFkZHJlc3NlcyQ6IE9ic2VydmFibGU8VXNlckFjdGlvbnMuVXNlckFkZHJlc3Nlc0FjdGlvbj4gPVxuICAgIGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgICBvZlR5cGUoVXNlckFjdGlvbnMuTE9BRF9VU0VSX0FERFJFU1NFUyksXG4gICAgICAgIG1hcCgoYWN0aW9uOiBVc2VyQWN0aW9ucy5Mb2FkVXNlckFkZHJlc3NlcykgPT4gYWN0aW9uLnBheWxvYWQpLFxuICAgICAgICBzd2l0Y2hNYXAoKHBheWxvYWQpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy51c2VyQWRkcmVzc0Nvbm5lY3Rvci5nZXRBbGwocGF5bG9hZCkucGlwZShcbiAgICAgICAgICAgIG1hcCgoYWRkcmVzc2VzOiBBZGRyZXNzW10pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVc2VyQWN0aW9ucy5Mb2FkVXNlckFkZHJlc3Nlc1N1Y2Nlc3MoYWRkcmVzc2VzKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+XG4gICAgICAgICAgICAgIG9mKFxuICAgICAgICAgICAgICAgIG5ldyBVc2VyQWN0aW9ucy5Mb2FkVXNlckFkZHJlc3Nlc0ZhaWwobm9ybWFsaXplSHR0cEVycm9yKGVycm9yKSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgKTtcblxuICBhZGRVc2VyQWRkcmVzcyQ6IE9ic2VydmFibGU8VXNlckFjdGlvbnMuVXNlckFkZHJlc3Nlc0FjdGlvbj4gPSBjcmVhdGVFZmZlY3QoXG4gICAgKCkgPT5cbiAgICAgIHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgICAgb2ZUeXBlKFVzZXJBY3Rpb25zLkFERF9VU0VSX0FERFJFU1MpLFxuICAgICAgICBtYXAoKGFjdGlvbjogVXNlckFjdGlvbnMuQWRkVXNlckFkZHJlc3MpID0+IGFjdGlvbi5wYXlsb2FkKSxcbiAgICAgICAgbWVyZ2VNYXAoKHBheWxvYWQpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy51c2VyQWRkcmVzc0Nvbm5lY3RvclxuICAgICAgICAgICAgLmFkZChwYXlsb2FkLnVzZXJJZCwgcGF5bG9hZC5hZGRyZXNzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVc2VyQWN0aW9ucy5BZGRVc2VyQWRkcmVzc1N1Y2Nlc3MoZGF0YSk7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT5cbiAgICAgICAgICAgICAgICBvZihcbiAgICAgICAgICAgICAgICAgIG5ldyBVc2VyQWN0aW9ucy5BZGRVc2VyQWRkcmVzc0ZhaWwobm9ybWFsaXplSHR0cEVycm9yKGVycm9yKSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICk7XG5cbiAgdXBkYXRlVXNlckFkZHJlc3MkOiBPYnNlcnZhYmxlPFVzZXJBY3Rpb25zLlVzZXJBZGRyZXNzZXNBY3Rpb24+ID1cbiAgICBjcmVhdGVFZmZlY3QoKCkgPT5cbiAgICAgIHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgICAgb2ZUeXBlKFVzZXJBY3Rpb25zLlVQREFURV9VU0VSX0FERFJFU1MpLFxuICAgICAgICBtYXAoKGFjdGlvbjogVXNlckFjdGlvbnMuVXBkYXRlVXNlckFkZHJlc3MpID0+IGFjdGlvbi5wYXlsb2FkKSxcbiAgICAgICAgbWVyZ2VNYXAoKHBheWxvYWQpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy51c2VyQWRkcmVzc0Nvbm5lY3RvclxuICAgICAgICAgICAgLnVwZGF0ZShwYXlsb2FkLnVzZXJJZCwgcGF5bG9hZC5hZGRyZXNzSWQsIHBheWxvYWQuYWRkcmVzcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVXNlckFjdGlvbnMuVXBkYXRlVXNlckFkZHJlc3NTdWNjZXNzKHBheWxvYWQpO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+XG4gICAgICAgICAgICAgICAgb2YoXG4gICAgICAgICAgICAgICAgICBuZXcgVXNlckFjdGlvbnMuVXBkYXRlVXNlckFkZHJlc3NGYWlsKFxuICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICk7XG5cbiAgZGVsZXRlVXNlckFkZHJlc3MkOiBPYnNlcnZhYmxlPFVzZXJBY3Rpb25zLlVzZXJBZGRyZXNzZXNBY3Rpb24+ID1cbiAgICBjcmVhdGVFZmZlY3QoKCkgPT5cbiAgICAgIHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgICAgb2ZUeXBlKFVzZXJBY3Rpb25zLkRFTEVURV9VU0VSX0FERFJFU1MpLFxuICAgICAgICBtYXAoKGFjdGlvbjogVXNlckFjdGlvbnMuRGVsZXRlVXNlckFkZHJlc3MpID0+IGFjdGlvbi5wYXlsb2FkKSxcbiAgICAgICAgbWVyZ2VNYXAoKHBheWxvYWQpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy51c2VyQWRkcmVzc0Nvbm5lY3RvclxuICAgICAgICAgICAgLmRlbGV0ZShwYXlsb2FkLnVzZXJJZCwgcGF5bG9hZC5hZGRyZXNzSWQpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVc2VyQWN0aW9ucy5EZWxldGVVc2VyQWRkcmVzc1N1Y2Nlc3MoZGF0YSk7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT5cbiAgICAgICAgICAgICAgICBvZihcbiAgICAgICAgICAgICAgICAgIG5ldyBVc2VyQWN0aW9ucy5EZWxldGVVc2VyQWRkcmVzc0ZhaWwoXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgKTtcblxuICAvKipcbiAgICogIFJlbG9hZCBhZGRyZXNzZXMgYW5kIG5vdGlmeSBhYm91dCBhZGQgc3VjY2Vzc1xuICAgKi9cblxuICBzaG93R2xvYmFsTWVzc2FnZU9uQWRkU3VjY2VzcyQgPSBjcmVhdGVFZmZlY3QoXG4gICAgKCkgPT5cbiAgICAgIHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgICAgb2ZUeXBlKFVzZXJBY3Rpb25zLkFERF9VU0VSX0FERFJFU1NfU1VDQ0VTUyksXG4gICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkQWRkcmVzc2VzKCk7XG4gICAgICAgICAgdGhpcy5zaG93R2xvYmFsTWVzc2FnZSgnYWRkcmVzc0Zvcm0udXNlckFkZHJlc3NBZGRTdWNjZXNzJyk7XG4gICAgICAgIH0pXG4gICAgICApLFxuICAgIHsgZGlzcGF0Y2g6IGZhbHNlIH1cbiAgKTtcblxuICAvKipcbiAgICogIFJlbG9hZCBhZGRyZXNzZXMgYW5kIG5vdGlmeSBhYm91dCB1cGRhdGUgc3VjY2Vzc1xuICAgKi9cblxuICBzaG93R2xvYmFsTWVzc2FnZU9uVXBkYXRlU3VjY2VzcyQgPSBjcmVhdGVFZmZlY3QoXG4gICAgKCkgPT5cbiAgICAgIHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgICAgb2ZUeXBlKFVzZXJBY3Rpb25zLlVQREFURV9VU0VSX0FERFJFU1NfU1VDQ0VTUyksXG4gICAgICAgIG1hcCgoYWN0aW9uOiBVc2VyQWN0aW9ucy5VcGRhdGVVc2VyQWRkcmVzc1N1Y2Nlc3MpID0+IGFjdGlvbi5wYXlsb2FkKSxcbiAgICAgICAgdGFwKChwYXlsb2FkKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkQWRkcmVzc2VzKCk7XG4gICAgICAgICAgLy8gZG9uJ3Qgc2hvdyB0aGUgbWVzc2FnZSBpZiBqdXN0IHNldHRpbmcgYWRkcmVzcyBhcyBkZWZhdWx0XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgT2JqZWN0LmtleXMocGF5bG9hZD8uYWRkcmVzcykubGVuZ3RoICE9PSAxIHx8XG4gICAgICAgICAgICAhcGF5bG9hZD8uYWRkcmVzcz8uZGVmYXVsdEFkZHJlc3NcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0dsb2JhbE1lc3NhZ2UoJ2FkZHJlc3NGb3JtLnVzZXJBZGRyZXNzVXBkYXRlU3VjY2VzcycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgeyBkaXNwYXRjaDogZmFsc2UgfVxuICApO1xuXG4gIC8qKlxuICAgKiAgUmVsb2FkIGFkZHJlc3NlcyBhbmQgbm90aWZ5IGFib3V0IGRlbGV0ZSBzdWNjZXNzXG4gICAqL1xuXG4gIHNob3dHbG9iYWxNZXNzYWdlT25EZWxldGVTdWNjZXNzJCA9IGNyZWF0ZUVmZmVjdChcbiAgICAoKSA9PlxuICAgICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgICBvZlR5cGUoVXNlckFjdGlvbnMuREVMRVRFX1VTRVJfQUREUkVTU19TVUNDRVNTKSxcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRBZGRyZXNzZXMoKTtcbiAgICAgICAgICB0aGlzLnNob3dHbG9iYWxNZXNzYWdlKCdhZGRyZXNzRm9ybS51c2VyQWRkcmVzc0RlbGV0ZVN1Y2Nlc3MnKTtcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgeyBkaXNwYXRjaDogZmFsc2UgfVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9ucyQ6IEFjdGlvbnMsXG4gICAgcHJpdmF0ZSB1c2VyQWRkcmVzc0Nvbm5lY3RvcjogVXNlckFkZHJlc3NDb25uZWN0b3IsXG4gICAgcHJpdmF0ZSB1c2VyQWRkcmVzc1NlcnZpY2U6IFVzZXJBZGRyZXNzU2VydmljZSxcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFNob3cgZ2xvYmFsIGNvbmZpcm1hdGlvbiBtZXNzYWdlIHdpdGggcHJvdmlkZWQgdGV4dFxuICAgKi9cbiAgcHJpdmF0ZSBzaG93R2xvYmFsTWVzc2FnZSh0ZXh0OiBzdHJpbmcpIHtcbiAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgIHsga2V5OiB0ZXh0IH0sXG4gICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9DT05GSVJNQVRJT05cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkQWRkcmVzc2VzKCkge1xuICAgIHRoaXMudXNlckFkZHJlc3NTZXJ2aWNlLmxvYWRBZGRyZXNzZXMoKTtcbiAgfVxufVxuIl19