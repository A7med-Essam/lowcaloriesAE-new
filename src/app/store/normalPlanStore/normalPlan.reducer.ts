import { createReducer,on } from "@ngrx/store";
import { INormalPlanResponse, IShowMealsResponse, ISubscriptionData } from "src/app/interfaces/normal-plan.interface";
import { IHttpResponse } from "../appStore";
import * as fromNormalPlanActions from "../normalPlanStore/normalPlan.action";

export interface INormalPlanState extends IHttpResponse {
    data: INormalPlanResponse[] | null;
  }
  
  const normalPlanInitialState: INormalPlanState = {
    error: null,
    loading: null,
    data: null,
    message: null,
    status: null,
  };
  
  export const NormalPlanReducer = createReducer(
    normalPlanInitialState,
    on(fromNormalPlanActions.FETCH_NORMALPLAN_START, (state) => ({
      ...state,
      loading: true,
      data: null,
      error: null,
      message: null,
      status: 0,
    })),
    on(fromNormalPlanActions.FETCH_NORMALPLAN_SUCCESS, (state, action) => ({
      ...state,
      error: null,
      loading: false,
      data: action.status == 1 ? action.data : null,
      message: action.message,
      status: action.status,
    })),
    on(fromNormalPlanActions.FETCH_NORMALPLAN_FAILED, (state, action) => ({
      ...state,
      error: action.error,
      data: null,
      loading: false,
      message: null,
      status: 0,
    }))
  );

// =============================================================================================================================

    export interface INormalSubscriptionState {
      data: ISubscriptionData | null;
    }
    
    const NormalSubscriptionInitialState: INormalSubscriptionState = {
      data: null,
    };
    
    export const NormalSubscriptionReducer = createReducer(
      NormalSubscriptionInitialState,
      on(fromNormalPlanActions.SAVE_NORMAL_SUBSCRIPTION, (state, action) => ({
        ...state,
        data: action.data
      }))
    );

// =============================================================================================================================

  export interface IShowMealsState extends IHttpResponse {
    data: IShowMealsResponse[] | null;
  }
  
  const showMealsInitialState: IShowMealsState = {
    error: null,
    loading: null,
    data: null,
    message: null,
    status: null,
  };
  
  export const ShowMealsReducer = createReducer(
    showMealsInitialState,
    on(fromNormalPlanActions.FETCH_SHOWMEALS_START, (state) => ({
      ...state,
      loading: true,
      data: null,
      error: null,
      message: null,
      status: 0,
    })),
    on(fromNormalPlanActions.FETCH_SHOWMEALS_SUCCESS, (state, action) => ({
      ...state,
      error: null,
      loading: false,
      data: action.status == 1 ? action.data : null,
      message: action.message,
      status: action.status,
    })),
    on(fromNormalPlanActions.FETCH_SHOWMEALS_FAILED, (state, action) => ({
      ...state,
      error: action.error,
      data: null,
      loading: false,
      message: null,
      status: 0,
    }))
  );
  