import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

declare module '@angular/core' {
  // eslint-disable-next-line no-shadow
  interface DebugElement {
    $(css: string): DebugElement;
    $$(css: string): DebugElement[];
    findByQa(attr: string): DebugElement;
  }
}

DebugElement.prototype.$ = function(css: string): DebugElement {
  return this.query(By.css(css));
};

DebugElement.prototype.$$ = function(css: string): DebugElement[] {
  return this.queryAll(By.css(css));
};

DebugElement.prototype.findByQa = function(attr: string): DebugElement {
  return this.query(By.css(`[data-qa=${attr}]`));
};
