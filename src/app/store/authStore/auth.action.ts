import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { loginResponse, signInData } from "src/app/interfaces/auth.interface";

export const LOGIN_START = createAction('[Auth Login] LOGIN_START', props<{data:signInData}>())
export const LOGIN_SUCCESS = createAction('[Auth Login] LOGIN_SUCCESS', props<{data:loginResponse,message:string,status:number}>())
export const LOGIN_FAILED = createAction('[Auth Login] LOGIN_FAILED', props<{error:HttpErrorResponse}>())
export const LOGOUT = createAction('[Auth Logout] LOGOUT')