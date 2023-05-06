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
import { INormalPlanResponse, ISubscriptionData } from 'src/app/interfaces/normal-plan.interface';
import { ILoginState } from 'src/app/store/authStore/auth.reducer';
import { loginSelector } from 'src/app/store/authStore/auth.selector';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  private destroyed$: Subject<void> = new Subject();
  checkoutForm: FormGroup = new FormGroup({});
  subscriptionInfo: Observable<ISubscriptionData | null> = of(null);
  ProgramDetails!: Observable<INormalPlanResponse[] | null>;
  SubscribtionModal:boolean = false;
  login$!: Observable<ILoginState>;
  
  constructor(
    private _Store: Store,
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute
  ) {    
    this.login$ = _Store.select(loginSelector)
    _Store.select(loginSelector).subscribe(res=>console.log(res))
    _Store
      .select(fromNormalPlanSelector.normalSubscriptionSelector)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        if (res) {
          this.subscriptionInfo = _Store.select(fromNormalPlanSelector.normalSubscriptionSelector);
          this.ProgramDetails = this._Store.select(fromNormalPlanSelector.normalPlanSelector);
        } else {
          this._Router.navigate(['set-plan'], {
            relativeTo: this._ActivatedRoute.parent,
          });
        }
      });
  }

  ngOnInit(): void {
    this.setCheckoutForm();
  }

  setCheckoutForm() {
    this.checkoutForm = this._FormBuilder.group({
      address: new FormControl(null, [Validators.required]),
      emirate_id: new FormControl(null, [Validators.required]),
      area_id: new FormControl(null, [Validators.required]),
    });
  }

  // setCheckoutForm_WithoutAuth() {
  //   this.checkoutForm = this._FormBuilder.group({
  //     first_name: new FormControl(null, [Validators.required]),
  //     last_name: new FormControl(null, [Validators.required]),
  //     email: new FormControl(null, [Validators.required]),
  //     phone_number: new FormControl(null, [Validators.required]),
  //     address: new FormControl(null, [Validators.required]),
  //     emirate_id: new FormControl(null, [Validators.required]),
  //     area_id: new FormControl(null, [Validators.required]),
  //   });
  // }











  applyGiftCode(input: HTMLInputElement) {}
  getAreas(e:any){}
  emirates:any[] = []
  areas:any[] = []
}
