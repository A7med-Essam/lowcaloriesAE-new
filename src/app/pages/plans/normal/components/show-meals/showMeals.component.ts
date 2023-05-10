import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, of } from 'rxjs';
import * as fromNormalPlanSelector from 'src/app/store/normalPlanStore/normalPlan.selector';
import { SharedService } from 'src/app/services/shared.service';
import {
  INormalPlanResponse,
  IShowMealsResponse,
} from 'src/app/interfaces/normal-plan.interface';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FETCH_NORMALPLAN_PRICE_START } from 'src/app/store/normalPlanStore/normalPlan.action';

@Component({
  selector: 'app-showMeals',
  templateUrl: './showMeals.component.html',
  styleUrls: ['./showMeals.component.scss'],
})
export class ShowMealsComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<void> = new Subject();
  category_index: number = 0;
  ProgramMeals!: Observable<IShowMealsResponse[] | null>;
  ProgramDetails!: Observable<INormalPlanResponse[] | null>;
  nextButtonMode$: Observable<boolean | null> = of(false);

  constructor(
    private _SharedService: SharedService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _Store: Store
  ) {
    _Store
      .select(fromNormalPlanSelector.showMealsSelector)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        if (res) {
          this.ProgramDetails = _Store.select(
            fromNormalPlanSelector.normalPlanSelector
          );
          this.ProgramMeals = _Store.select(
            fromNormalPlanSelector.showMealsSelector
          );
        } else {
          this._Router.navigate(['set-plan'], {
            relativeTo: this._ActivatedRoute.parent,
          });
        }
      });
  }

  customOptions: OwlOptions = {
    loop: false,
    autoplay: false,
    dots: false,
    margin: 20,
    items: 3,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1024: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  };

  ngOnInit(): void {}

  toggleCategories(e: Event, index: number) {
    this.category_index = index;
    this._SharedService.toggleCategories(e);
  }

  getCheckout() {
    this.nextButtonMode$ = this._Store.select(
      fromNormalPlanSelector.normalPlanPriceLoadingSelector
    );

    this._Store
      .select(fromNormalPlanSelector.normalSubscriptionSelector)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        if (res) {
          this._Store.dispatch(
            FETCH_NORMALPLAN_PRICE_START({
              data: {
                day_count: res.no_days,
                meal_count: res.meal_types.length,
                program_id: res.program_id,
                snack_count: res.no_snacks,
              },
            })
          );
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}