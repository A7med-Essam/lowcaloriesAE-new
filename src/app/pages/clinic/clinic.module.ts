import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicRoutingModule } from './clinic-routing.module';
import { Step1Component } from './components/step1/step1.component';
import { Step2Component } from './components/step2/step2.component';
import { ParentComponent } from './components/parent/parent.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';

const APP_PRIMENG_MODULE = [
	CalendarModule,
  DropdownModule,
  SharedModule,
];

@NgModule({
  declarations: [
    Step1Component,
    Step2Component,
    ParentComponent
  ],
  imports: [
    CommonModule,
    ClinicRoutingModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    APP_PRIMENG_MODULE
  ]
})
export class ClinicModule { }
