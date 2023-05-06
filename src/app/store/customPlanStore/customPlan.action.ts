import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { ICustomPlanResponse, ISubscriptionData } from "src/app/interfaces/custom-plan.interface";

export const FETCH_CUSTOMPLAN_START = createAction('[Custom Plan] FETCH_CUSTOMPLAN_START', props<{program_id:number}>())
export const FETCH_CUSTOMPLAN_SUCCESS = createAction('[Custom Plan] FETCH_CUSTOMPLAN_SUCCESS', props<{data:ICustomPlanResponse[],message:string,status:number}>())
export const FETCH_CUSTOMPLAN_FAILED = createAction('[Custom Plan] FETCH_CUSTOMPLAN_FAILED', props<{error:HttpErrorResponse}>())

export const SAVE_CUSTOM_SUBSCRIPTION = createAction('[Custom Plan] SAVE_CUSTOM_SUBSCRIPTION', props<{data:ISubscriptionData}>())