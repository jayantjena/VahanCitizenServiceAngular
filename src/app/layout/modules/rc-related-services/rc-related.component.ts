import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TopHeaderService } from 'src/app/shared/top-header/top-header.service';

@Component({
  selector: 'app-rc-related',
  templateUrl: './rc-related.component.html',
  styleUrls: ['./rc-related.component.css']
})
export class RcRelatedComponent {
  sub: Subscription;
  languages = "";
  constructor(
    private translate:TranslateService,
    private topsrv:TopHeaderService ) { 
    this.translate.setDefaultLang('english');
    this.translate.use(localStorage.getItem('lang') || 'english')
    }
    ngOnInit(): void {
      this.translate.setDefaultLang('english');
      this.translate.use(localStorage.getItem('lang') || 'english')
    }
    
    ngAfterContentInit() {
      this.sub = this.topsrv.send_data_lang.subscribe(
        data => {
          console.log(data)
          this.languages = data;
          this.translate.use(this.languages)
        }
      )
    }
    ngOnDestroy() {
      if (this.sub) {
        this.sub.unsubscribe()
      }
    }
}