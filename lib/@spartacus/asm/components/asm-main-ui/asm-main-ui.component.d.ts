import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { AsmService } from '@spartacus/asm/core';
import { CsAgentAuthService } from '@spartacus/asm/root';
import { AuthService, GlobalMessageService, RoutingService, User } from '@spartacus/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, Subscription } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';
import * as i0 from "@angular/core";
export declare class AsmMainUiComponent implements OnInit, OnDestroy {
    protected authService: AuthService;
    protected csAgentAuthService: CsAgentAuthService;
    protected asmComponentService: AsmComponentService;
    protected globalMessageService: GlobalMessageService;
    protected routingService: RoutingService;
    protected asmService: AsmService;
    protected userAccountFacade: UserAccountFacade;
    protected launchDialogService: LaunchDialogService;
    customerSupportAgentLoggedIn$: Observable<boolean>;
    csAgentTokenLoading$: Observable<boolean>;
    customer$: Observable<User | undefined>;
    isCollapsed$: Observable<boolean> | undefined;
    iconTypes: typeof ICON_TYPE;
    disabled: boolean;
    protected startingCustomerSession: boolean;
    subscription: Subscription;
    element: ElementRef;
    constructor(authService: AuthService, csAgentAuthService: CsAgentAuthService, asmComponentService: AsmComponentService, globalMessageService: GlobalMessageService, routingService: RoutingService, asmService: AsmService, userAccountFacade: UserAccountFacade, launchDialogService: LaunchDialogService);
    ngOnInit(): void;
    protected handleCustomerSessionStartRedirection(): void;
    loginCustomerSupportAgent({ userId, password, }: {
        userId: string;
        password: string;
    }): void;
    logout(): void;
    startCustomerEmulationSession({ customerId }: {
        customerId?: string;
    }): void;
    hideUi(): void;
    showCustomList(): void;
    closeModal(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmMainUiComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmMainUiComponent, "cx-asm-main-ui", never, {}, {}, never, never, false, never>;
}
