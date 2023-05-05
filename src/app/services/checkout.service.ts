import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private _ApiService:ApiService
  ) { }

  // applyGiftCode(code:any): Observable<any> {
  //   return this._ApiService.postReq('giftCode', code);
  // }

  // getCustomCheckOut_WithOutAuth(subData:any): Observable<any> {
  //   return this._ApiService.postReq('customCheckOutWithOutAuth', subData);
  // }

  // getCustomCheckOut_WithAuth(subData:any): Observable<any> {
  //   return this._ApiService.postReq('customCheckOutWithAuth', subData);
  // }

  // getNormalCheckOut_WithOutAuth(subData:any): Observable<any> {
  //   return this._ApiService.postReq('checkOutWithOutAuth', subData);
  // }

  // getNormalCheckOut_WithAuth(subData:any): Observable<any> {
  //   return this._ApiService.postReq('checkOutWithAuth', subData);
  // }

}
