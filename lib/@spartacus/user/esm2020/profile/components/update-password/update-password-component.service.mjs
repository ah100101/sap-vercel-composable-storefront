/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, } from '@angular/forms';
import { GlobalMessageType, } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
export class UpdatePasswordComponentService {
    constructor(userPasswordService, routingService, globalMessageService, authRedirectService, authService) {
        this.userPasswordService = userPasswordService;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
        this.authRedirectService = authRedirectService;
        this.authService = authService;
        this.busy$ = new BehaviorSubject(false);
        this.isUpdating$ = this.busy$.pipe(tap((state) => (state === true ? this.form.disable() : this.form.enable())));
        this.form = new UntypedFormGroup({
            oldPassword: new UntypedFormControl('', Validators.required),
            newPassword: new UntypedFormControl('', [
                Validators.required,
                CustomFormValidators.passwordValidator,
            ]),
            newPasswordConfirm: new UntypedFormControl('', Validators.required),
        }, {
            validators: CustomFormValidators.passwordsMustMatch('newPassword', 'newPasswordConfirm'),
        });
    }
    /**
     * Updates the password for the user.
     */
    updatePassword() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        const oldPassword = this.form.get('oldPassword')?.value;
        const newPassword = this.form.get('newPassword')?.value;
        this.userPasswordService.update(oldPassword, newPassword).subscribe({
            next: () => this.onSuccess(),
            error: (error) => this.onError(error),
        });
    }
    onSuccess() {
        this.globalMessageService.add({ key: 'updatePasswordForm.passwordUpdateSuccess' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.busy$.next(false);
        this.form.reset();
        // sets the redirect url after login
        this.authRedirectService?.setRedirectUrl(this.routingService.getUrl({ cxRoute: 'home' }));
        // TODO(#9638): Use logout route when it will support passing redirect url
        this.authService?.coreLogout().then(() => {
            this.routingService.go({ cxRoute: 'login' });
        });
    }
    onError(_error) {
        this.busy$.next(false);
        this.form.reset();
    }
}
UpdatePasswordComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: UpdatePasswordComponentService, deps: [{ token: i1.UserPasswordFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }, { token: i2.AuthRedirectService }, { token: i2.AuthService }], target: i0.ɵɵFactoryTarget.Injectable });
UpdatePasswordComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: UpdatePasswordComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: UpdatePasswordComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserPasswordFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }, { type: i2.AuthRedirectService }, { type: i2.AuthService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBhc3N3b3JkLWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvcHJvZmlsZS9jb21wb25lbnRzL3VwZGF0ZS1wYXNzd29yZC91cGRhdGUtcGFzc3dvcmQtY29tcG9uZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUlMLGlCQUFpQixHQUVsQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBR3JDLE1BQU0sT0FBTyw4QkFBOEI7SUFDekMsWUFDWSxtQkFBdUMsRUFDdkMsY0FBOEIsRUFDOUIsb0JBQTBDLEVBQzFDLG1CQUF5QyxFQUN6QyxXQUF5QjtRQUp6Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBQ3ZDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBc0I7UUFDekMsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFHM0IsVUFBSyxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQzNCLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FDNUUsQ0FBQztRQUVGLFNBQUksR0FBcUIsSUFBSSxnQkFBZ0IsQ0FDM0M7WUFDRSxXQUFXLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUM1RCxXQUFXLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLFVBQVUsQ0FBQyxRQUFRO2dCQUNuQixvQkFBb0IsQ0FBQyxpQkFBaUI7YUFDdkMsQ0FBQztZQUNGLGtCQUFrQixFQUFFLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDcEUsRUFDRDtZQUNFLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FDakQsYUFBYSxFQUNiLG9CQUFvQixDQUNyQjtTQUNGLENBQ0YsQ0FBQztJQXZCQyxDQUFDO0lBeUJKOztPQUVHO0lBQ0gsY0FBYztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDN0IsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxDQUFDO1FBQ3hELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssQ0FBQztRQUV4RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDbEUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDNUIsS0FBSyxFQUFFLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUM3QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsU0FBUztRQUNqQixJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQixFQUFFLEdBQUcsRUFBRSwwQ0FBMEMsRUFBRSxFQUNuRCxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FDeEMsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFbEIsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLENBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQ2hELENBQUM7UUFDRiwwRUFBMEU7UUFDMUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsT0FBTyxDQUFDLE1BQWE7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQixDQUFDOzsySEF6RVUsOEJBQThCOytIQUE5Qiw4QkFBOEI7MkZBQTlCLDhCQUE4QjtrQkFEMUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFVudHlwZWRGb3JtQ29udHJvbCxcbiAgVW50eXBlZEZvcm1Hcm91cCxcbiAgVmFsaWRhdG9ycyxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgQXV0aFNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgUm91dGluZ1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDdXN0b21Gb3JtVmFsaWRhdG9ycyB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBVc2VyUGFzc3dvcmRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvcHJvZmlsZS9yb290JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXBkYXRlUGFzc3dvcmRDb21wb25lbnRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHVzZXJQYXNzd29yZFNlcnZpY2U6IFVzZXJQYXNzd29yZEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF1dGhSZWRpcmVjdFNlcnZpY2U/OiBBdXRoUmVkaXJlY3RTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoU2VydmljZT86IEF1dGhTZXJ2aWNlXG4gICkge31cblxuICBwcm90ZWN0ZWQgYnVzeSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcblxuICBpc1VwZGF0aW5nJCA9IHRoaXMuYnVzeSQucGlwZShcbiAgICB0YXAoKHN0YXRlKSA9PiAoc3RhdGUgPT09IHRydWUgPyB0aGlzLmZvcm0uZGlzYWJsZSgpIDogdGhpcy5mb3JtLmVuYWJsZSgpKSlcbiAgKTtcblxuICBmb3JtOiBVbnR5cGVkRm9ybUdyb3VwID0gbmV3IFVudHlwZWRGb3JtR3JvdXAoXG4gICAge1xuICAgICAgb2xkUGFzc3dvcmQ6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgICAgbmV3UGFzc3dvcmQ6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFtcbiAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcbiAgICAgICAgQ3VzdG9tRm9ybVZhbGlkYXRvcnMucGFzc3dvcmRWYWxpZGF0b3IsXG4gICAgICBdKSxcbiAgICAgIG5ld1Bhc3N3b3JkQ29uZmlybTogbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZCksXG4gICAgfSxcbiAgICB7XG4gICAgICB2YWxpZGF0b3JzOiBDdXN0b21Gb3JtVmFsaWRhdG9ycy5wYXNzd29yZHNNdXN0TWF0Y2goXG4gICAgICAgICduZXdQYXNzd29yZCcsXG4gICAgICAgICduZXdQYXNzd29yZENvbmZpcm0nXG4gICAgICApLFxuICAgIH1cbiAgKTtcblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcGFzc3dvcmQgZm9yIHRoZSB1c2VyLlxuICAgKi9cbiAgdXBkYXRlUGFzc3dvcmQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmZvcm0udmFsaWQpIHtcbiAgICAgIHRoaXMuZm9ybS5tYXJrQWxsQXNUb3VjaGVkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5idXN5JC5uZXh0KHRydWUpO1xuXG4gICAgY29uc3Qgb2xkUGFzc3dvcmQgPSB0aGlzLmZvcm0uZ2V0KCdvbGRQYXNzd29yZCcpPy52YWx1ZTtcbiAgICBjb25zdCBuZXdQYXNzd29yZCA9IHRoaXMuZm9ybS5nZXQoJ25ld1Bhc3N3b3JkJyk/LnZhbHVlO1xuXG4gICAgdGhpcy51c2VyUGFzc3dvcmRTZXJ2aWNlLnVwZGF0ZShvbGRQYXNzd29yZCwgbmV3UGFzc3dvcmQpLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAoKSA9PiB0aGlzLm9uU3VjY2VzcygpLFxuICAgICAgZXJyb3I6IChlcnJvcjogRXJyb3IpID0+IHRoaXMub25FcnJvcihlcnJvciksXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25TdWNjZXNzKCk6IHZvaWQge1xuICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgeyBrZXk6ICd1cGRhdGVQYXNzd29yZEZvcm0ucGFzc3dvcmRVcGRhdGVTdWNjZXNzJyB9LFxuICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfQ09ORklSTUFUSU9OXG4gICAgKTtcbiAgICB0aGlzLmJ1c3kkLm5leHQoZmFsc2UpO1xuICAgIHRoaXMuZm9ybS5yZXNldCgpO1xuXG4gICAgLy8gc2V0cyB0aGUgcmVkaXJlY3QgdXJsIGFmdGVyIGxvZ2luXG4gICAgdGhpcy5hdXRoUmVkaXJlY3RTZXJ2aWNlPy5zZXRSZWRpcmVjdFVybChcbiAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ2V0VXJsKHsgY3hSb3V0ZTogJ2hvbWUnIH0pXG4gICAgKTtcbiAgICAvLyBUT0RPKCM5NjM4KTogVXNlIGxvZ291dCByb3V0ZSB3aGVuIGl0IHdpbGwgc3VwcG9ydCBwYXNzaW5nIHJlZGlyZWN0IHVybFxuICAgIHRoaXMuYXV0aFNlcnZpY2U/LmNvcmVMb2dvdXQoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ28oeyBjeFJvdXRlOiAnbG9naW4nIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uRXJyb3IoX2Vycm9yOiBFcnJvcik6IHZvaWQge1xuICAgIHRoaXMuYnVzeSQubmV4dChmYWxzZSk7XG4gICAgdGhpcy5mb3JtLnJlc2V0KCk7XG4gIH1cbn1cbiJdfQ==