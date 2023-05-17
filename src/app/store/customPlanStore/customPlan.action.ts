import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { ICategoriesResponse, ICustomMealsResponse, ICustomPlanResponse, ISubscriptionData } from "src/app/interfaces/custom-plan.interface";

export const FETCH_CUSTOMPLAN_START = createAction('[Custom Plan] FETCH_CUSTOMPLAN_START', props<{program_id:number}>())
export const FETCH_CUSTOMPLAN_SUCCESS = createAction('[Custom Plan] FETCH_CUSTOMPLAN_SUCCESS', props<{data:ICustomPlanResponse[],message:string,status:number}>())
export const FETCH_CUSTOMPLAN_FAILED = createAction('[Custom Plan] FETCH_CUSTOMPLAN_FAILED', props<{error:HttpErrorResponse}>())

export const SAVE_CUSTOM_SUBSCRIPTION = createAction('[Custom Plan] SAVE_CUSTOM_SUBSCRIPTION', props<{data:ISubscriptionData}>())

export const FETCH_CUSTOMPLAN_SHOWCATEGORIES_START = createAction('[Custom Plan] FETCH_CUSTOMPLAN_SHOWCATEGORIES_START', props<{plan_id:number}>())
export const FETCH_CUSTOMPLAN_SHOWCATEGORIES_SUCCESS = createAction('[Custom Plan] FETCH_CUSTOMPLAN_SHOWCATEGORIES_SUCCESS', props<{data:ICategoriesResponse[],message:string,status:number}>())
export const FETCH_CUSTOMPLAN_SHOWCATEGORIES_FAILED = createAction('[Custom Plan] FETCH_CUSTOMPLAN_SHOWCATEGORIES_FAILED', props<{error:HttpErrorResponse}>())

export const FETCH_CUSTOMPLAN_SHOWMEALS_START = createAction('[Custom Plan] FETCH_CUSTOMPLAN_SHOWMEALS_START', props<{plan_id:number}>())
export const FETCH_CUSTOMPLAN_SHOWMEALS_SUCCESS = createAction('[Custom Plan] FETCH_CUSTOMPLAN_SHOWMEALS_SUCCESS', props<{data:ICustomMealsResponse[],message:string,status:number}>())
export const FETCH_CUSTOMPLAN_SHOWMEALS_FAILED = createAction('[Custom Plan] FETCH_CUSTOMPLAN_SHOWMEALS_FAILED', props<{error:HttpErrorResponse}>())

// export const SAVE_CUSTOM_MEALS = createAction('[Custom Plan] SAVE_CUSTOM_MEALS', props<{data:any}>())

