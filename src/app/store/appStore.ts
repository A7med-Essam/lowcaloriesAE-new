import { HttpErrorResponse } from '@angular/common/http';
import { ActionReducerMap } from '@ngrx/store';
import { AuthEffect } from './authStore/auth.effect';
import { ProgramEffects } from './programStore/program.effect';
import * as fromAuthStore from './authStore/auth.reducer';
import * as fromProgramStore from './programStore/program.reducer';

export interface AppState {
  login: fromAuthStore.ILoginState;
  register: fromAuthStore.IRegisterState
  programs:fromProgramStore.IProgramState
}

export const APP_STORE: ActionReducerMap<AppState> = {
  login: fromAuthStore.LoginReducer,
  register: fromAuthStore.RegisterReducer,
  programs: fromProgramStore.RegisterReducer
};

export const APP_EFFECTS = [
  AuthEffect,
  ProgramEffects
]

export interface IHttpResponse {
  loading: boolean | null;
  error: HttpErrorResponse | null;
  status: number | null;
  message: string | null;
}




