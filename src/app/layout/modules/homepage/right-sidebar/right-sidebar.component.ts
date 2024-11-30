import { Component, Input, OnInit } from '@angular/core';
import { BeforeLoginResource } from '../model/before-login-resources.class';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit {
  public resourceObj: BeforeLoginResource = new BeforeLoginResource();
  constructor( 
    // private _genericService:VahanresourceService
  ) { }

  ngOnInit() {
    // this.resourceObj = this._genericService.getGenericResources();
  }
 
  setMyStyle() {
    let styles = {
      'background':'#fff',
      'background-image': 'linear-gradient(#fff,#d4d0d4 , #444)',
      'background-repeat':'no-repeat',
      'border-radius':'10px'
    };
    return styles;
}

}
