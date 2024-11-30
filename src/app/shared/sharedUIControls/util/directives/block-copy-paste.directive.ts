import { Directive, HostListener } from '@angular/core';
import { AppConfigService } from 'src/app/services/common/appConfig.service';

@Directive({
  selector: '[appBlockCopyPaste]'
})
export class BlockCopyPasteDirective {
  constructor(private _appConfig: AppConfigService) { }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    if (!this._appConfig.getAppConfig('isAllowCopyPaste')) {
      e.preventDefault();
    }
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    if (!this._appConfig.getAppConfig('isAllowCopyPaste')) {
      e.preventDefault();
    }
  }

  @HostListener('dragover', ['$event']) blockDragover(e: KeyboardEvent) {
    if (!this._appConfig.getAppConfig('isAllowCopyPaste')) {
      e.preventDefault();
    }
  }

}