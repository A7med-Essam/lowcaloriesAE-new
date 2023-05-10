import { HttpErrorResponse } from '@angular/common/http';
import { ActionReducerMap } from '@ngrx/store';
import { AuthEffect } from './authStore/auth.effect';
import { ProgramEffects } from './programStore/program.effect';
import * as fromAuthStore from './authStore/auth.reducer';
import * as fromProgramStore from './programStore/program.reducer';
import * as fromNormalPlanStore from './normalPlanStore/normalPlan.reducer';
import * as fromCustomPlanStore from './customPlanStore/customPlan.reducer';
import * as fromEmirateStore from './emirateStore/emirate.reducer';
import * as fromAddressStore from './userAddressStore/address.reducer';
import { NormalPlanEffects } from './normalPlanStore/normalPlan.effect';
import { CustomPlanEffects } from './customPlanStore/customPlan.effect';
import { EmirateEffects } from './emirateStore/emirate.effect';
import { AddressEffects } from './userAddressStore/address.effect';

export interface AppState {
  login: fromAuthStore.ILoginState;
  register: fromAuthStore.IRegisterState
  programs:fromProgramStore.IProgramState
  normalPlan:fromNormalPlanStore.INormalPlanState
  showMeals:fromNormalPlanStore.IShowMealsState
  customPlan:fromCustomPlanStore.ICustomPlanState
  CustomSubscription:fromCustomPlanStore.ICustomSubscriptionState
  NormalSubscription:fromNormalPlanStore.INormalSubscriptionState
  normalPlanPrice:fromNormalPlanStore.INormalPlanPriceState
  normalGiftCode:fromNormalPlanStore.INormalPlanGiftCodeState
  emirate:fromEmirateStore.IEmirateState
  normalCheckout:fromNormalPlanStore.ICheckoutState
  address:fromAddressStore.IAddresseState
}

export const APP_STORE: ActionReducerMap<AppState> = {
  login: fromAuthStore.LoginReducer,
  register: fromAuthStore.RegisterReducer,
  programs: fromProgramStore.ProgramReducer,
  normalPlan: fromNormalPlanStore.NormalPlanReducer,
  showMeals: fromNormalPlanStore.ShowMealsReducer,
  customPlan:fromCustomPlanStore.CustomPlanReducer,
  CustomSubscription:fromCustomPlanStore.CustomSubscriptionReducer,
  NormalSubscription:fromNormalPlanStore.NormalSubscriptionReducer,
  normalPlanPrice:fromNormalPlanStore.NormalPlanPriceReducer,
  normalGiftCode:fromNormalPlanStore.NormalPlanGiftCodeReducer,
  emirate:fromEmirateStore.EmirateReducer,
  normalCheckout:fromNormalPlanStore.NormalPlanCheckoutReducer,
  address:fromAddressStore.AddressReducer
};

export const APP_EFFECTS = [
  AuthEffect,
  ProgramEffects,
  NormalPlanEffects,
  CustomPlanEffects,
  EmirateEffects,
  AddressEffects
]

export interface IHttpResponse {
  loading: boolean | null;
  error: HttpErrorResponse | null;
  status: number | null;
  message: string | null;
}




