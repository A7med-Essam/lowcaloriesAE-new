import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class NormalPlanService {
  CurrentMeals:BehaviorSubject<any> = new BehaviorSubject(null);
  SubscriptionData:BehaviorSubject<any> = new BehaviorSubject(null);
  ProgramDetails:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _ApiService:ApiService,
  ) { }

  getMeals(SubscriptionForm:any): Observable<any> {
    return this._ApiService.postReq('show_Meals',SubscriptionForm);
  }

  getNormalProgramDetails(program_id:number): Observable<any> {
    return this._ApiService.postReq('program_details', program_id);
  }

  getProgramPrice(data:any) : Observable<any>{
    return this._ApiService.postReq('program_prices', data);
  }


  SaveCurrentMeals(normalPlan_meals:any){
    this.CurrentMeals.next(normalPlan_meals);
  }

  SaveSubData(SubData:any){
    this.SubscriptionData.next(SubData);
  }
}
