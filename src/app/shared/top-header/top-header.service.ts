import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopHeaderService {
  send_data_lang = new Subject<any>();
  constructor() { }
  // constructor(public translate:TranslateService) { }

  // getLanguage(language){
  //   this.translate.addLangs(['en','hi'])
  //   this.translate.setDefaultLang('en');
  //   localStorage.setItem('lang',language)
  //    this.translate.use(language);
  // }
}
