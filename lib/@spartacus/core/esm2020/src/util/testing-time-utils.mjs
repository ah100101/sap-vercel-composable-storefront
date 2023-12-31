/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export class TestingTimeUtils {
    static fakeToLocaleTimeString(mockTime, callback) {
        const original = Date.prototype.toLocaleTimeString;
        Date.prototype.toLocaleTimeString = () => mockTime;
        callback();
        Date.prototype.toLocaleTimeString = original;
    }
    static fakeDateTimezoneOffset(offset, callback) {
        const original = Date.prototype.getTimezoneOffset;
        Date.prototype.getTimezoneOffset = () => offset;
        callback();
        Date.prototype.getTimezoneOffset = original;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy10aW1lLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvdXRpbC90ZXN0aW5nLXRpbWUtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsTUFBTSxDQUFDLHNCQUFzQixDQUFDLFFBQWdCLEVBQUUsUUFBa0I7UUFDaEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQztRQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixHQUFHLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNuRCxRQUFRLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDO0lBQy9DLENBQUM7SUFFRCxNQUFNLENBQUMsc0JBQXNCLENBQUMsTUFBYyxFQUFFLFFBQWtCO1FBQzlELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUM7UUFDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDaEQsUUFBUSxFQUFFLENBQUM7UUFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztJQUM5QyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgY2xhc3MgVGVzdGluZ1RpbWVVdGlscyB7XG4gIHN0YXRpYyBmYWtlVG9Mb2NhbGVUaW1lU3RyaW5nKG1vY2tUaW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IGFueSB7XG4gICAgY29uc3Qgb3JpZ2luYWwgPSBEYXRlLnByb3RvdHlwZS50b0xvY2FsZVRpbWVTdHJpbmc7XG4gICAgRGF0ZS5wcm90b3R5cGUudG9Mb2NhbGVUaW1lU3RyaW5nID0gKCkgPT4gbW9ja1RpbWU7XG4gICAgY2FsbGJhY2soKTtcbiAgICBEYXRlLnByb3RvdHlwZS50b0xvY2FsZVRpbWVTdHJpbmcgPSBvcmlnaW5hbDtcbiAgfVxuXG4gIHN0YXRpYyBmYWtlRGF0ZVRpbWV6b25lT2Zmc2V0KG9mZnNldDogbnVtYmVyLCBjYWxsYmFjazogRnVuY3Rpb24pOiBhbnkge1xuICAgIGNvbnN0IG9yaWdpbmFsID0gRGF0ZS5wcm90b3R5cGUuZ2V0VGltZXpvbmVPZmZzZXQ7XG4gICAgRGF0ZS5wcm90b3R5cGUuZ2V0VGltZXpvbmVPZmZzZXQgPSAoKSA9PiBvZmZzZXQ7XG4gICAgY2FsbGJhY2soKTtcbiAgICBEYXRlLnByb3RvdHlwZS5nZXRUaW1lem9uZU9mZnNldCA9IG9yaWdpbmFsO1xuICB9XG59XG4iXX0=