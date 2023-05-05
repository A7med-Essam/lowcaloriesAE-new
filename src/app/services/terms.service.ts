import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})

export class TermsService {
  constructor(
    private _ApiService:ApiService
  ) { }

  // getTerms(): Observable<any> {
  //   return this._ApiService.getReq('termsConditions');
  // }

}
