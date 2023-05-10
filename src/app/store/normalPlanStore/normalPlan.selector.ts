import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICheckoutState, INormalPlanGiftCodeState, INormalPlanPriceState, INormalPlanState, INormalSubscriptionState, IShowMealsState } from "./normalPlan.reducer";

const normalPlanFeatureSelector = createFeatureSelector<INormalPlanState>('normalPlan')
export const normalPlanSelector = createSelector(normalPlanFeatureSelector, state => state.data)
export const normalPlanLoadingSelector = createSelector(normalPlanFeatureSelector, state => state.loading)

const NormalSubscriptionFeatureSelector = createFeatureSelector<INormalSubscriptionState>('NormalSubscription')
export const normalSubscriptionSelector = createSelector(NormalSubscriptionFeatureSelector, state => state.data)

const showMealsFeatureSelector = createFeatureSelector<IShowMealsState>('showMeals')
export const showMealsSelector = createSelector(showMealsFeatureSelector, state => state.data)
export const showMealsLoadingSelector = createSelector(showMealsFeatureSelector, state => state.loading)


const normalPlanPriceFeatureSelector = createFeatureSelector<INormalPlanPriceState>('normalPlanPrice')
export const normalPlanPriceSelector = createSelector(normalPlanPriceFeatureSelector, state => state.data)
export const normalPlanPriceLoadingSelector = createSelector(normalPlanPriceFeatureSelector, state => state.loading)

const normalPlanGiftCodeFeatureSelector = createFeatureSelector<INormalPlanGiftCodeState>('normalGiftCode')
export const normalPlanGiftCodeSelector = createSelector(normalPlanGiftCodeFeatureSelector, state => state.data)
export const normalPlanGiftCodeLoadingSelector = createSelector(normalPlanGiftCodeFeatureSelector, state => state.loading)

const normalPlanCheckoutFeatureSelector = createFeatureSelector<ICheckoutState>('normalCheckout')
export const normalPlanCheckoutSelector = createSelector(normalPlanCheckoutFeatureSelector, state => state.data)
export const normalPlanCheckoutLoadingSelector = createSelector(normalPlanCheckoutFeatureSelector, state => state.loading)
export const normalPlanResponseSelector = createSelector(normalPlanCheckoutFeatureSelector, state => state)