/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { entityMeta } from '../entity/entity.action';
import { failMeta, loadMeta, resetMeta, successMeta, } from '../loader/loader.action';
export const ENTITY_LOAD_ACTION = '[ENTITY] LOAD';
export const ENTITY_FAIL_ACTION = '[ENTITY] LOAD FAIL';
export const ENTITY_SUCCESS_ACTION = '[ENTITY] LOAD SUCCESS';
export const ENTITY_RESET_ACTION = '[ENTITY] RESET';
export function entityLoadMeta(entityType, id) {
    return {
        ...loadMeta(entityType),
        ...entityMeta(entityType, id),
    };
}
export function entityFailMeta(entityType, id, error) {
    return {
        ...failMeta(entityType, error),
        ...entityMeta(entityType, id),
    };
}
export function entitySuccessMeta(entityType, id) {
    return {
        ...successMeta(entityType),
        ...entityMeta(entityType, id),
    };
}
export function entityResetMeta(entityType, id) {
    return {
        ...resetMeta(entityType),
        ...entityMeta(entityType, id),
    };
}
export class EntityLoadAction {
    constructor(entityType, id) {
        this.type = ENTITY_LOAD_ACTION;
        this.meta = entityLoadMeta(entityType, id);
    }
}
export class EntityFailAction {
    constructor(entityType, id, error) {
        this.type = ENTITY_FAIL_ACTION;
        this.meta = entityFailMeta(entityType, id, error);
    }
}
export class EntitySuccessAction {
    constructor(entityType, id, payload) {
        this.payload = payload;
        this.type = ENTITY_SUCCESS_ACTION;
        this.meta = entitySuccessMeta(entityType, id);
    }
}
export class EntityLoaderResetAction {
    constructor(entityType, id) {
        this.type = ENTITY_RESET_ACTION;
        this.meta = entityResetMeta(entityType, id);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWxvYWRlci5hY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9zdGF0ZS91dGlscy9lbnRpdHktbG9hZGVyL2VudGl0eS1sb2FkZXIuYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFHSCxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0seUJBQXlCLENBQUM7QUFDakUsT0FBTyxFQUNMLFFBQVEsRUFFUixRQUFRLEVBQ1IsU0FBUyxFQUNULFdBQVcsR0FDWixNQUFNLHlCQUF5QixDQUFDO0FBRWpDLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLGVBQWUsQ0FBQztBQUNsRCxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxvQkFBb0IsQ0FBQztBQUN2RCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyx1QkFBdUIsQ0FBQztBQUM3RCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxnQkFBZ0IsQ0FBQztBQVNwRCxNQUFNLFVBQVUsY0FBYyxDQUM1QixVQUFrQixFQUNsQixFQUE0QjtJQUU1QixPQUFPO1FBQ0wsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ3ZCLEdBQUcsVUFBVSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7S0FDOUIsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUM1QixVQUFrQixFQUNsQixFQUE0QixFQUM1QixLQUFXO0lBRVgsT0FBTztRQUNMLEdBQUcsUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7UUFDOUIsR0FBRyxVQUFVLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztLQUM5QixDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FDL0IsVUFBa0IsRUFDbEIsRUFBNEI7SUFFNUIsT0FBTztRQUNMLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUMxQixHQUFHLFVBQVUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzlCLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FDN0IsVUFBa0IsRUFDbEIsRUFBNkI7SUFFN0IsT0FBTztRQUNMLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQztRQUN4QixHQUFHLFVBQVUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzlCLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxPQUFPLGdCQUFnQjtJQUczQixZQUFZLFVBQWtCLEVBQUUsRUFBNEI7UUFGNUQsU0FBSSxHQUFHLGtCQUFrQixDQUFDO1FBR3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sZ0JBQWdCO0lBRzNCLFlBQVksVUFBa0IsRUFBRSxFQUE0QixFQUFFLEtBQVc7UUFGekUsU0FBSSxHQUFHLGtCQUFrQixDQUFDO1FBR3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QixZQUNFLFVBQWtCLEVBQ2xCLEVBQTRCLEVBQ3JCLE9BQWE7UUFBYixZQUFPLEdBQVAsT0FBTyxDQUFNO1FBTHRCLFNBQUksR0FBRyxxQkFBcUIsQ0FBQztRQU8zQixJQUFJLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sdUJBQXVCO0lBR2xDLFlBQVksVUFBa0IsRUFBRSxFQUE0QjtRQUY1RCxTQUFJLEdBQUcsbUJBQW1CLENBQUM7UUFHekIsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IGVudGl0eU1ldGEsIEVudGl0eU1ldGEgfSBmcm9tICcuLi9lbnRpdHkvZW50aXR5LmFjdGlvbic7XG5pbXBvcnQge1xuICBmYWlsTWV0YSxcbiAgTG9hZGVyTWV0YSxcbiAgbG9hZE1ldGEsXG4gIHJlc2V0TWV0YSxcbiAgc3VjY2Vzc01ldGEsXG59IGZyb20gJy4uL2xvYWRlci9sb2FkZXIuYWN0aW9uJztcblxuZXhwb3J0IGNvbnN0IEVOVElUWV9MT0FEX0FDVElPTiA9ICdbRU5USVRZXSBMT0FEJztcbmV4cG9ydCBjb25zdCBFTlRJVFlfRkFJTF9BQ1RJT04gPSAnW0VOVElUWV0gTE9BRCBGQUlMJztcbmV4cG9ydCBjb25zdCBFTlRJVFlfU1VDQ0VTU19BQ1RJT04gPSAnW0VOVElUWV0gTE9BRCBTVUNDRVNTJztcbmV4cG9ydCBjb25zdCBFTlRJVFlfUkVTRVRfQUNUSU9OID0gJ1tFTlRJVFldIFJFU0VUJztcblxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlMb2FkZXJNZXRhIGV4dGVuZHMgRW50aXR5TWV0YSwgTG9hZGVyTWV0YSB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eUxvYWRlckFjdGlvbiBleHRlbmRzIEFjdGlvbiB7XG4gIHJlYWRvbmx5IHBheWxvYWQ/OiBhbnk7XG4gIHJlYWRvbmx5IG1ldGE/OiBFbnRpdHlMb2FkZXJNZXRhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW50aXR5TG9hZE1ldGEoXG4gIGVudGl0eVR5cGU6IHN0cmluZyxcbiAgaWQ6IHN0cmluZyB8IHN0cmluZ1tdIHwgbnVsbFxuKTogRW50aXR5TG9hZGVyTWV0YSB7XG4gIHJldHVybiB7XG4gICAgLi4ubG9hZE1ldGEoZW50aXR5VHlwZSksXG4gICAgLi4uZW50aXR5TWV0YShlbnRpdHlUeXBlLCBpZCksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnRpdHlGYWlsTWV0YShcbiAgZW50aXR5VHlwZTogc3RyaW5nLFxuICBpZDogc3RyaW5nIHwgc3RyaW5nW10gfCBudWxsLFxuICBlcnJvcj86IGFueVxuKTogRW50aXR5TG9hZGVyTWV0YSB7XG4gIHJldHVybiB7XG4gICAgLi4uZmFpbE1ldGEoZW50aXR5VHlwZSwgZXJyb3IpLFxuICAgIC4uLmVudGl0eU1ldGEoZW50aXR5VHlwZSwgaWQpLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW50aXR5U3VjY2Vzc01ldGEoXG4gIGVudGl0eVR5cGU6IHN0cmluZyxcbiAgaWQ6IHN0cmluZyB8IHN0cmluZ1tdIHwgbnVsbFxuKTogRW50aXR5TG9hZGVyTWV0YSB7XG4gIHJldHVybiB7XG4gICAgLi4uc3VjY2Vzc01ldGEoZW50aXR5VHlwZSksXG4gICAgLi4uZW50aXR5TWV0YShlbnRpdHlUeXBlLCBpZCksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnRpdHlSZXNldE1ldGEoXG4gIGVudGl0eVR5cGU6IHN0cmluZyxcbiAgaWQ/OiBzdHJpbmcgfCBzdHJpbmdbXSB8IG51bGxcbik6IEVudGl0eUxvYWRlck1ldGEge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc2V0TWV0YShlbnRpdHlUeXBlKSxcbiAgICAuLi5lbnRpdHlNZXRhKGVudGl0eVR5cGUsIGlkKSxcbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIEVudGl0eUxvYWRBY3Rpb24gaW1wbGVtZW50cyBFbnRpdHlMb2FkZXJBY3Rpb24ge1xuICB0eXBlID0gRU5USVRZX0xPQURfQUNUSU9OO1xuICByZWFkb25seSBtZXRhOiBFbnRpdHlMb2FkZXJNZXRhO1xuICBjb25zdHJ1Y3RvcihlbnRpdHlUeXBlOiBzdHJpbmcsIGlkOiBzdHJpbmcgfCBzdHJpbmdbXSB8IG51bGwpIHtcbiAgICB0aGlzLm1ldGEgPSBlbnRpdHlMb2FkTWV0YShlbnRpdHlUeXBlLCBpZCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEVudGl0eUZhaWxBY3Rpb24gaW1wbGVtZW50cyBFbnRpdHlMb2FkZXJBY3Rpb24ge1xuICB0eXBlID0gRU5USVRZX0ZBSUxfQUNUSU9OO1xuICByZWFkb25seSBtZXRhOiBFbnRpdHlMb2FkZXJNZXRhO1xuICBjb25zdHJ1Y3RvcihlbnRpdHlUeXBlOiBzdHJpbmcsIGlkOiBzdHJpbmcgfCBzdHJpbmdbXSB8IG51bGwsIGVycm9yPzogYW55KSB7XG4gICAgdGhpcy5tZXRhID0gZW50aXR5RmFpbE1ldGEoZW50aXR5VHlwZSwgaWQsIGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW50aXR5U3VjY2Vzc0FjdGlvbiBpbXBsZW1lbnRzIEVudGl0eUxvYWRlckFjdGlvbiB7XG4gIHR5cGUgPSBFTlRJVFlfU1VDQ0VTU19BQ1RJT047XG4gIHJlYWRvbmx5IG1ldGE6IEVudGl0eUxvYWRlck1ldGE7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGVudGl0eVR5cGU6IHN0cmluZyxcbiAgICBpZDogc3RyaW5nIHwgc3RyaW5nW10gfCBudWxsLFxuICAgIHB1YmxpYyBwYXlsb2FkPzogYW55XG4gICkge1xuICAgIHRoaXMubWV0YSA9IGVudGl0eVN1Y2Nlc3NNZXRhKGVudGl0eVR5cGUsIGlkKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW50aXR5TG9hZGVyUmVzZXRBY3Rpb24gaW1wbGVtZW50cyBFbnRpdHlMb2FkZXJBY3Rpb24ge1xuICB0eXBlID0gRU5USVRZX1JFU0VUX0FDVElPTjtcbiAgcmVhZG9ubHkgbWV0YTogRW50aXR5TG9hZGVyTWV0YTtcbiAgY29uc3RydWN0b3IoZW50aXR5VHlwZTogc3RyaW5nLCBpZDogc3RyaW5nIHwgc3RyaW5nW10gfCBudWxsKSB7XG4gICAgdGhpcy5tZXRhID0gZW50aXR5UmVzZXRNZXRhKGVudGl0eVR5cGUsIGlkKTtcbiAgfVxufVxuIl19