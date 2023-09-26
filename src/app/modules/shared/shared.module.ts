import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekdayTranslatePipe } from 'src/app/core/pipes/weekday-translate.pipe';
import { MealUnitTranslatePipe } from 'src/app/core/pipes/meal-unit-translate.pipe';
import { I18nModule } from 'src/app/core/i18n/i18n.module';
import { TransformMealTypePipe } from 'src/app/core/pipes/transform-meal-type.pipe';

@NgModule({
  declarations: [WeekdayTranslatePipe,MealUnitTranslatePipe,TransformMealTypePipe],
  imports: [
    CommonModule,I18nModule
  ],
  exports:[
    WeekdayTranslatePipe,MealUnitTranslatePipe,I18nModule,TransformMealTypePipe
  ]
})
export class SharedModule { }
