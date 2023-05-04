import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(
    private _ApiService:ApiService
  ) { }

  getPrograms(): Observable<any> {
    return this._ApiService.postReq('programs', '');
  }
}
