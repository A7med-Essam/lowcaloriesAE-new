import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { exhaustMap, map, of, catchError, tap, defer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as authActions from './auth.action';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';
import { Action } from '@ngrx/store';
import { ILoginResponse } from 'src/app/interfaces/auth.interface';

@Injectable()
export class AuthEffect implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private _AuthService: AuthService,
    private _Router: Router,
    private _LocalService: LocalService
  ) {}

  ngrxOnInitEffects() {
    let user: ILoginResponse =
      this._LocalService.getJsonValue('lowcaloriesAE_new');
    return authActions.LOGIN_SUCCESS({ data: user, message: '', status: 1 });
  }

  loginEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.LOGIN_START),
      exhaustMap((action) =>
        this._AuthService
          .signIn({ email: action.data.email, password: action.data.password })
          .pipe(
            map((res) =>
              authActions.LOGIN_SUCCESS({
                data: res.data,
                message: res.message,
                status: res.status,
              })
            ),
            tap((res) => {
              if (res.status == 1) {
                this._LocalService.setJsonValue('lowcaloriesAE_new', res.data);
                this._Router.navigate(['/home']);
              }
            }),
            catchError((error: HttpErrorResponse) =>
              of(authActions.LOGIN_FAILED({ error: error }))
            )
          )
      )
    )
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.LOGOUT),
        tap((action) => {
          this._LocalService.removeItem('lowcaloriesAE_new');
          this._Router.navigate(['login']);
        })
      ),
    { dispatch: false }
  );

  registerEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.REGISTER_START),
      exhaustMap((action) =>
        this._AuthService
          .signUp({
            birthday: action.data.birthday,
            email: action.data.email,
            first_name: action.data.first_name,
            gender: action.data.gender,
            last_name: action.data.last_name,
            password: action.data.password,
            phone_number: action.data.phone_number,
            Weight: action.data.Weight,
            height: action.data.height,
          })
          .pipe(
            map((res) =>
              authActions.REGISTER_SUCCESS({
                data: res.data,
                message: res.message,
                status: res.status,
              })
            ),
            tap((res) => {
              if (res.status == 1) {
                this._LocalService.setJsonValue('lowcaloriesAE_new', res.data);
                this._Router.navigate(['/home']);
              }
            }),
            catchError((error: HttpErrorResponse) =>
              of(authActions.REGISTER_FAILED({ error: error }))
            )
          )
      )
    )
  );
}

// 'carloskiro217@gmail.com'
// '123123123'
