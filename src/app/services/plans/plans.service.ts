import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  constructor(
    private _ApiService:ApiService,
  ) { }

  getLayers(): Observable<any> {
    return this._ApiService.getReq('layers');
  }

  getPrograms_normal(): Observable<any> {
    return this._ApiService.getReq('getNormalPrograms');
  }

  getPrograms_custom(): Observable<any> {
    return this._ApiService.getReq('getCustomPrograms');
  }

  getMyPlans(): Observable<any>{
    return this._ApiService.postReq('myPlans','');
  }
}
