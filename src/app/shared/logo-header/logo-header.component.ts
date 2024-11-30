import { Component, OnInit } from '@angular/core';
 
import { BeforeLoginResource } from 'src/app/layout/modules/homepage/model/before-login-resources.class';
import { SvgService } from 'src/app/services/common/svg.service';
import { AppResponseTypeEnum } from '../Enum/AppResponseType.enum';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
 

@Component({
  selector: 'app-logo-header',
  templateUrl: './logo-header.component.html',
  styleUrls: ['./logo-header.component.css']
})
export class LogoHeaderComponent implements OnInit{
  public resourceObj: BeforeLoginResource = new BeforeLoginResource();
  isMenuFlag:boolean = false;
  emblemLogoSvg:SafeHtml;
  private svgImage: any;
  
constructor(private _svgService: SvgService,private _sanitizer: DomSanitizer,
  // private _genericService:VahanresourceService,
  // private menulistservice:MenulistserviceService
){
  // this.menulistservice.updatedMenu.subscribe(mn=>this.isMenuFlag=mn);
}
ngOnInit(): void {
  // this.resourceObj = this._genericService.getGenericResources();
  // this.menulistservice.updatedMenu.subscribe(mn=>this.isMenuFlag=mn);
  // throw new Error('Method not implemented.');
  this.getSvgIcons();
}
getSvgIcons() {
  this._svgService.getSvg().subscribe((resp: any) => {
    if (resp.responseType === AppResponseTypeEnum.Success) {
      this.svgImage = resp.response;
       let emblemLogo = this.svgImage.filter(function
        (value) { return (value.iconType === 'emblemLogoSvg'); });
      this.emblemLogoSvg = this._sanitizer.bypassSecurityTrustHtml(emblemLogo[0].iconName);  
    }
  });
   
}
  setNavBackground() {
    let styles = {
      // 'background': '#037188',
      // 'background-image': 'url("../../assets/img/homepage-images/flag-mark.png"), linear-gradient(180deg, #79b3f1, #037188)',
      'background-image': 'radial-gradient(#208ECE 20%, #208ECE 50%, #2BB0D5 100%)',
      'background-repeat': 'no-repeat',
      'background-position': 'right',
      'background-size': 'contain',
    };
    return styles;
  }
}
