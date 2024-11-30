/*
Created By: Rahul Mishra
Date:20-07-2020
Useability: To restrict user to input only numbers with a single dot and will not allow any specialKeys into it in the start.


*/

import { Directive, HostListener, ElementRef } from '@angular/core';
@Directive({
    selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

    private regex: RegExp = new RegExp(/^[-+]?[0-9]+(\.[0-9]*){0,1}$/g);
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'ArrowRight', 'ArrowLeft'];

    constructor(private el: ElementRef) {
    }
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        const current: string = this.el.nativeElement.value;
        const next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }
}