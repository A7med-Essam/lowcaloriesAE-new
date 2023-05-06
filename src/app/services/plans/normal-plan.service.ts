import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/core/services/api.service';
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

  // getProgramPrice(data:any) : Observable<any>{
  //   return this._ApiService.postReq('program_prices', data);
  // }

}
