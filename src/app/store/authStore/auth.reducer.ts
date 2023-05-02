import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import {
  IRegisterResponse,
  ILoginResponse,
} from 'src/app/interfaces/auth.interface';
import { IHttpResponse } from '../appStore';
import * as authActions from './auth.action';

// ================================================================ LOGIN ================================================================
export interface ILoginState extends IHttpResponse {
  data: ILoginResponse | null;
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
    message: null,
    status: 0,
  })),
  on(authActions.LOGOUT_START, (state) => ({
    ...state,
    loading: true,
  })),
  on(authActions.LOGOUT_SUCCESS, (state, action) => ({
    ...state,
    data: action.status == 1 ? null : state.data,
    loading:false,
    message:null
  }))
  // on(authActions.LOGOUT_FAILED, (state,action) => ({
  //   ...state,
  //   error: action.error,
  //   data: null,
  //   loading: false,
  //   message:null,
  //   status:null
  // }))
);

// ================================================================ LOGOUT ================================================================

// export interface ILogoutState extends IHttpResponse {
//   data: null;
// }

// const logoutInitial: ILogoutState = {
//   error: null,
//   loading: null,
//   data: null,
//   message: null,
//   status: null,
// };

// export const LogoutReducer = createReducer(
//   logoutInitial,
//   on(authActions.LOGOUT_START, (state) => ({
//     ...state,
//     error: null,
//     data: null,
//     loading: true,
//     message:null,
//     status:null
//   })),
//   on(authActions.LOGOUT_SUCCESS, (state,action) => ({
//     ...state,
//     error: null,
//     data:null,
//     loading: false,
//     message:null,
//     status:null
//   })),
//   on(authActions.LOGOUT_FAILED, (state,action) => ({
//     ...state,
//     error: action.error,
//     data: null,
//     loading: false,
//     message:null,
//     status:null
//   }))
// );

// ================================================================ Register ================================================================

export interface IRegisterState extends IHttpResponse {
  data: IRegisterResponse | null;
}

const registerInitial: IRegisterState = {
  error: null,
  loading: null,
  data: null,
  message: null,
  status: null,
};

export const RegisterReducer = createReducer(
  registerInitial,
  on(authActions.REGISTER_START, (state) => ({
    ...state,
    loading: true,
    data: null,
    error: null,
    message: null,
    status: 0,
  })),
  on(authActions.REGISTER_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.status == 1 ? action.data : null,
    message: action.message,
    status: action.status,
  })),
  on(authActions.REGISTER_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    data: null,
    loading: false,
    message: null,
    status: 0,
  }))
);
