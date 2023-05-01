import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { loginResponse } from 'src/app/interfaces/auth.interface';
import * as authActions from './auth.action';

export interface ILoginState {
  loading: boolean | null;
  data: loginResponse | null;
  error: HttpErrorResponse | null;
  status: number | null;
  message: string | null;
}

const loginInitial: ILoginState = {
  error: null,
  loading: null,
  data: null,
  message: null,
  status: null,
};

export const LoginReducer = createReducer(
  loginInitial,
  on(authActions.LOGIN_START, (state) => ({
    ...state,
    loading: true,
    data: null,
    error: null,
  })),
  on(authActions.LOGIN_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.status == 1 ? action.data : null,
    message: action.message,
    status: action.status,
  })),
  on(authActions.LOGIN_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    data: null,
    loading: false,
  })),
  on(authActions.LOGOUT, (state) => ({
    ...state,
    error: null,
    data: null,
    loading: false,
  }))
);
