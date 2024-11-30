import { FormControl } from '@angular/forms';
import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
 
 import { TranslateService } from '@ngx-translate/core';
import { TopHeaderService } from './top-header.service';
import { Subject } from 'rxjs';
import { BeforeLoginResource } from 'src/app/layout/modules/homepage/model/before-login-resources.class';
import { UserManualComponent } from 'src/app/layout/modules/homepage/user-manual/user-manual.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { FontSizeService } from 'src/app/services/common/font-size.service';
declare var $: any;
 
@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css'] 
})
export class TopHeaderComponent implements OnInit {
  public resourceObj: BeforeLoginResource = new BeforeLoginResource();
  switchTheme= new FormControl(false);
  @HostBinding('class') className='';
  darkClass = 'theme-dark';
  lightClass = 'theme-light';

  constructor(
    private dialog: MatDialog,   
    public translate:TranslateService,
    private topsrvs:TopHeaderService,
    private themeService: ThemeService,
    private fontSizeService: FontSizeService
    ){
    this.translate.addLangs(['english','हिंदी'])
    this.translate.setDefaultLang('english');

    }
  
  switchLanguage(language:string){ 
    localStorage.setItem('lang',language)
     this.translate.use(language);
     this.topsrvs.send_data_lang.next(language)
  }
   
  ngOnInit(): void{  
  // this.resourceObj =  this._genericService.getGenericResources();
  localStorage.getItem('lang') || 'english';
 }

 openusermanualdlg() {
    this.dialog.open(UserManualComponent)
  }
  changeTheme(theme: string) {
    this.themeService.setTheme(theme);
  }
  resetFontSize(){
    this.fontSizeService.resetFontSize();
  }
  increase(event) {
    this.fontSizeService.increaseFontSize(event);
  }

  decrease(event) {
    this.fontSizeService.decreaseFontSize(event);
  }
 
}
