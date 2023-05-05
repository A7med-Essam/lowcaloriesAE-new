import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { ICustomPlanResponse } from "src/app/interfaces/custom-plan.interface";

export const FETCH_CUSTOMPLAN_START = createAction('[Custom Plan] FETCH_CUSTOMPLAN_START', props<{program_id:number}>())
export const FETCH_CUSTOMPLAN_SUCCESS = createAction('[Custom Plan] FETCH_CUSTOMPLAN_SUCCESS', props<{data:ICustomPlanResponse[],message:string,status:number}>())
export const FETCH_CUSTOMPLAN_FAILED = createAction('[Custom Plan] FETCH_CUSTOMPLAN_FAILED', props<{error:HttpErrorResponse}>())


// export const FETCH_SHOWMEALS_START = createAction('[Custom Plan] FETCH_SHOWMEALS_START', props<{data:IShowMealsData}>())
// export const FETCH_SHOWMEALS_SUCCESS = createAction('[Custom Plan] FETCH_SHOWMEALS_SUCCESS', props<{data:IShowMealsResponse[],message:string,status:number}>())
// export const FETCH_SHOWMEALS_FAILED = createAction('[Custom Plan] FETCH_SHOWMEALS_FAILED', props<{error:HttpErrorResponse}>())