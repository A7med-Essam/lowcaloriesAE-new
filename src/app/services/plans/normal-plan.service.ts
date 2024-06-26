import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/core/services/api.service';
import { ICheckout, INormalProgramPriceResponse, INormalSubscriptionPrice } from 'src/app/interfaces/normal-plan.interface';
import { INormalPlanResponse, IShowMealsResponse, ISubscriptionData } from 'src/app/interfaces/normal-plan.interface';

@Injectable({
  providedIn: 'root'
})
export class NormalPlanService {
  constructor(
    private _ApiService:ApiService,
  ) { }

  getMeals(SubscriptionForm:ISubscriptionData): Observable<{ status: number; data: IShowMealsResponse[]; message: string }> {
    return this._ApiService.postReq('showMeals',SubscriptionForm);
  }

  getNormalProgramDetails(program_id:number): Observable<{ status: number; data: INormalPlanResponse[]; message: string }> {
    return this._ApiService.postReq('getPlans', {program_id});
  }

  getNormalProgramPrice(subscription:INormalSubscriptionPrice) : Observable<{status:number,data:INormalProgramPriceResponse, message:string}>{
    return this._ApiService.postReq('getNormalPrices', subscription);
  }

  checkout(checkout:ICheckout): Observable<{status:number,data:string, message:string}>{
    if (checkout.phone_number) {
      return this._ApiService.postReq('checkOutWithOutAuth', checkout);
    }
    else{
      return this._ApiService.postReq('checkOutWithAuth', checkout);
    }
  }
}
