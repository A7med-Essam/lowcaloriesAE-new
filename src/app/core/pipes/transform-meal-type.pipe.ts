import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformMealType'
})
export class TransformMealTypePipe implements PipeTransform {

  transform(value: string, lang: string): string {
    const lowercasedValue = value.toLowerCase();

    switch (lowercasedValue) {
      case 'meal 1':
        return lang === 'en' ? 'Breakfast' : 'فطور';
      case 'meal 2':
        return lang === 'en' ? 'Lunch' : 'غداء';
      case 'meal 3':
        return lang === 'en' ? 'Dinner' : 'عشاء';
      case 'meal 4':
        return lang === 'en' ? 'Meal 4' : 'وجبة 4';
      case 'meal 5':
        return lang === 'en' ? 'Meal 5' : 'وجبة 5';
      case 'meal 6':
        return lang === 'en' ? 'Meal 6' : 'وجبة 6';
      case 'snack 1':
      case 'snack 2':
        return lang === 'en' ? value : `وجبة خفيفة ${value.split(' ')[1]}`;
      default:
        return value;
    }
  }
}
