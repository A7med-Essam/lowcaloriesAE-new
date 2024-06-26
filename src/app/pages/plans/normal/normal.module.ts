import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NormalRoutingModule } from './normal-routing.module';

import { SetPlanComponent } from './components/set-plan/setPlan.component';
import { ShowMealsComponent } from './components/show-meals/showMeals.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LottieModule } from 'ngx-lottie';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RamadanPipe } from 'src/app/core/pipes/ramadan.pipe';
import { RoundPipe } from 'src/app/core/pipes/round.pipe';

export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  declarations: [SetPlanComponent, ShowMealsComponent, CheckoutComponent,RamadanPipe,RoundPipe],
  imports: [
    CommonModule,
    NormalRoutingModule,
    DropdownModule,
    ReactiveFormsModule,
    SkeletonModule,
    CalendarModule,
    DialogModule,
    CarouselModule,
    LottieModule.forRoot({ player: playerFactory }),
    SharedModule,
    
  ],
})
export class NormalModule {}
