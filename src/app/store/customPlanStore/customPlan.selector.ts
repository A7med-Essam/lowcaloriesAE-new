import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICustomPlanState, ICustomSubscriptionState } from "./customPlan.reducer";

const customPlanFeatureSelector = createFeatureSelector<ICustomPlanState>('customPlan')
export const customPlanSelector = createSelector(customPlanFeatureSelector, state => state.data)
export const customPlanLoadingSelector = createSelector(customPlanFeatureSelector, state => state.loading)

// const showMealsFeatureSelector = createFeatureSelector<IShowMealsState>('showMeals')
// export const showMealsSelector = createSelector(showMealsFeatureSelector, state => state.data)
// export const showMealsLoadingSelector = createSelector(showMealsFeatureSelector, state => state.loading)


const CustomSubscriptionFeatureSelector = createFeatureSelector<ICustomSubscriptionState>('CustomSubscription')
export const CustomSubscriptionSelector = createSelector(CustomSubscriptionFeatureSelector, state => state.data)