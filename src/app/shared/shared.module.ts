import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneHrefPipe } from './pipes/phone-href.pipe';
import { EmailHrefPipe } from './pipes/email-href.pipe';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

/** Commonly used modules that are likely required in most feature modules, e.g. i18n or routing. */
const imports = [
  CommonModule,
  ButtonModule,
  RippleModule,
  StyleClassModule
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
