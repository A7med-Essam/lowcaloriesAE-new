import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { ILoginResponse, ISignInData, ISignUpData, IRegisterResponse } from "src/app/interfaces/auth.interface";

export const LOGIN_START = createAction('[Auth Login] LOGIN_START', props<{data:ISignInData}>())
export const LOGIN_SUCCESS = createAction('[Auth Login] LOGIN_SUCCESS', props<{data:ILoginResponse,message:string,status:number}>())
export const LOGIN_FAILED = createAction('[Auth Login] LOGIN_FAILED', props<{error:HttpErrorResponse}>())
export const LOGOUT = createAction('[Auth Logout] LOGOUT')


export const REGISTER_START = createAction('[Auth Register] REGISTER_START', props<{data:ISignUpData}>())
export const REGISTER_SUCCESS = createAction('[Auth Register] REGISTER_SUCCESS', props<{data:IRegisterResponse,message:string,status:number}>())
export const REGISTER_FAILED = createAction('[Auth Register] REGISTER_FAILED', props<{error:HttpErrorResponse}>())