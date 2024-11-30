import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class FontSizeService {

  private currentFontSize: number = 15; // Default font size in px
  private maxfontsize: number = 17;
  private minfontsize: number = 13;
  fontSize: number = this.currentFontSize; // Current font size
  constructor() { }

  increaseFontSize(event: MouseEvent) {
    if (this.maxfontsize > this.currentFontSize) {
      this.currentFontSize += 1;
      this.updateFontSize();
      event.preventDefault();
    }
  }
  resetFontSize() {
    this.currentFontSize = 15; // Reset to normal font size
    this.updateFontSize();
   
  }
  decreaseFontSize(event: MouseEvent) {
    if (this.minfontsize < this.currentFontSize) {
      this.currentFontSize -= 2;
      this.updateFontSize();
      event.preventDefault();
    }
  }

  private updateFontSize() {
    $('.header-area .main-nav .logo h4').css('font-size', this.currentFontSize +9 + 'px');
    $('li').css('font-size', this.currentFontSize + 'px');
    $('a').css('font-size', this.currentFontSize + 'px');
    // $('span').css('font-size', this.currentFontSize + 'px');
    $('label').css('font-size', this.currentFontSize + 'px');
  }
}
