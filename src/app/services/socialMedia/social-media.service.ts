import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  constructor(
    private _ApiService:ApiService
  ) { }

  getSocialMedia(): Observable<any> {
    return this._ApiService.postReq('social_media','');
  }

  sendEmail(EmailForm:any): Observable<any> {
    return this._ApiService.postReq('sendMail', EmailForm);
  }

  footerInfo(): Observable<any> {
    return this._ApiService.getReq('contactUs');
  }
}
