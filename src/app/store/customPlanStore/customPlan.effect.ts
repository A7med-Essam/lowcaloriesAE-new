import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of, catchError, tap } from 'rxjs';
import { CustomPlanService } from 'src/app/services/plans/custom-plan.service';
import * as fromCustomPlanActions from '../customPlanStore/customPlan.action';

@Injectable()
export class CustomPlanEffects {
  constructor(
    private actions$: Actions,
    private _CustomPlanService: CustomPlanService,
    private _Router:Router,
    // private _ActivatedRoute:ActivatedRoute
  ) {}

  customPlanEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCustomPlanActions.FETCH_CUSTOMPLAN_START),
      exhaustMap((action) =>
        this._CustomPlanService.getCustomProgramDetails(action.program_id).pipe(
          map((res) =>
            fromCustomPlanActions.FETCH_CUSTOMPLAN_SUCCESS({
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
            of(fromCustomPlanActions.FETCH_CUSTOMPLAN_FAILED({ error: error }))
          )
        )
      )
    )
  );

//   showMealsEffect = createEffect(() =>
//   this.actions$.pipe(
//     ofType(fromCustomPlanActions.FETCH_SHOWMEALS_START),
//     exhaustMap((action) =>
//       this._NormalPlanService.getMeals(action.data).pipe(
//         map((res) =>
//           fromCustomPlanActions.FETCH_SHOWMEALS_SUCCESS({
//             data: res.data,
//             message: res.message,
//             status: res.status,
//           })
//         ),
//         tap((res) => {
//           if (res.status == 0) {
//             this._Router.navigate(['/plans']);
//           }
//           else{
//             const currentUrl = this._Router.url.replace("set-plan", "");
//             const otherPath = 'show-meals';
//             const newUrl = `${currentUrl}${otherPath}`;
//             this._Router.navigateByUrl(newUrl);
//           }
//         }),
//         catchError((error: HttpErrorResponse) =>
//           of(fromCustomPlanActions.FETCH_SHOWMEALS_FAILED({ error: error }))
//         )
//       )
//     )
//   )
// );
}
