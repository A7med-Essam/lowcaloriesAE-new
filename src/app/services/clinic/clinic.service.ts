import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(
    private _ApiService:ApiService
  ) { }

  getEmiratesForOnline(): Observable<any> {
    return this._ApiService.postReq('getEmiratesForOnline','');
  }

  getDates(Dates:string[]): Observable<any> {
    return this._ApiService.postReq('dates_locked_unlocked_clinic', {myDates:Dates});
  }

  getClinicCheckOut(SubInfo:any): Observable<any> {
    return this._ApiService.postReq('checkOutClinicOnline',SubInfo);
  }

}
