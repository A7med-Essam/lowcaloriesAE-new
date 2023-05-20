import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomRoutingModule } from './custom-routing.module';
import { SetPlanComponent } from './components/set-plan/set-plan.component';
import { SelectMealsComponent } from './components/select-meals/select-meals.component';
import { ShowMealsComponent } from './components/show-meals/show-meals.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    SetPlanComponent,
    SelectMealsComponent,
    ShowMealsComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    CustomRoutingModule,
    ReactiveFormsModule,
    DropdownModule,
    SkeletonModule,
    CalendarModule,
    CarouselModule,
    DialogModule,
  ],
})
export class CustomModule {}
