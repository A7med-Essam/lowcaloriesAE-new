import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {

  constructor(
    private _ApiService:ApiService
  ) { }

  getUserInfo(): Observable<any> {
    return this._ApiService.postReq('profile','');
  }

  updateProfile(profileInfo:any): Observable<any> {
    return this._ApiService.postReq('completeOrUpdateProfile', profileInfo);
  }

  updateProfileImage(image:File): Observable<any>{
    return this._ApiService.postReq('updateProfileImage', image);
  }

}
