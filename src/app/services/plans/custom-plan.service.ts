import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/core/services/api.service';
import { ICustomPlanResponse } from 'src/app/interfaces/custom-plan.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomPlanService {

  constructor(
    private _ApiService:ApiService
  ) { }

  // getCustomProgramDetails(program_id:number): Observable<any> {
  //   return this._ApiService.postReq('custom_program_details', program_id);
  // }

  // getCardsOfDates(SubscribtionDetails:any): Observable<any> {
  //   return this._ApiService.postReq('cards_of_dates', SubscribtionDetails);
  // }

  // getCategories_with_meals(program_id:number): Observable<any> {
  //   return this._ApiService.postReq('categories_with_meals_test', program_id);
  // }




  // getMeals(SubscriptionForm:IShowMealsData): Observable<{ status: number; data: IShowMealsResponse[]; message: string }> {
  //   return this._ApiService.postReq('showMeals',SubscriptionForm);
  // }

  getCustomProgramDetails(program_id:number): Observable<{ status: number; data: ICustomPlanResponse[]; message: string }> {
    return this._ApiService.postReq('getPlans', {program_id});
  }
}