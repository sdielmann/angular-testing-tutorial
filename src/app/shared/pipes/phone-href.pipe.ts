import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneHref'
})
export class PhoneHrefPipe implements PipeTransform {

  countryCode = '+49';

  transform(value: string, addPrefix = true): string {
    value = value + '';
    value = value.replace(/[^\d+]+/g, '');
    value = value.replace(/^0/, this.countryCode);
    value = encodeURIComponent(value);
    return addPrefix ? 'tel:' + value : value;
  }

}
