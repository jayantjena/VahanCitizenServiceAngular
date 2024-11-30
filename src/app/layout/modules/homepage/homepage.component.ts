import { Component, OnInit } from '@angular/core';
 
import { TranslateService } from '@ngx-translate/core';
 
 
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public isLogedIn=false;
  public isHomePageDisplay:boolean = false;
  constructor(
    // private loginService:LoginService,
    private translate:TranslateService 
  ) { 
    this.translate.setDefaultLang('english');
    this.translate.use(localStorage.getItem('lang') || 'english')
    }
  ngOnInit() {
    // this.isLogedIn=this.loginService.isLogedIn();
  }
    
}
