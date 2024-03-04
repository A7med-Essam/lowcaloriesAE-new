import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ramadanMeal'
})
export class RamadanMealPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
