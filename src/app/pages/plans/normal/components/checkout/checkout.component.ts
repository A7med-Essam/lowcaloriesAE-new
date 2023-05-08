import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromNormalPlanSelector from 'src/app/store/normalPlanStore/normalPlan.selector';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import {
  INormalPlanResponse,
  INormalProgramPriceResponse,
  ISubscriptionData,
} from 'src/app/interfaces/normal-plan.interface';
import { ILoginState } from 'src/app/store/authStore/auth.reducer';
import { loginSelector } from 'src/app/store/authStore/auth.selector';
import { FETCH_NORMALPLAN_GIFTCODE_START } from 'src/app/store/normalPlanStore/normalPlan.action';
import { FETCH_EMIRATE_START } from 'src/app/store/emirateStore/emirate.action';
import { IEmirateResponse } from 'src/app/interfaces/emirate.interface';
import { emirateSelector } from 'src/app/store/emirateStore/emirate.selector';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  private destroyed$: Subject<void> = new Subject();
  checkoutForm: FormGroup = new FormGroup({});
  checkoutForm_without_auth: FormGroup = new FormGroup({});
  subscriptionInfo$: Observable<ISubscriptionData | null> = of(null);
  price$: Observable<INormalProgramPriceResponse | null> = of(null);
  giftcodeButtonMode$: Observable<boolean | null> = of(false);
  emirates!: Observable<IEmirateResponse[] | any>;
  ProgramDetails!: Observable<INormalPlanResponse[] | null>;
  login$!: Observable<ILoginState>;
  SubscribtionModal: boolean = false;
  program_id: number = 0;
  price: number = 0;

  constructor(
    private _Store: Store,
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.login$ = _Store.select(loginSelector);
    this.price$ = _Store.select(fromNormalPlanSelector.normalPlanPriceSelector);
    _Store
      .select(fromNormalPlanSelector.normalPlanPriceSelector)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.price = res ? res.price : 0;
      });
    _Store
      .select(fromNormalPlanSelector.normalSubscriptionSelector)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        if (res) {
          this.program_id = res.program_id;
          this.subscriptionInfo$ = _Store.select(
            fromNormalPlanSelector.normalSubscriptionSelector
          );
          this.ProgramDetails = this._Store.select(
            fromNormalPlanSelector.normalPlanSelector
          );
          this._Store.dispatch(FETCH_EMIRATE_START());
          this.emirates = this._Store.select(emirateSelector);
        } else {
          this._Router.navigate(['set-plan'], {
            relativeTo: this._ActivatedRoute.parent,
          });
        }
      });
  }

  ngOnInit(): void {
    this.setCheckoutForm();
    this.setCheckoutForm_Without_Auth();
  }

  setCheckoutForm() {
    this.checkoutForm = this._FormBuilder.group({
      address: new FormControl(null, [Validators.required]),
      emirate_id: new FormControl(null, [Validators.required]),
      area_id: new FormControl(null, [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  setCheckoutForm_Without_Auth() {
    this.checkoutForm_without_auth = this._FormBuilder.group({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      phone_number: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      emirate_id: new FormControl(null, [Validators.required]),
      area_id: new FormControl(null, [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  applyGiftCode(input: HTMLInputElement) {
    if (input.value != '') {
      this.giftcodeButtonMode$ = this._Store.select(
        fromNormalPlanSelector.normalPlanGiftCodeLoadingSelector
      );
      this._Store.dispatch(
        FETCH_NORMALPLAN_GIFTCODE_START({
          data: {
            code: input.value,
            price: this.price,
            program_id: this.program_id,
          },
        })
      );
      this.price$ = this._Store.select(
        fromNormalPlanSelector.normalPlanGiftCodeSelector
      );
    }
  }

  checkout_With_Auth(form: FormGroup) {
    if (form.valid) {
      let sub: any;
      let priceinfo: any;
      this.subscriptionInfo$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => (sub = res));

      this.price$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => (priceinfo = res));

      const checkout = {
        delivery_days: sub?.delivery_days,
        meal_types: sub?.meal_types,
        no_snacks: sub?.no_snacks,
        program_id: sub?.program_id,
        plan_option_id: sub?.plan_option_id,
        start_date: sub?.start_date,
        bag: 0,
        code_id: priceinfo?.code_id,
        price: priceinfo?.price,
        grand_total: priceinfo?.grand_total,
        location: {
          emirate_id: form.value.emirate_id,
          area_id: form.value.area_id,
          property_number: '',
          landmark: form.value.address,
        },
      };

      console.log(checkout);
    }
  }

  checkout_Without_Auth(form: FormGroup) {
    if (form.valid) {
      let sub: any;
      let priceinfo: any;
      this.subscriptionInfo$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => (sub = res));

      this.price$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => (priceinfo = res));

      const checkout = {
        delivery_days: sub?.delivery_days,
        meal_types: sub?.meal_types,
        no_snacks: sub?.no_snacks,
        program_id: sub?.program_id,
        plan_option_id: sub?.plan_option_id,
        start_date: sub?.start_date,
        bag: 0,
        code_id: priceinfo?.code_id,
        price: priceinfo?.price,
        grand_total: priceinfo?.grand_total,
        location: {
          emirate_id: form.value.emirate_id,
          area_id: form.value.area_id,
          property_number: '',
          landmark: form.value.address,
        },
        first_name: form.value.first_name,
        last_name: form.value.last_name,
        email: form.value.email,
        phone_number: form.value.phone_number,
        password: form.value.password,
      };

      console.log(checkout);
    }
  }
}

// TODO:retrive user locations and add new form
// TODO:display terms
// TODO:set store for checkout for logedin user and non login user
// TODO:display lottie payment after checkout
