import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private _ApiService: ApiService) {}
  // shoppingCartItems: BehaviorSubject<any> = new BehaviorSubject(null);

  // getMenu(): Observable<any> {
  //   return this._ApiService.postReq('getMenuNew', '');
  // }

  // getMeals(): Observable<any> {
  //   return this._ApiService.getReq('getMenuNew');
  // }


}
