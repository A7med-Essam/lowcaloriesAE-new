import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, takeUntil, Subject } from 'rxjs';
import {
  ICategoriesResponse,
  ICustomMealsResponse,
  ICustomPlanResponse,
  ISubscriptionData,
  ICards
} from 'src/app/interfaces/custom-plan.interface';
import { SharedService } from 'src/app/services/shared.service';
import { SAVE_CUSTOMPLAN_CARDS } from 'src/app/store/customPlanStore/customPlan.action';
import {
  customPlanSelector,
  CustomSubscriptionSelector,
  showCategoriesSelector,
  showMealsSelector,
} from 'src/app/store/customPlanStore/customPlan.selector';



@Component({
  selector: 'app-select-meals',
  templateUrl: './select-meals.component.html',
  styleUrls: ['./select-meals.component.scss'],
})

export class SelectMealsComponent implements OnDestroy {
  private destroyed$: Subject<void> = new Subject();
  category_index: number = 0;
  meals$!: Observable<ICustomMealsResponse[] | null>;
  ProgramDetails!: Observable<ICustomPlanResponse[] | null>;
  categories$!: Observable<ICategoriesResponse[] | null>;
  meals: ICustomMealsResponse[] = [];
  cards: ICards[] = [];
  mealDetailsModal: boolean = false;
  cardsStatus: boolean = false;
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
  mealDetails!: ICustomMealsResponse;
  selectedMeals: ICustomMealsResponse[] = [];

  constructor(
    private _Store: Store,
    private _SharedService: SharedService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.meals$ = this._Store.select(showMealsSelector);
    this.categories$ = this._Store.select(showCategoriesSelector);
    this.ProgramDetails = this._Store.select(customPlanSelector);
    _Store
      .select(CustomSubscriptionSelector)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        res && (this.cards = this.getCards(res));
      });

    _Store
      .select(showCategoriesSelector)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        if (res) {
          this.getMeals(res[0].id);
        }
      });

    _Store
      .select(showMealsSelector)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        if (res == null) {
          this._Router.navigate(['set-plan'], {
            relativeTo: this._ActivatedRoute.parent,
          });
        }
      });
  }

  toggleCategories(e: Event, index: number, id: number) {
    this.category_index = index;
    this._SharedService.toggleCategories(e);
    this.getMeals(id);
  }

  getMeals(id: number) {
    this.meals$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
      if (res) {
        this.meals = res.filter((e) => e?.category_id == id);
      }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getCards(sub: ISubscriptionData) {
    const startDate = new Date(sub.start_date);
    const uppercaseDeliveryDays = sub.delivery_days.map((day) =>
      day.toUpperCase()
    );
    const cards: ICards[] = [];
    let currentDate = startDate;
    let counter = 0;
    while (cards.length < Number(sub.number_of_Days)) {
      counter++;
      const currentDay = currentDate.getDay();
      if (uppercaseDeliveryDays.includes(this.getDayName(currentDay))) {
        cards.push({
          date: currentDate.toISOString().split('T')[0],
          day: this.getDayName(currentDay),
          meals: sub.number_of_Meals,
          snacks: this.generateSnackArray(sub.number_of_Snacks),
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
      if (counter > 10000) {
        break;
      }
    }

    cards.forEach((obj) => {
      obj.meals = obj.meals.map((meal) => {
        return {
          name: meal,
          status: false,
          details: null,
        };
      });
    });

    return cards;
  }

  getDayName(dayIndex: number) {
    const daysOfWeek = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ];
    return daysOfWeek[dayIndex];
  }

  generateSnackArray(snackCount: number) {
    const snackArray = [];
    for (let i = 1; i <= snackCount; i++) {
      snackArray.push({ name: `Snack ${i}`, status: false, details: null });
    }
    return snackArray;
  }

  openDetails(meal: ICustomMealsResponse) {
    this.mealDetails = meal;
    this.mealDetailsModal = true;
  }

  pickMeal(meal: ICustomMealsResponse) {
    const mealList = meal.type.toLowerCase().includes('snack')
      ? 'snacks'
      : 'meals';

    let found = false;
    let index = 0;

    while (!found && index < this.cards.length) {
      const element = this.cards[index];
      const mealIndex = element[mealList].findIndex(
        (item) => item.details === null
      );

      if (mealIndex !== -1) {
        element[mealList][mealIndex].details = meal;
        element[mealList][mealIndex].status = true;
        found = true;
        this.selectedMeals.push(meal);
      }
      index++;
    }

    this.checkValidation(this.cards);
  }

  checkValidation(arr: ICards[]) {
    this.cardsStatus = arr.every((element) => {
      const mealsStatus = element.meals.every((meal) => meal.status === true);
      const snacksStatus = element.snacks.every(
        (snack) => snack.status === true
      );
      return mealsStatus && snacksStatus;
    });
  }

  getNextStep(){
    if (this.cardsStatus) {
      this._Store.dispatch(
        SAVE_CUSTOMPLAN_CARDS({ data: this.cards })
      );
      this._Router.navigate(['show-meals'], {
        relativeTo: this._ActivatedRoute.parent,
      })
    }
  }
}