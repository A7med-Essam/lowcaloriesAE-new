import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { INormalPlanResponse, IShowMealsData, IShowMealsResponse } from "src/app/interfaces/normal-plan.interface";

export const FETCH_NORMALPLAN_START = createAction('[Normal Plan] FETCH_NORMALPLAN_START', props<{program_id:number}>())
export const FETCH_NORMALPLAN_SUCCESS = createAction('[Normal Plan] FETCH_NORMALPLAN_SUCCESS', props<{data:INormalPlanResponse[],message:string,status:number}>())
export const FETCH_NORMALPLAN_FAILED = createAction('[Normal Plan] FETCH_NORMALPLAN_FAILED', props<{error:HttpErrorResponse}>())


export const FETCH_SHOWMEALS_START = createAction('[Normal Plan] FETCH_SHOWMEALS_START', props<{data:IShowMealsData}>())
export const FETCH_SHOWMEALS_SUCCESS = createAction('[Normal Plan] FETCH_SHOWMEALS_SUCCESS', props<{data:IShowMealsResponse[],message:string,status:number}>())
export const FETCH_SHOWMEALS_FAILED = createAction('[Normal Plan] FETCH_SHOWMEALS_FAILED', props<{error:HttpErrorResponse}>())