/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Abstract class that can be used to resolve meta data for specific pages.
 * The `getScore` method is used to select the right resolver for a specific
 * page, based on a score. The score is calculated by the (non)matching page
 * type, page template, and uid.
 */
export class PageMetaResolver {
    /**
     * Returns the matching score for a resolver class, based on
     * the page type and page template.
     */
    getScore(page) {
        let score = 0;
        if (this.pageType) {
            score += page.type === this.pageType ? 1 : -1;
        }
        if (this.pageTemplate) {
            score += page.template === this.pageTemplate ? 1 : -1;
        }
        if (this.pageUid) {
            score += page.pageId === this.pageUid ? 10 : -10;
        }
        return score;
    }
    hasMatch(page) {
        return this.getScore(page) > 0;
    }
    getPriority(page) {
        return this.getScore(page);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1tZXRhLnJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvY21zL3BhZ2UvcGFnZS1tZXRhLnJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFNSDs7Ozs7R0FLRztBQUNILE1BQU0sT0FBZ0IsZ0JBQWdCO0lBVXBDOzs7T0FHRztJQUNILFFBQVEsQ0FBQyxJQUFVO1FBQ2pCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixLQUFLLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkQ7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUNsRDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFVO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBQYWdlVHlwZSB9IGZyb20gJy4uLy4uL21vZGVsL2Ntcy5tb2RlbCc7XG5pbXBvcnQgeyBBcHBsaWNhYmxlIH0gZnJvbSAnLi4vLi4vdXRpbC9hcHBsaWNhYmxlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuLi9tb2RlbC9wYWdlLm1vZGVsJztcblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlc29sdmUgbWV0YSBkYXRhIGZvciBzcGVjaWZpYyBwYWdlcy5cbiAqIFRoZSBgZ2V0U2NvcmVgIG1ldGhvZCBpcyB1c2VkIHRvIHNlbGVjdCB0aGUgcmlnaHQgcmVzb2x2ZXIgZm9yIGEgc3BlY2lmaWNcbiAqIHBhZ2UsIGJhc2VkIG9uIGEgc2NvcmUuIFRoZSBzY29yZSBpcyBjYWxjdWxhdGVkIGJ5IHRoZSAobm9uKW1hdGNoaW5nIHBhZ2VcbiAqIHR5cGUsIHBhZ2UgdGVtcGxhdGUsIGFuZCB1aWQuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYWdlTWV0YVJlc29sdmVyIGltcGxlbWVudHMgQXBwbGljYWJsZSB7XG4gIC8qKiBUaGUgYFBhZ2VUeXBlYCBpcyB1c2VkIHRvIHNjb3JlIHRoZSAobm9uKW1hdGNoaW5nIHBhZ2UgKi9cbiAgcGFnZVR5cGU6IFBhZ2VUeXBlO1xuXG4gIC8qKiBUaGUgcGFnZSB0ZW1wbGF0ZSBpcyB1c2VkIHRvIHNjb3JlIHRoZSAobm9uKW1hdGNoaW5nIHBhZ2UgdGVtcGxhdGUgKi9cbiAgcGFnZVRlbXBsYXRlOiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBwYWdlIHVpZCBpcyB1c2VkIHRvIHNjb3JlIHRoZSAobm9uKW1hdGNoaW5nIHBhZ2UgaWRzICovXG4gIHBhZ2VVaWQ6IHN0cmluZztcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbWF0Y2hpbmcgc2NvcmUgZm9yIGEgcmVzb2x2ZXIgY2xhc3MsIGJhc2VkIG9uXG4gICAqIHRoZSBwYWdlIHR5cGUgYW5kIHBhZ2UgdGVtcGxhdGUuXG4gICAqL1xuICBnZXRTY29yZShwYWdlOiBQYWdlKTogbnVtYmVyIHtcbiAgICBsZXQgc2NvcmUgPSAwO1xuICAgIGlmICh0aGlzLnBhZ2VUeXBlKSB7XG4gICAgICBzY29yZSArPSBwYWdlLnR5cGUgPT09IHRoaXMucGFnZVR5cGUgPyAxIDogLTE7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhZ2VUZW1wbGF0ZSkge1xuICAgICAgc2NvcmUgKz0gcGFnZS50ZW1wbGF0ZSA9PT0gdGhpcy5wYWdlVGVtcGxhdGUgPyAxIDogLTE7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFnZVVpZCkge1xuICAgICAgc2NvcmUgKz0gcGFnZS5wYWdlSWQgPT09IHRoaXMucGFnZVVpZCA/IDEwIDogLTEwO1xuICAgIH1cblxuICAgIHJldHVybiBzY29yZTtcbiAgfVxuXG4gIGhhc01hdGNoKHBhZ2U6IFBhZ2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRTY29yZShwYWdlKSA+IDA7XG4gIH1cblxuICBnZXRQcmlvcml0eShwYWdlOiBQYWdlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXRTY29yZShwYWdlKTtcbiAgfVxufVxuIl19