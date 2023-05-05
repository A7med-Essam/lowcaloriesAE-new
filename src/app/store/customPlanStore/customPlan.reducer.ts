import { createReducer,on } from "@ngrx/store";
import { ICustomPlanResponse, ISubscriptionData } from "src/app/interfaces/custom-plan.interface";
import { IHttpResponse } from "../appStore";
import * as fromCustomPlanActions from "../customPlanStore/customPlan.action";

export interface ICustomPlanState extends IHttpResponse {
    data: ICustomPlanResponse[] | null;
  }
  
  const customPlanInitialState: ICustomPlanState = {
    error: null,
    loading: null,
    data: null,
    message: null,
    status: null,
  };
  
  export const CustomPlanReducer = createReducer(
    customPlanInitialState,
    on(fromCustomPlanActions.FETCH_CUSTOMPLAN_START, (state) => ({
      ...state,
      loading: true,
      data: null,
      error: null,
      message: null,
      status: 0,
    })),
    on(fromCustomPlanActions.FETCH_CUSTOMPLAN_SUCCESS, (state, action) => ({
      ...state,
      error: null,
      loading: false,
      data: action.status == 1 ? action.data : null,
      message: action.message,
      status: action.status,
    })),
    on(fromCustomPlanActions.FETCH_CUSTOMPLAN_FAILED, (state, action) => ({
      ...state,
      error: action.error,
      data: null,
      loading: false,
      message: null,
      status: 0,
    }))
  );

  // =============================================================================================================================

  export interface ICustomSubscriptionState {
    data: ISubscriptionData | null;
  }
  
  const CustomSubscriptionInitialState: ICustomSubscriptionState = {
    data: null,
  };
  
  export const CustomSubscriptionReducer = createReducer(
    CustomSubscriptionInitialState,
    on(fromCustomPlanActions.SAVE_CUSTOM_SUBSCRIPTION, (state, action) => ({
      ...state,
      data: action.data
    }))
  );


  // =============================================================================================================================

  // export interface IShowMealsState extends IHttpResponse {
  //   data: IShowMealsResponse[] | null;
  // }
  
  // const showMealsInitialState: IShowMealsState = {
  //   error: null,
  //   loading: null,
  //   data: null,
  //   message: null,
  //   status: null,
  // };
  
  // export const ShowMealsReducer = createReducer(
  //   showMealsInitialState,
  //   on(fromNormalPlanActions.FETCH_SHOWMEALS_START, (state) => ({
  //     ...state,
  //     loading: true,
  //     data: null,
  //     error: null,
  //     message: null,
  //     status: 0,
  //   })),
  //   on(fromNormalPlanActions.FETCH_SHOWMEALS_SUCCESS, (state, action) => ({
  //     ...state,
  //     error: null,
  //     loading: false,
  //     data: action.status == 1 ? action.data : null,
  //     message: action.message,
  //     status: action.status,
  //   })),
  //   on(fromNormalPlanActions.FETCH_SHOWMEALS_FAILED, (state, action) => ({
  //     ...state,
  //     error: action.error,
  //     data: null,
  //     loading: false,
  //     message: null,
  //     status: 0,
  //   }))
  // );