import { ElementRef, Directive, Renderer2, Input } from "@angular/core";

@Directive({
    selector : '[myFocus]'
  })
  export class MyFocusDirective {
    constructor(public renderer: Renderer2, public elementRef: ElementRef) {}
  
    @Input()
    set myFocus(value :boolean) {
      if(value) {
        this.renderer.selectRootElement(this.elementRef.nativeElement).focus();
      }
    }
  }