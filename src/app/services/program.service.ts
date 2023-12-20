import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { IProgramResponse } from '../interfaces/program.interface';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  constructor(private _ApiService: ApiService) {}

  getPrograms(): Observable<{
    status: number;
    data: IProgramResponse[];
    message: string;
  }> {
    return this._ApiService.postReq('programs', '');
  }

  getOffers(): Observable<{
    status: number;
    data: {
      offer_name: string;
      plan: string;
      price: number;
      remaining_days: number;
      link: string;
    }[];
    message: string;
  }> {
    return this._ApiService.postReqV3('getOffers', {sub_from:'web'});
  }
}
