import { Directive, Input, HostListener } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[ngm-max-length]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MindMaxLenghtDirective, multi: true }]
})
export class MindMaxLenghtDirective implements Validator {
  @Input()
  maxLength: number;

  validate(c: FormControl): { [key: string]: any } {
    if (this.maxLength == 0) {
      return null;
    }
    let enterValueLength = 0
    if (c.value !== undefined && c.value !== null) {
      enterValueLength = c.value.length;
    }
    return (enterValueLength > this.maxLength) ? { "maxLength": true } : null;
  }
} 