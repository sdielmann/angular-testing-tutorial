import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { ConfigType } from 'dayjs';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

  transform(value: ConfigType): string | ConfigType {
    const v = dayjs(value);
    return v.isValid() ? v.fromNow() : value;
  }
}
