import {Directive, HostBinding, HostListener} from '@angular/core'

@Directive
({ 
    selector: '[ngm-show-hide]'
})
export class ShowHideInput
{
    @HostBinding() type: string;
   
    constructor(){
        this.type='password';
    }
    
    changeType(type:string): void {
        this.type = type;
    }
}