/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DirectionMode } from './direction.model';
export const defaultDirectionConfig = {
    direction: {
        detect: true,
        default: DirectionMode.LTR,
        // we're not polluting the system with all defaults for ltr, but add 2 common used
        // languages (hebrew and arabic) to easily demo directionality
        // see https://meta.wikimedia.org/wiki/Template:List_of_language_names_ordered_by_code
        rtlLanguages: ['he', 'ar'],
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1kaXJlY3Rpb24uY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9sYXlvdXQvZGlyZWN0aW9uL2NvbmZpZy9kZWZhdWx0LWRpcmVjdGlvbi5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUdILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVsRCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBb0I7SUFDckQsU0FBUyxFQUFFO1FBQ1QsTUFBTSxFQUFFLElBQUk7UUFDWixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUc7UUFDMUIsa0ZBQWtGO1FBQ2xGLDhEQUE4RDtRQUM5RCxzRkFBc0Y7UUFDdEYsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztLQUMzQjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25Db25maWcgfSBmcm9tICcuL2RpcmVjdGlvbi5jb25maWcnO1xuaW1wb3J0IHsgRGlyZWN0aW9uTW9kZSB9IGZyb20gJy4vZGlyZWN0aW9uLm1vZGVsJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHREaXJlY3Rpb25Db25maWc6IERpcmVjdGlvbkNvbmZpZyA9IHtcbiAgZGlyZWN0aW9uOiB7XG4gICAgZGV0ZWN0OiB0cnVlLFxuICAgIGRlZmF1bHQ6IERpcmVjdGlvbk1vZGUuTFRSLFxuICAgIC8vIHdlJ3JlIG5vdCBwb2xsdXRpbmcgdGhlIHN5c3RlbSB3aXRoIGFsbCBkZWZhdWx0cyBmb3IgbHRyLCBidXQgYWRkIDIgY29tbW9uIHVzZWRcbiAgICAvLyBsYW5ndWFnZXMgKGhlYnJldyBhbmQgYXJhYmljKSB0byBlYXNpbHkgZGVtbyBkaXJlY3Rpb25hbGl0eVxuICAgIC8vIHNlZSBodHRwczovL21ldGEud2lraW1lZGlhLm9yZy93aWtpL1RlbXBsYXRlOkxpc3Rfb2ZfbGFuZ3VhZ2VfbmFtZXNfb3JkZXJlZF9ieV9jb2RlXG4gICAgcnRsTGFuZ3VhZ2VzOiBbJ2hlJywgJ2FyJ10sXG4gIH0sXG59O1xuIl19