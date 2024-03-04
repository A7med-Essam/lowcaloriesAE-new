import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ramadan',
})
export class RamadanPipe implements PipeTransform {
  transform(no_meal: number, programId: number, lang: string): string | number {
    if (programId == 10 || programId == 11) {
      switch (no_meal) {
        case 1:
          return lang == 'ar' ? 'الأفطار' : 'Iftar';
        case 4:
          return lang == 'ar' ? 'سحور' : 'Sohor';
        default:
          return lang == 'ar' ? 'الوجبة ' + no_meal : 'Meal ' + no_meal;
      }
    }
    return no_meal;
  }
}
