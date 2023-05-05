import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable,of ,Subject,takeUntil} from 'rxjs';
import { ICustomPlanResponse } from 'src/app/interfaces/custom-plan.interface';
import { SharedService } from 'src/app/services/shared.service';
import { FETCH_CUSTOMPLAN_START } from 'src/app/store/customPlanStore/customPlan.action';
import * as fromCustomPlanSelector from '../../../../../store/customPlanStore/customPlan.selector';

@Component({
  selector: 'app-set-plan',
  templateUrl: './set-plan.component.html',
  styleUrls: ['./set-plan.component.scss']
})
export class SetPlanComponent implements OnInit{
  private destroyed$: Subject<void> = new Subject();
  program_id: number = 0;
  ProgramDetails!: Observable<ICustomPlanResponse[] | null>;
  ProgramDetailsForm: FormGroup = new FormGroup({});
  skeletonMode$: Observable<boolean | null> = of(false);
  selectedPlanType!:ICustomPlanResponse;
  max_meal:string[] = [];
  max_snack:string[] = [];
  max_days:string[] = [];
  @ViewChild('AllWeek') AllWeek!: ElementRef;
  uaeDate!: Date;
  
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private _Store: Store,
    private _SharedService: SharedService,
    private _ElementRef: ElementRef,
    // private cdref: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.program_id = Number(params.get('id'));
      if (isNaN(this.program_id)) {
        this._Router.navigate(['../plans']);
      } else {
        this._Store.dispatch(
          FETCH_CUSTOMPLAN_START({ program_id: this.program_id })
        );
        this.setProgramDetailsForm();
        this.ProgramDetails = this._Store.select(
          fromCustomPlanSelector.customPlanSelector
        );
        this.skeletonMode$ = this._Store.select(
          fromCustomPlanSelector.customPlanLoadingSelector
        );
        // this.nextButtonMode$ = this._Store.select(fromNormalPlanSelector.showMealsLoadingSelector)
        // this.getUaeDate();
      }
    });
  }

  setProgramDetailsForm() {
    this.ProgramDetailsForm = this._FormBuilder.group({
      Number_of_Meals: new FormControl(null, [Validators.required]),
      Number_of_Days: new FormControl(null, [Validators.required]),
      Start_Date: new FormControl(null, [Validators.required]),
      Plan_Type: new FormControl(null, [Validators.required]),
      Type_of_Snacks: new FormControl(null, [Validators.required]),
      CheckDays: new FormControl(null),
    });
  }

  getSelectedPlanType(val: ICustomPlanResponse){
    this.selectedPlanType = val
    this.ProgramDetailsForm.get('Number_of_Meals')?.setValue(null);
    this.ProgramDetailsForm.get('Number_of_Days')?.setValue(null);
    this.ProgramDetailsForm.get('Type_of_Snacks')?.setValue(null);
    this.getProgramDetails()
  }

  getProgramDetails() {
    this.ProgramDetails.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
      if (res) {
        for (let i = 1; i <= this.selectedPlanType.details.max_meal; i++) {
          this.max_meal.push(i.toString());
        }
        for (let i = 0; i <= this.selectedPlanType.details.max_snack; i++) {
          this.max_snack.push(i.toString());
        }
        for (let i = this.selectedPlanType.details.min_days; i <= this.selectedPlanType.details.max_days; i++) {
          this.max_days.push(i.toString());
        }
      }
    });
  }

  onSubmit(data: FormGroup) {
    console.log(data.value);
    // const subData = this.getSubscriptionData(data);
    // this._Store.dispatch(FETCH_SHOWMEALS_START({data:subData}))
  }

  onSelectedDate(SelectedDate: Date, deliveredDays: HTMLElement) {
    this._SharedService.onSelectedDate(SelectedDate, deliveredDays);
  }

  getDayNumber(Day_name: string | undefined | null) {
    return this._SharedService.getDayNumber(Day_name);
  }

  checkDeliveryDays(e: HTMLElement) {
    this._SharedService.checkDays(e, this.AllWeek, this.ProgramDetailsForm);
    this.getAllWeekChecked();
  }

  getAllWeekChecked() {
    let days = this._ElementRef.nativeElement.querySelectorAll(
      '.deliveredDays .dayWeek.active'
    );
    if (days.length == 6) {
      this.AllWeek.nativeElement.classList.add('active');
    } else {
      this.AllWeek.nativeElement.classList.remove('active');
    }
  }

  checkAllWeekBtn(e: HTMLElement) {
    this._SharedService.checkAllWeek(e);
  }

  getUaeDate() {
    this.uaeDate = this._SharedService.getUaeTime();
  }

  delivery_days = [
    {
      id: 8,
      day_name: 'SATURDAY',
      day_name_ar: 'السبت',
      closed: 0,
      deleted_at: null,
      day_name_in_view: 'Saturday',
    },
    {
      id: 9,
      day_name: 'SUNDAY',
      day_name_ar: 'الاحد',
      closed: 0,
      deleted_at: null,
      day_name_in_view: 'Sunday',
    },
    {
      id: 10,
      day_name: 'MONDAY',
      day_name_ar: 'الاثنين',
      closed: 0,
      deleted_at: null,
      day_name_in_view: 'Monday',
    },
    {
      id: 11,
      day_name: 'TUSEDAY',
      day_name_ar: 'الثلاثاء',
      closed: 0,
      deleted_at: null,
      day_name_in_view: 'Tuseday',
    },
    {
      id: 12,
      day_name: 'WEDNESDAY',
      day_name_ar: 'الاربعاء',
      closed: 0,
      deleted_at: null,
      day_name_in_view: 'Wednesday',
    },
    {
      id: 13,
      day_name: 'THURSDAY',
      day_name_ar: 'الخميس',
      closed: 0,
      deleted_at: null,
      day_name_in_view: 'Thursday',
    },
  ];
}
