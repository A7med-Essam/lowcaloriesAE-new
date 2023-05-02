import { HttpErrorResponse } from '@angular/common/http';
import { ActionReducerMap } from '@ngrx/store';
import * as authStore from './authStore/auth.reducer';

export interface AppState {
  login: authStore.ILoginState;
  register: authStore.IRegisterState
}

export const APP_STORE: ActionReducerMap<AppState> = {
  login: authStore.LoginReducer,
  register: authStore.RegisterReducer,
};

export interface IHttpResponse {
  loading: boolean | null;
  error: HttpErrorResponse | null;
  status: number | null;
  message: string | null;
}




