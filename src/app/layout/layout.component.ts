import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenulistserviceService } from './modules/homepage/left-sidebar/menulistservice.service';
 
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isMenuFlag:boolean;
  constructor(private route: ActivatedRoute,
    private menulistservice:MenulistserviceService
  ){
    // sessionStorage.setItem('isServiceMenuHidden','false');
   this.menulistservice.updatedMenu.subscribe(mn=>this.isMenuFlag=mn);
  }
  ngOnInit() {
  
  }
}
