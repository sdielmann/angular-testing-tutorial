import { Pipe, PipeTransform } from '@angular/core';

export interface EmailHrefPipeOptions {
  addPrefix?: boolean;
  subject?: string;
}

@Pipe({
  name: 'emailHref'
})
export class EmailHrefPipe implements PipeTransform {

  readonly defaultOptions: EmailHrefPipeOptions = {
    addPrefix: true
  };

  transform(value: string | string[], options?: EmailHrefPipeOptions): string {
    options = Object.assign({}, this.defaultOptions, options);

    let res = '';

    if (options.addPrefix) {
      res += 'mailto:';
    }

    if (Array.isArray(value)) {
      for (const email of value) {
        res += encodeURIComponent(email) + ',';
      }
      // Remove last comma
      res = res.slice(0, -1);
    } else {
      res += encodeURIComponent(value);
    }

    if (options.subject) {
      res += '?subject=' + encodeURIComponent(options.subject);
    }

    return res;
  }

}
