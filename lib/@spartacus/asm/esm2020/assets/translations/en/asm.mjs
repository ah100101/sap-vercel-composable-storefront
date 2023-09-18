/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const asm = {
    asm: {
        mainLogoLabel: 'SAP',
        mainTitle: 'Assisted Service Mode',
        logout: 'Sign Out',
        hideUi: 'Close ASM',
        customers: 'Customers',
        toggleUi: {
            collapse: 'Hide ASM',
            expand: 'Show ASM',
        },
        loginForm: {
            submit: 'Sign In',
            userId: {
                label: 'Agent ID',
                required: 'Agent ID is required',
            },
            password: {
                label: 'Password',
                required: 'Password is required',
            },
        },
        customerSearch: {
            searchTerm: {
                label: 'Customer Name/Email Address',
            },
            submit: 'Start Session',
            noMatch: 'No customer found.',
        },
        customerList: {
            title: 'Customer List',
            description: 'Select a customer from one of several provided lists.',
            tableHeader: {
                customer: 'Customer',
                name: 'Name',
                email: 'Email',
                phone: 'Phone',
                cart: 'Cart',
                order: 'Order',
            },
            tableSort: {
                sortBy: 'Sort by',
                byNameAsc: 'Name (Asc)',
                byNameDesc: 'Name (Desc)',
                byDateAsc: 'Date (Asc)',
                byDateDesc: 'Date (Desc)',
                byOrderDateAsc: 'Order date (Asc)',
                byOrderDateDesc: 'Order date (Desc)',
            },
            page: {
                page: 'Page {{count}}',
                previous: 'Previous',
                next: 'Next',
            },
            noOfCustomers: '{{count}} Customers',
            noCustomers: 'There are currently no customers in this customer list.',
            noLists: 'There are currently no customer lists available. Contact your system administrator.',
            listsError: 'The customer lists could not be retrieved. Please try again later.',
        },
        bindCart: {
            cartNumber: 'Cart Number',
            bindCartToCustomer: 'Assign Cart to Customer',
            success: 'Cart has been successfully assigned',
            assignCartId: 'Assign a cart id to customer',
            enterCartId: 'Enter cart id',
            resetCartId: 'Reset',
            dialog: {
                title: 'Assign Anonymous Cart',
                body: 'Do you want to replace the current active cart with the anonymous cart? If you replace the current active cart, it is saved as a saved cart.',
                actions: {
                    replace: 'Replace Cart',
                },
            },
        },
        csagentTokenExpired: 'Your customer support agent session is expired.',
        endSession: 'End Session',
        agentSessionTimer: {
            label: 'Session Timeout',
            minutes: 'min',
            reset: 'Reset',
        },
        auth: {
            agentLoggedInError: 'Cannot login as user when there is an active CS agent session. Please either emulate user or logout CS agent.',
        },
        error: {
            noCustomerId: 'No customerId found for selected user. Session cannot be started.',
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9hc3NldHMvdHJhbnNsYXRpb25zL2VuL2FzbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHO0lBQ2pCLEdBQUcsRUFBRTtRQUNILGFBQWEsRUFBRSxLQUFLO1FBQ3BCLFNBQVMsRUFBRSx1QkFBdUI7UUFDbEMsTUFBTSxFQUFFLFVBQVU7UUFDbEIsTUFBTSxFQUFFLFdBQVc7UUFDbkIsU0FBUyxFQUFFLFdBQVc7UUFDdEIsUUFBUSxFQUFFO1lBQ1IsUUFBUSxFQUFFLFVBQVU7WUFDcEIsTUFBTSxFQUFFLFVBQVU7U0FDbkI7UUFDRCxTQUFTLEVBQUU7WUFDVCxNQUFNLEVBQUUsU0FBUztZQUNqQixNQUFNLEVBQUU7Z0JBQ04sS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFFBQVEsRUFBRSxzQkFBc0I7YUFDakM7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFFBQVEsRUFBRSxzQkFBc0I7YUFDakM7U0FDRjtRQUNELGNBQWMsRUFBRTtZQUNkLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsNkJBQTZCO2FBQ3JDO1lBQ0QsTUFBTSxFQUFFLGVBQWU7WUFDdkIsT0FBTyxFQUFFLG9CQUFvQjtTQUM5QjtRQUNELFlBQVksRUFBRTtZQUNaLEtBQUssRUFBRSxlQUFlO1lBQ3RCLFdBQVcsRUFBRSx1REFBdUQ7WUFDcEUsV0FBVyxFQUFFO2dCQUNYLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsT0FBTztnQkFDZCxJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUsT0FBTzthQUNmO1lBQ0QsU0FBUyxFQUFFO2dCQUNULE1BQU0sRUFBRSxTQUFTO2dCQUNqQixTQUFTLEVBQUUsWUFBWTtnQkFDdkIsVUFBVSxFQUFFLGFBQWE7Z0JBQ3pCLFNBQVMsRUFBRSxZQUFZO2dCQUN2QixVQUFVLEVBQUUsYUFBYTtnQkFDekIsY0FBYyxFQUFFLGtCQUFrQjtnQkFDbEMsZUFBZSxFQUFFLG1CQUFtQjthQUNyQztZQUNELElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNELGFBQWEsRUFBRSxxQkFBcUI7WUFDcEMsV0FBVyxFQUFFLHlEQUF5RDtZQUN0RSxPQUFPLEVBQ0wscUZBQXFGO1lBQ3ZGLFVBQVUsRUFDUixvRUFBb0U7U0FDdkU7UUFDRCxRQUFRLEVBQUU7WUFDUixVQUFVLEVBQUUsYUFBYTtZQUN6QixrQkFBa0IsRUFBRSx5QkFBeUI7WUFDN0MsT0FBTyxFQUFFLHFDQUFxQztZQUM5QyxZQUFZLEVBQUUsOEJBQThCO1lBQzVDLFdBQVcsRUFBRSxlQUFlO1lBQzVCLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUUsdUJBQXVCO2dCQUM5QixJQUFJLEVBQUUsOElBQThJO2dCQUNwSixPQUFPLEVBQUU7b0JBQ1AsT0FBTyxFQUFFLGNBQWM7aUJBQ3hCO2FBQ0Y7U0FDRjtRQUNELG1CQUFtQixFQUFFLGlEQUFpRDtRQUN0RSxVQUFVLEVBQUUsYUFBYTtRQUN6QixpQkFBaUIsRUFBRTtZQUNqQixLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLE9BQU87U0FDZjtRQUNELElBQUksRUFBRTtZQUNKLGtCQUFrQixFQUNoQiwrR0FBK0c7U0FDbEg7UUFDRCxLQUFLLEVBQUU7WUFDTCxZQUFZLEVBQ1YsbUVBQW1FO1NBQ3RFO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuZXhwb3J0IGNvbnN0IGFzbSA9IHtcbiAgYXNtOiB7XG4gICAgbWFpbkxvZ29MYWJlbDogJ1NBUCcsXG4gICAgbWFpblRpdGxlOiAnQXNzaXN0ZWQgU2VydmljZSBNb2RlJyxcbiAgICBsb2dvdXQ6ICdTaWduIE91dCcsXG4gICAgaGlkZVVpOiAnQ2xvc2UgQVNNJyxcbiAgICBjdXN0b21lcnM6ICdDdXN0b21lcnMnLFxuICAgIHRvZ2dsZVVpOiB7XG4gICAgICBjb2xsYXBzZTogJ0hpZGUgQVNNJyxcbiAgICAgIGV4cGFuZDogJ1Nob3cgQVNNJyxcbiAgICB9LFxuICAgIGxvZ2luRm9ybToge1xuICAgICAgc3VibWl0OiAnU2lnbiBJbicsXG4gICAgICB1c2VySWQ6IHtcbiAgICAgICAgbGFiZWw6ICdBZ2VudCBJRCcsXG4gICAgICAgIHJlcXVpcmVkOiAnQWdlbnQgSUQgaXMgcmVxdWlyZWQnLFxuICAgICAgfSxcbiAgICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIGxhYmVsOiAnUGFzc3dvcmQnLFxuICAgICAgICByZXF1aXJlZDogJ1Bhc3N3b3JkIGlzIHJlcXVpcmVkJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjdXN0b21lclNlYXJjaDoge1xuICAgICAgc2VhcmNoVGVybToge1xuICAgICAgICBsYWJlbDogJ0N1c3RvbWVyIE5hbWUvRW1haWwgQWRkcmVzcycsXG4gICAgICB9LFxuICAgICAgc3VibWl0OiAnU3RhcnQgU2Vzc2lvbicsXG4gICAgICBub01hdGNoOiAnTm8gY3VzdG9tZXIgZm91bmQuJyxcbiAgICB9LFxuICAgIGN1c3RvbWVyTGlzdDoge1xuICAgICAgdGl0bGU6ICdDdXN0b21lciBMaXN0JyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnU2VsZWN0IGEgY3VzdG9tZXIgZnJvbSBvbmUgb2Ygc2V2ZXJhbCBwcm92aWRlZCBsaXN0cy4nLFxuICAgICAgdGFibGVIZWFkZXI6IHtcbiAgICAgICAgY3VzdG9tZXI6ICdDdXN0b21lcicsXG4gICAgICAgIG5hbWU6ICdOYW1lJyxcbiAgICAgICAgZW1haWw6ICdFbWFpbCcsXG4gICAgICAgIHBob25lOiAnUGhvbmUnLFxuICAgICAgICBjYXJ0OiAnQ2FydCcsXG4gICAgICAgIG9yZGVyOiAnT3JkZXInLFxuICAgICAgfSxcbiAgICAgIHRhYmxlU29ydDoge1xuICAgICAgICBzb3J0Qnk6ICdTb3J0IGJ5JyxcbiAgICAgICAgYnlOYW1lQXNjOiAnTmFtZSAoQXNjKScsXG4gICAgICAgIGJ5TmFtZURlc2M6ICdOYW1lIChEZXNjKScsXG4gICAgICAgIGJ5RGF0ZUFzYzogJ0RhdGUgKEFzYyknLFxuICAgICAgICBieURhdGVEZXNjOiAnRGF0ZSAoRGVzYyknLFxuICAgICAgICBieU9yZGVyRGF0ZUFzYzogJ09yZGVyIGRhdGUgKEFzYyknLFxuICAgICAgICBieU9yZGVyRGF0ZURlc2M6ICdPcmRlciBkYXRlIChEZXNjKScsXG4gICAgICB9LFxuICAgICAgcGFnZToge1xuICAgICAgICBwYWdlOiAnUGFnZSB7e2NvdW50fX0nLFxuICAgICAgICBwcmV2aW91czogJ1ByZXZpb3VzJyxcbiAgICAgICAgbmV4dDogJ05leHQnLFxuICAgICAgfSxcbiAgICAgIG5vT2ZDdXN0b21lcnM6ICd7e2NvdW50fX0gQ3VzdG9tZXJzJyxcbiAgICAgIG5vQ3VzdG9tZXJzOiAnVGhlcmUgYXJlIGN1cnJlbnRseSBubyBjdXN0b21lcnMgaW4gdGhpcyBjdXN0b21lciBsaXN0LicsXG4gICAgICBub0xpc3RzOlxuICAgICAgICAnVGhlcmUgYXJlIGN1cnJlbnRseSBubyBjdXN0b21lciBsaXN0cyBhdmFpbGFibGUuIENvbnRhY3QgeW91ciBzeXN0ZW0gYWRtaW5pc3RyYXRvci4nLFxuICAgICAgbGlzdHNFcnJvcjpcbiAgICAgICAgJ1RoZSBjdXN0b21lciBsaXN0cyBjb3VsZCBub3QgYmUgcmV0cmlldmVkLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicsXG4gICAgfSxcbiAgICBiaW5kQ2FydDoge1xuICAgICAgY2FydE51bWJlcjogJ0NhcnQgTnVtYmVyJyxcbiAgICAgIGJpbmRDYXJ0VG9DdXN0b21lcjogJ0Fzc2lnbiBDYXJ0IHRvIEN1c3RvbWVyJyxcbiAgICAgIHN1Y2Nlc3M6ICdDYXJ0IGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBhc3NpZ25lZCcsXG4gICAgICBhc3NpZ25DYXJ0SWQ6ICdBc3NpZ24gYSBjYXJ0IGlkIHRvIGN1c3RvbWVyJyxcbiAgICAgIGVudGVyQ2FydElkOiAnRW50ZXIgY2FydCBpZCcsXG4gICAgICByZXNldENhcnRJZDogJ1Jlc2V0JyxcbiAgICAgIGRpYWxvZzoge1xuICAgICAgICB0aXRsZTogJ0Fzc2lnbiBBbm9ueW1vdXMgQ2FydCcsXG4gICAgICAgIGJvZHk6ICdEbyB5b3Ugd2FudCB0byByZXBsYWNlIHRoZSBjdXJyZW50IGFjdGl2ZSBjYXJ0IHdpdGggdGhlIGFub255bW91cyBjYXJ0PyBJZiB5b3UgcmVwbGFjZSB0aGUgY3VycmVudCBhY3RpdmUgY2FydCwgaXQgaXMgc2F2ZWQgYXMgYSBzYXZlZCBjYXJ0LicsXG4gICAgICAgIGFjdGlvbnM6IHtcbiAgICAgICAgICByZXBsYWNlOiAnUmVwbGFjZSBDYXJ0JyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjc2FnZW50VG9rZW5FeHBpcmVkOiAnWW91ciBjdXN0b21lciBzdXBwb3J0IGFnZW50IHNlc3Npb24gaXMgZXhwaXJlZC4nLFxuICAgIGVuZFNlc3Npb246ICdFbmQgU2Vzc2lvbicsXG4gICAgYWdlbnRTZXNzaW9uVGltZXI6IHtcbiAgICAgIGxhYmVsOiAnU2Vzc2lvbiBUaW1lb3V0JyxcbiAgICAgIG1pbnV0ZXM6ICdtaW4nLFxuICAgICAgcmVzZXQ6ICdSZXNldCcsXG4gICAgfSxcbiAgICBhdXRoOiB7XG4gICAgICBhZ2VudExvZ2dlZEluRXJyb3I6XG4gICAgICAgICdDYW5ub3QgbG9naW4gYXMgdXNlciB3aGVuIHRoZXJlIGlzIGFuIGFjdGl2ZSBDUyBhZ2VudCBzZXNzaW9uLiBQbGVhc2UgZWl0aGVyIGVtdWxhdGUgdXNlciBvciBsb2dvdXQgQ1MgYWdlbnQuJyxcbiAgICB9LFxuICAgIGVycm9yOiB7XG4gICAgICBub0N1c3RvbWVySWQ6XG4gICAgICAgICdObyBjdXN0b21lcklkIGZvdW5kIGZvciBzZWxlY3RlZCB1c2VyLiBTZXNzaW9uIGNhbm5vdCBiZSBzdGFydGVkLicsXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=