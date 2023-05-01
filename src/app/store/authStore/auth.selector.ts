import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ILoginState } from "./auth.reducer";

const loginFeatureSelector = createFeatureSelector<ILoginState>('login')
export const loginSelector = createSelector(loginFeatureSelector, state => state)