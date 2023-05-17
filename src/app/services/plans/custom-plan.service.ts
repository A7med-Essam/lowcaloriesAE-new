import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/core/services/api.service';
import { ICategoriesResponse, ICustomMealsResponse, ICustomPlanResponse } from 'src/app/interfaces/custom-plan.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomPlanService {

  constructor(
    private _ApiService:ApiService
  ) { }

  getCustomProgramDetails(program_id:number): Observable<{ status: number; data: ICustomPlanResponse[]; message: string }> {
    return this._ApiService.postReq('getPlans', {program_id});
  }


  getCustomMeals(plan_id:number): Observable<{ status: number; data: ICustomMealsResponse[]; message: string }> {
    return this._ApiService.postReq('getCustomMeals', {plan_id});
  }

  getMealCategories(plan_id:number): Observable<{ status: number; data: ICategoriesResponse[]; message: string }> {
    return this._ApiService.postReq('getMealCategories', {plan_id});
  }
}