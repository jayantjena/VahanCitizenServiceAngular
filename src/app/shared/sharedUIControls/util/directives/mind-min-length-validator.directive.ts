import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[ngm-min-length]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MindMinLenghtDirective, multi: true }]
})
export class MindMinLenghtDirective implements Validator {
  @Input()
  minLength: number;

  validate(c: FormControl): { [key: string]: any } {

    if(this.minLength == 0){
      return null;
    }

    let enterValueLength = 0
    if (c.value !== undefined && c.value !== null) {
      enterValueLength = c.value.length;
    }
    return (enterValueLength < this.minLength) ? { "minLength": true } : null;
  }
} 