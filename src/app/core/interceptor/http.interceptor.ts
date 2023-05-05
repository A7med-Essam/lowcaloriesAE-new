import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { map, Observable, take, exhaustMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { loginSelector } from 'src/app/store/authStore/auth.selector';
import { LocalService } from 'src/app/services/local.service';
import { ILoginResponse } from 'src/app/interfaces/auth.interface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // token: string = '';
  constructor(
    // private store: Store
    private _LocalService: LocalService
  ) {

  }

  // checkToken(): Observable<any> {
  //   const HTTP_HEADER = new HttpHeaders().set('token', this.token);
  //   return this._ApiService.post_withoutLoader('checkToken', '', HTTP_HEADER);
  // }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let HttpHeader;

    // if (this._LocalService.getJsonValue('currentLang') == 'ar') {
    //   HttpHeader = request.clone({
    //     headers: request.headers
    //       .set('Accept', ['application/json'])
    //       .set('Authorization', `Bearer ${this.token}`)
    //       .set(
    //         'api_password',
    //         `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTY1Mjg2NjczOSwiZXhwIjoxNjUyODcwMzM5LCJuYmYiOjE2NTI4NjY3MzksImp0aSI6InFkTnN1NTZ2ZFYwQkhjOU4iLCJzdWIiOjQsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.Dk_4v17X5MuTD16LCZImtB4BvwvN30HgTM-OtNtE-Ck`
    //       )
    //       .set('lang', 'ar'),
    //   });
    // } else {
    //   HttpHeader = request.clone({
    //     headers: request.headers
    //       .set('Accept', ['application/json'])
    //       .set('Authorization', `Bearer ${this.token}`)
    //       .set('lang', 'en'),
    //   });
    // }



    // return this.store.select(loginSelector).pipe(
    //   map(authState => {
    //     return authState.data;
    //   }),
    //   exhaustMap(user => {
    //     console.log(user?.access_token,"token");
    //     if (!user) {
    //       return next.handle(request);
    //     }
    //     else{
    //       const HttpHeader = request.clone({
    //         headers: request.headers.set('Authorization', `Bearer ${user.access_token}`)
    //       });
    //       return next.handle(HttpHeader);
    //     }
    //   })
    //   );

    // this.store.select(loginSelector)

    // if (this._LocalService.getJsonValue('lowcaloriesAE_new')) {
    //   const user: ILoginResponse = JSON.parse(
    //     this._LocalService.getJsonValue('lowcaloriesAE_new')
    //   );
    //   console.log(user);
    //   HttpHeader = request.clone({
    //     headers: request.headers
    //       .set('Authorization', `Bearer ${user.access_token}`)
    //   });
    //   return next.handle(HttpHeader);
    // }
    // else{
    //   return next.handle(request);
    // }

    if (this._LocalService.getJsonValue('lowcaloriesAE_new')) {
      HttpHeader = request.clone({
        headers: request.headers
        .set('Authorization', `Bearer ${this._LocalService.getJsonValue('lowcaloriesAE_new').auth_token}`)
      });
      return next.handle(HttpHeader);
    }
    return next.handle(request);
  }
}
