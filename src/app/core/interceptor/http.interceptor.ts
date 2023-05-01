import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string = '';
  constructor(
    private _ApiService: ApiService,
    // private _LocalService: LocalService
  ) {
    // _AuthService.currentUser.subscribe((res: any) => {
    //   if (res == null) {
    //     this.token = '';
    //   } else {
    //     this.token = res.token;
    //   }
    // });
  }

  checkToken(): Observable<any> {
    const HTTP_HEADER = new HttpHeaders().set('token', this.token);
    return this._ApiService.post_withoutLoader('checkToken', '', HTTP_HEADER);
  }

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
    HttpHeader = request.clone({
      headers: request.headers
        .set('Accept', ['application/json'])
        .set('Authorization', `Bearer ${this.token}`)
        .set('lang', 'en'),
    });
    return next.handle(HttpHeader);
  }
}
