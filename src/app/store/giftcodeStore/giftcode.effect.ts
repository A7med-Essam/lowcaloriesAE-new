import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of, catchError, tap } from 'rxjs';
import { GiftcodeService } from 'src/app/services/giftcode.service';
import * as fromGiftcodeActions from '../giftcodeStore/giftcode.action';
import Swal from 'sweetalert2';

@Injectable()
export class GiftcodeEffects {
  constructor(
    private actions$: Actions,
    private _GiftcodeService: GiftcodeService
  ) {}

  // GIFTCODE
  giftCodeEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromGiftcodeActions.FETCH_GIFTCODE_START),
      exhaustMap((action) =>
        this._GiftcodeService
          .applyGiftCode({
            code: action.data.code,
            price: action.data.price,
            program_id: action.data.program_id,
          })
          .pipe(
            map((res) =>
              fromGiftcodeActions.FETCH_GIFTCODE_SUCCESS({
                data: res.data,
                message: res.message,
                status: res.status,
              })
            ),
            tap((res) => {
              Swal.fire({
                title: res.message,
                text: 'Gift Code Applied!',
                icon: res.status == 1 ? 'success' : 'error',
              });
            }),
            catchError((error: HttpErrorResponse) =>
              of(
                fromGiftcodeActions.FETCH_GIFTCODE_FAILED({
                  error: error,
                })
              )
            )
          )
      )
    )
  );
}
