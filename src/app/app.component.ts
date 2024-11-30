import { Component, HostBinding, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { LoaderService } from './services/common/loader.service';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  switchTheme= new FormControl(false);
  @HostBinding('class') className='';
  darkClass = 'theme-dark';
  lightClass = 'theme-light';

  currentTheme: string;
  constructor(
    public loaderService: LoaderService,
    private router: Router,
    private bnIdle: BnNgIdleService, 
    private themeService: ThemeService) {
    // let serviceListUse=localStorage.setItem('iconValue', this.iconValue);
    //   router.events.forEach((event) => {
    //     if (event instanceof NavigationStart) {
    //       if (event['url']=='/pgi-service' ||
    //        event['url']=='/aadhat_auth'  
    //         ) {
    //         this.showHead = true;
    //       } else {
    //         // console.log("NU")
    //         this.showHead = false;
    //       }
    //     }
    //   });
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
      this.applyTheme(theme);
    });
  }
  //    useLanguage(language: string): void {
  //     this.translate.use(language);
  // }
  ngOnInit() {
     debugger
    this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        this.router.navigate(['/session-expire']);
      }
    });
    
  }
  applyTheme(theme: string) {
    document.body.className = theme; // Apply the theme class to the body
  }


}
