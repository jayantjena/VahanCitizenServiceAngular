import { Directive, HostListener, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';


@Directive({
  selector: '[appEmailValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidatorDirective), multi: true }
]
})
export class EmailValidatorDirective  implements Validator {
  constructor() {
   }

   validate(control: AbstractControl): { [key: string]: any } {
    let emailValue = control.value;
    let isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.
       test(emailValue); 
        if (!isValid) {
            return { validEmail: false ,
                    inValidChar : true }
        }
        return { validEmail: true,
            inValidChar : false  };
}

   @HostListener('keypress', ['$event']) onkeypress(event) {
    let key = event.keyCode;
    let emailChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890-_,@.;-";		//EMail
    var charcter = event.key;
    if (emailChar.indexOf(charcter) == -1) {
      if (key != 13) {
          if (key == 0){
              return;
          }
          else {
              event.returnValue = null;
              event.preventDefault();
          }

      }
    }
   }
}
