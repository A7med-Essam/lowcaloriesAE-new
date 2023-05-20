import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { ICards } from 'src/app/interfaces/custom-plan.interface';
import { SharedService } from 'src/app/services/shared.service';
import { CustomCardsSelector } from 'src/app/store/customPlanStore/customPlan.selector';

@Component({
  selector: 'app-show-meals',
  templateUrl: './show-meals.component.html',
  styleUrls: ['./show-meals.component.scss'],
})
export class ShowMealsComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<void> = new Subject();
  nextButtonMode$: Observable<boolean | null> = of(false);
  CurrentIndex: number = 0;
  cards!: Observable<ICards[] | null>;
  constructor(
    private _Store: Store,
    private _SharedService: SharedService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.cards = _Store.select(CustomCardsSelector);
    _Store
      .select(CustomCardsSelector)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        if (res == null) {
          this._Router.navigate(['set-plan'], {
            relativeTo: this._ActivatedRoute.parent,
          });
        }
      });
  }

  categoryOptions: OwlOptions = {
    dots: false,
    nav: false,
    margin: 20,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  toggleDates(e: HTMLElement) {
    e.classList.add('active');
    const Siblings = this._SharedService.getAllSiblings(
      e.parentElement?.parentElement,
      e.parentElement?.parentElement?.parentElement
    );
    Siblings.forEach((e: HTMLElement) => {
      e.children[0]?.children[0]?.classList.remove('active');
    });
  }

  toggleCards(index: number) {
    this.CurrentIndex = index;
  }

  getCheckout() {
    // this.nextButtonMode$ = this._Store.select(
    //   fromNormalPlanSelector.normalPlanPriceLoadingSelector
    // );
    // this._Store.dispatch(
    //   FETCH_NORMALPLAN_PRICE_START({
    //     data: {
    //       day_count: res.no_days,
    //       meal_count: res.meal_types.length,
    //       program_id: res.program_id,
    //       snack_count: res.no_snacks,
    //     },
    //   })
    // );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
