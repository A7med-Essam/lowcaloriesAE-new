import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICustomPlanState, ICustomShowCategoriesState, ICustomShowMealsState, ICustomSubscriptionState } from "./customPlan.reducer";

const customPlanFeatureSelector = createFeatureSelector<ICustomPlanState>('customPlan')
export const customPlanSelector = createSelector(customPlanFeatureSelector, state => state.data)
export const customPlanLoadingSelector = createSelector(customPlanFeatureSelector, state => state.loading)

const CustomSubscriptionFeatureSelector = createFeatureSelector<ICustomSubscriptionState>('customSubscription')
export const CustomSubscriptionSelector = createSelector(CustomSubscriptionFeatureSelector, state => state.data)
export const CustomSubscriptionErrorSelector = createSelector(CustomSubscriptionFeatureSelector, state => state.data)

const showMealsFeatureSelector = createFeatureSelector<ICustomShowMealsState>('customShowMeals')
export const showMealsSelector = createSelector(showMealsFeatureSelector, state => state.data)
export const showMealsLoadingSelector = createSelector(showMealsFeatureSelector, state => state.loading)

const showCategoriesFeatureSelector = createFeatureSelector<ICustomShowCategoriesState>('customShowCategories')
export const showCategoriesSelector = createSelector(showCategoriesFeatureSelector, state => state.data)
export const showCategoriesLoadingSelector = createSelector(showCategoriesFeatureSelector, state => state.loading)