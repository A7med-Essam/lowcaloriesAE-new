import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of, catchError, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as authActions from './auth.action';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private _AuthService: AuthService,
    private _Router: Router,
    private _LocalService: LocalService
  ) {}

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
}

// 'carloskiro217@gmail.com'
// '123123123'
