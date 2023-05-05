import { HttpErrorResponse } from '@angular/common/http';
import { ActionReducerMap } from '@ngrx/store';
import { AuthEffect } from './authStore/auth.effect';
import { ProgramEffects } from './programStore/program.effect';
import * as fromAuthStore from './authStore/auth.reducer';
import * as fromProgramStore from './programStore/program.reducer';
import * as fromNormalPlanStore from './normalPlanStore/normalPlan.reducer';
import { NormalPlanEffects } from './normalPlanStore/normalPlan.effect';

export interface AppState {
  login: fromAuthStore.ILoginState;
  register: fromAuthStore.IRegisterState
  programs:fromProgramStore.IProgramState
  normalPlan:fromNormalPlanStore.INormalPlanState
  showMeals:fromNormalPlanStore.IShowMealsState
}

export const APP_STORE: ActionReducerMap<AppState> = {
  login: fromAuthStore.LoginReducer,
  register: fromAuthStore.RegisterReducer,
  programs: fromProgramStore.ProgramReducer,
  normalPlan: fromNormalPlanStore.NormalPlanReducer,
  showMeals: fromNormalPlanStore.ShowMealsReducer
};

export const APP_EFFECTS = [
  AuthEffect,
  ProgramEffects,
  NormalPlanEffects
]

export interface IHttpResponse {
  loading: boolean | null;
  error: HttpErrorResponse | null;
  status: number | null;
  message: string | null;
}




