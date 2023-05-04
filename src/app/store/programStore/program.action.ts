import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

export const FETCH_PROGRAM_START = createAction('[Program] FETCH_PROGRAM_START')
export const FETCH_PROGRAM_SUCCESS = createAction('[Program] FETCH_PROGRAM_SUCCESS', props<{data:any,message:string,status:number}>())
export const FETCH_PROGRAM_FAILED = createAction('[Program] FETCH_PROGRAM_FAILED', props<{error:HttpErrorResponse}>())
