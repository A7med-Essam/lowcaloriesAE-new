import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of, catchError, tap } from 'rxjs';
import { NormalPlanService } from 'src/app/services/plans/normal-plan.service';
import * as fromNormalPlanActions from '../normalPlanStore/normalPlan.action';
import Swal from 'sweetalert2'

@Injectable()
export class NormalPlanEffects {
  constructor(
    private actions$: Actions,
    private _NormalPlanService: NormalPlanService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  @ViewChild('mySwal')
  
  // GET PROGRAM
  normalPlanEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNormalPlanActions.FETCH_NORMALPLAN_START),
      exhaustMap((action) =>
        this._NormalPlanService.getNormalProgramDetails(action.program_id).pipe(
          map((res) =>
            fromNormalPlanActions.FETCH_NORMALPLAN_SUCCESS({
              data: res.data,
              message: res.message,
              status: res.status,
            })
          ),
          tap((res) => {
            if (res.status == 0) {
              this._Router.navigate(['/plans']);
            }
          }),
          catchError((error: HttpErrorResponse) =>
            of(fromNormalPlanActions.FETCH_NORMALPLAN_FAILED({ error: error }))
          )
        )
      )
    )
  );

  // SHOW MEALS
  showMealsEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNormalPlanActions.FETCH_SHOWMEALS_START),
      exhaustMap((action) =>
        this._NormalPlanService.getMeals(action.data).pipe(
          map((res) =>
            fromNormalPlanActions.FETCH_SHOWMEALS_SUCCESS({
              data: res.data,
              message: res.message,
              status: res.status,
            })
          ),
          tap((res) => {
            if (res.status == 0) {
              this._Router.navigate(['/plans']);
            } else {
              const currentUrl = this._Router.url.replace('set-plan', '');
              const otherPath = 'show-meals';
              const newUrl = `${currentUrl}${otherPath}`;
              this._Router.navigateByUrl(newUrl);
            }
          }),
          catchError((error: HttpErrorResponse) =>
            of(fromNormalPlanActions.FETCH_SHOWMEALS_FAILED({ error: error }))
          )
        )
      )
    )
  );

  // GET PRICE
  getPriceEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNormalPlanActions.FETCH_NORMALPLAN_PRICE_START),
      exhaustMap((action) =>
        this._NormalPlanService
          .getNormalProgramPrice({
            day_count: action.data.day_count,
            meal_count: action.data.meal_count,
            program_id: action.data.program_id,
            snack_count: action.data.snack_count,
          })
          .pipe(
            map((res) =>
              fromNormalPlanActions.FETCH_NORMALPLAN_PRICE_SUCCESS({
                data: res.data,
                message: res.message,
                status: res.status,
              })
            ),
            tap((res) => {
              if (res.status == 0) {
                this._Router.navigate(['/plans']);
              } else {
                const currentUrl = this._Router.url.replace('show-meals', '');
                const otherPath = 'checkout';
                const newUrl = `${currentUrl}${otherPath}`;
                this._Router.navigateByUrl(newUrl);
              }
            }),
            catchError((error: HttpErrorResponse) =>
              of(fromNormalPlanActions.FETCH_NORMALPLAN_PRICE_FAILED({ error: error }))
            )
          )
      )
    )
  );

  // GIFTCODE
    giftCodeEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNormalPlanActions.FETCH_NORMALPLAN_GIFTCODE_START),
      exhaustMap((action) =>
        this._NormalPlanService
          .applyGiftCode({
            code:action.data.code,
            price:action.data.price,
            program_id:action.data.program_id
          })
          .pipe(
            map((res) =>
              fromNormalPlanActions.FETCH_NORMALPLAN_GIFTCODE_SUCCESS({
                data: res.data,
                message: res.message,
                status: res.status,
              })
            ),
            tap((res) => {
                Swal.fire(
                  'Gift Code Applied!',
                  res.message,
                  res.status == 1?'success':'error'
                )
            }),
            catchError((error: HttpErrorResponse) =>
              of(fromNormalPlanActions.FETCH_NORMALPLAN_GIFTCODE_FAILED({ error: error }))
            )
          )
      )
    )
  );
}
