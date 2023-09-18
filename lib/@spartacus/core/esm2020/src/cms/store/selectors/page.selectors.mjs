/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { createSelector } from '@ngrx/store';
import { PageType } from '../../../model/cms.model';
import { StateUtils } from '../../../state/utils/index';
import { getCmsState } from './feature.selectors';
const getPageEntitiesSelector = (state) => state.pageData.entities;
const getIndexByType = (index, type) => {
    switch (type) {
        case PageType.CONTENT_PAGE: {
            return index.content;
        }
        case PageType.PRODUCT_PAGE: {
            return index.product;
        }
        case PageType.CATEGORY_PAGE: {
            return index.category;
        }
        case PageType.CATALOG_PAGE: {
            return index.catalog;
        }
        default: {
            return { entities: {} };
        }
    }
};
const getPageComponentTypesSelector = (page) => {
    const componentTypes = new Set();
    if (page && page.slots) {
        for (const slot of Object.keys(page.slots)) {
            for (const component of page.slots[slot].components || []) {
                componentTypes.add(component.flexType ?? '');
            }
        }
    }
    return Array.from(componentTypes);
};
export const getPageState = createSelector(getCmsState, (state) => state.page);
export const getPageStateIndex = createSelector(getPageState, (page) => page.index);
export const getPageStateIndexEntityLoaderState = (pageContext) => createSelector(getPageStateIndex, (index) => getIndexByType(index, pageContext.type));
export const getPageStateIndexLoaderState = (pageContext) => createSelector(getPageStateIndexEntityLoaderState(pageContext), (indexState) => StateUtils.entityLoaderStateSelector(indexState, pageContext.id));
export const getPageStateIndexValue = (pageContext) => createSelector(getPageStateIndexLoaderState(pageContext), (entity) => StateUtils.loaderValueSelector(entity));
export const getPageEntities = createSelector(getPageState, getPageEntitiesSelector);
export const getPageData = (pageContext) => createSelector(getPageEntities, getPageStateIndexValue(pageContext), (entities, indexValue) => entities[indexValue]);
export const getPageComponentTypes = (pageContext) => createSelector(getPageData(pageContext), (pageData) => getPageComponentTypesSelector(pageData));
export const getCurrentSlotSelectorFactory = (pageContext, position) => {
    return createSelector(getPageData(pageContext), (entity) => {
        if (entity) {
            return entity.slots?.[position] || { components: [] };
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5zZWxlY3RvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9jbXMvc3RvcmUvc2VsZWN0b3JzL3BhZ2Uuc2VsZWN0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsY0FBYyxFQUFvQixNQUFNLGFBQWEsQ0FBQztBQUMvRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSXhELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVsRCxNQUFNLHVCQUF1QixHQUFHLENBQUMsS0FBZ0IsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7QUFDOUUsTUFBTSxjQUFjLEdBQUcsQ0FDckIsS0FBZ0IsRUFDaEIsSUFBZSxFQUN1QixFQUFFO0lBQ3hDLFFBQVEsSUFBSSxFQUFFO1FBQ1osS0FBSyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQ3RCO1FBQ0QsS0FBSyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQ3RCO1FBQ0QsS0FBSyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDM0IsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDO1NBQ3ZCO1FBQ0QsS0FBSyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxDQUFDLENBQUM7WUFDUCxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDO1NBQ3pCO0tBQ0Y7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLDZCQUE2QixH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ZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yLCBNZW1vaXplZFNlbGVjdG9yIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgUGFnZVR5cGUgfSBmcm9tICcuLi8uLi8uLi9tb2RlbC9jbXMubW9kZWwnO1xuaW1wb3J0IHsgUGFnZUNvbnRleHQgfSBmcm9tICcuLi8uLi8uLi9yb3V0aW5nJztcbmltcG9ydCB7IFN0YXRlVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS91dGlscy9pbmRleCc7XG5pbXBvcnQgeyBDb250ZW50U2xvdERhdGEgfSBmcm9tICcuLi8uLi9tb2RlbC9jb250ZW50LXNsb3QtZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWwvcGFnZS5tb2RlbCc7XG5pbXBvcnQgeyBDbXNTdGF0ZSwgSW5kZXhUeXBlLCBQYWdlU3RhdGUsIFN0YXRlV2l0aENtcyB9IGZyb20gJy4uL2Ntcy1zdGF0ZSc7XG5pbXBvcnQgeyBnZXRDbXNTdGF0ZSB9IGZyb20gJy4vZmVhdHVyZS5zZWxlY3RvcnMnO1xuXG5jb25zdCBnZXRQYWdlRW50aXRpZXNTZWxlY3RvciA9IChzdGF0ZTogUGFnZVN0YXRlKSA9PiBzdGF0ZS5wYWdlRGF0YS5lbnRpdGllcztcbmNvbnN0IGdldEluZGV4QnlUeXBlID0gKFxuICBpbmRleDogSW5kZXhUeXBlLFxuICB0eXBlPzogUGFnZVR5cGVcbik6IFN0YXRlVXRpbHMuRW50aXR5TG9hZGVyU3RhdGU8c3RyaW5nPiA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgUGFnZVR5cGUuQ09OVEVOVF9QQUdFOiB7XG4gICAgICByZXR1cm4gaW5kZXguY29udGVudDtcbiAgICB9XG4gICAgY2FzZSBQYWdlVHlwZS5QUk9EVUNUX1BBR0U6IHtcbiAgICAgIHJldHVybiBpbmRleC5wcm9kdWN0O1xuICAgIH1cbiAgICBjYXNlIFBhZ2VUeXBlLkNBVEVHT1JZX1BBR0U6IHtcbiAgICAgIHJldHVybiBpbmRleC5jYXRlZ29yeTtcbiAgICB9XG4gICAgY2FzZSBQYWdlVHlwZS5DQVRBTE9HX1BBR0U6IHtcbiAgICAgIHJldHVybiBpbmRleC5jYXRhbG9nO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4geyBlbnRpdGllczoge30gfTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGdldFBhZ2VDb21wb25lbnRUeXBlc1NlbGVjdG9yOiAocGFnZTogUGFnZSkgPT4gc3RyaW5nW10gPSAoXG4gIHBhZ2U6IFBhZ2VcbikgPT4ge1xuICBjb25zdCBjb21wb25lbnRUeXBlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBpZiAocGFnZSAmJiBwYWdlLnNsb3RzKSB7XG4gICAgZm9yIChjb25zdCBzbG90IG9mIE9iamVjdC5rZXlzKHBhZ2Uuc2xvdHMpKSB7XG4gICAgICBmb3IgKGNvbnN0IGNvbXBvbmVudCBvZiBwYWdlLnNsb3RzW3Nsb3RdLmNvbXBvbmVudHMgfHwgW10pIHtcbiAgICAgICAgY29tcG9uZW50VHlwZXMuYWRkKGNvbXBvbmVudC5mbGV4VHlwZSA/PyAnJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBBcnJheS5mcm9tKGNvbXBvbmVudFR5cGVzKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRQYWdlU3RhdGU6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGVXaXRoQ21zLCBQYWdlU3RhdGU+ID1cbiAgY3JlYXRlU2VsZWN0b3IoZ2V0Q21zU3RhdGUsIChzdGF0ZTogQ21zU3RhdGUpID0+IHN0YXRlLnBhZ2UpO1xuXG5leHBvcnQgY29uc3QgZ2V0UGFnZVN0YXRlSW5kZXg6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGVXaXRoQ21zLCBJbmRleFR5cGU+ID1cbiAgY3JlYXRlU2VsZWN0b3IoZ2V0UGFnZVN0YXRlLCAocGFnZTogUGFnZVN0YXRlKSA9PiBwYWdlLmluZGV4KTtcblxuZXhwb3J0IGNvbnN0IGdldFBhZ2VTdGF0ZUluZGV4RW50aXR5TG9hZGVyU3RhdGUgPSAoXG4gIHBhZ2VDb250ZXh0OiBQYWdlQ29udGV4dFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZVdpdGhDbXMsIFN0YXRlVXRpbHMuRW50aXR5TG9hZGVyU3RhdGU8c3RyaW5nPj4gPT5cbiAgY3JlYXRlU2VsZWN0b3IoZ2V0UGFnZVN0YXRlSW5kZXgsIChpbmRleDogSW5kZXhUeXBlKSA9PlxuICAgIGdldEluZGV4QnlUeXBlKGluZGV4LCBwYWdlQ29udGV4dC50eXBlKVxuICApO1xuXG5leHBvcnQgY29uc3QgZ2V0UGFnZVN0YXRlSW5kZXhMb2FkZXJTdGF0ZSA9IChcbiAgcGFnZUNvbnRleHQ6IFBhZ2VDb250ZXh0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlV2l0aENtcywgU3RhdGVVdGlscy5Mb2FkZXJTdGF0ZTxzdHJpbmc+PiA9PlxuICBjcmVhdGVTZWxlY3RvcihcbiAgICBnZXRQYWdlU3RhdGVJbmRleEVudGl0eUxvYWRlclN0YXRlKHBhZ2VDb250ZXh0KSxcbiAgICAoaW5kZXhTdGF0ZSkgPT5cbiAgICAgIFN0YXRlVXRpbHMuZW50aXR5TG9hZGVyU3RhdGVTZWxlY3RvcihpbmRleFN0YXRlLCBwYWdlQ29udGV4dC5pZClcbiAgKTtcblxuZXhwb3J0IGNvbnN0IGdldFBhZ2VTdGF0ZUluZGV4VmFsdWUgPSAoXG4gIHBhZ2VDb250ZXh0OiBQYWdlQ29udGV4dFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZVdpdGhDbXMsIHN0cmluZz4gPT5cbiAgY3JlYXRlU2VsZWN0b3IoZ2V0UGFnZVN0YXRlSW5kZXhMb2FkZXJTdGF0ZShwYWdlQ29udGV4dCksIChlbnRpdHkpID0+XG4gICAgU3RhdGVVdGlscy5sb2FkZXJWYWx1ZVNlbGVjdG9yPHN0cmluZz4oZW50aXR5KVxuICApO1xuXG5leHBvcnQgY29uc3QgZ2V0UGFnZUVudGl0aWVzOiBNZW1vaXplZFNlbGVjdG9yPFxuICBTdGF0ZVdpdGhDbXMsXG4gIHsgW2lkOiBzdHJpbmddOiBQYWdlIH1cbj4gPSBjcmVhdGVTZWxlY3RvcihnZXRQYWdlU3RhdGUsIGdldFBhZ2VFbnRpdGllc1NlbGVjdG9yKTtcblxuZXhwb3J0IGNvbnN0IGdldFBhZ2VEYXRhID0gKFxuICBwYWdlQ29udGV4dDogUGFnZUNvbnRleHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGVXaXRoQ21zLCBQYWdlPiA9PlxuICBjcmVhdGVTZWxlY3RvcihcbiAgICBnZXRQYWdlRW50aXRpZXMsXG4gICAgZ2V0UGFnZVN0YXRlSW5kZXhWYWx1ZShwYWdlQ29udGV4dCksXG4gICAgKGVudGl0aWVzOiB7IFtpZDogc3RyaW5nXTogUGFnZSB9LCBpbmRleFZhbHVlOiBzdHJpbmcpID0+XG4gICAgICBlbnRpdGllc1tpbmRleFZhbHVlXVxuICApO1xuXG5leHBvcnQgY29uc3QgZ2V0UGFnZUNvbXBvbmVudFR5cGVzID0gKFxuICBwYWdlQ29udGV4dDogUGFnZUNvbnRleHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGVXaXRoQ21zLCBzdHJpbmdbXT4gPT5cbiAgY3JlYXRlU2VsZWN0b3IoZ2V0UGFnZURhdGEocGFnZUNvbnRleHQpLCAocGFnZURhdGEpID0+XG4gICAgZ2V0UGFnZUNvbXBvbmVudFR5cGVzU2VsZWN0b3IocGFnZURhdGEpXG4gICk7XG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50U2xvdFNlbGVjdG9yRmFjdG9yeSA9IChcbiAgcGFnZUNvbnRleHQ6IFBhZ2VDb250ZXh0LFxuICBwb3NpdGlvbjogc3RyaW5nXG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlV2l0aENtcywgQ29udGVudFNsb3REYXRhIHwgdW5kZWZpbmVkPiA9PiB7XG4gIHJldHVybiBjcmVhdGVTZWxlY3RvcihnZXRQYWdlRGF0YShwYWdlQ29udGV4dCksIChlbnRpdHkpID0+IHtcbiAgICBpZiAoZW50aXR5KSB7XG4gICAgICByZXR1cm4gZW50aXR5LnNsb3RzPy5bcG9zaXRpb25dIHx8IHsgY29tcG9uZW50czogW10gfTtcbiAgICB9XG4gIH0pO1xufTtcbiJdfQ==