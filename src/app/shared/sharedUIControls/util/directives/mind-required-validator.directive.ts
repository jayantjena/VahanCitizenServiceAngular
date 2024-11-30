import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[ngm-required]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MindRequiredDirective, multi: true }]
})
export class MindRequiredDirective implements Validator {
  @Input()
  required: any;

  validate(c: FormControl): { [key: string]: any } {
    if (this.required == undefined || this.required.toString() != "true") {
      return null;
    }
    if (c.value === undefined || c.value === null || c.value.toString().trim() === "" || c.value === "select") {
      return { "required": true };
    }
    else {
      return null;
    }
  }
} 