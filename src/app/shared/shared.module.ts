import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneHrefPipe } from './pipes/phone-href.pipe';
import { EmailHrefPipe } from './pipes/email-href.pipe';

/** Commonly used modules that are likely required in most feature modules, e.g. i18n or routing. */
const imports = [
  CommonModule
];

const declarations = [
  PhoneHrefPipe,
  EmailHrefPipe
];

@NgModule({
  imports,
  declarations,
  exports: [
    ...imports,
    ...declarations
  ]
})
export class SharedModule { }
