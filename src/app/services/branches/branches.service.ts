import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(
    private _ApiService:ApiService
  ) { }

  getEmirates(): Observable<any> {
    return this._ApiService.postReq('emirates_branches','');
  }

  getBranches(emirate_id:number): Observable<any> {
    return this._ApiService.postReq('branches',emirate_id);
  }
}
