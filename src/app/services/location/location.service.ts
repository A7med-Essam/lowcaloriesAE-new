import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor
  (
      private _ApiService:ApiService
  ) { }

  getEmirates(): Observable<any> {
      return this._ApiService.getReq('emirates');
  }

  getAreas(emirate_id:number): Observable<any> {
    return this._ApiService.postReq('areas',emirate_id);
  }

  getAddresses(): Observable<any> {
    return this._ApiService.postReq('addresses','');
  }

  deleteAddress(address_id:number): Observable<any> {
    return this._ApiService.postReq('deleteAddresses',{"address_id":address_id});
  }

  createAddress(address_info:any): Observable<any> {
    return this._ApiService.postReq('createAddresses', address_info);
  }

  updateAddress(address_info:any): Observable<any> {
    return this._ApiService.postReq('updateAddresses', address_info);
  }
}