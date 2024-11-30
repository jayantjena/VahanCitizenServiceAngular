import { Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LeftsidebarserviceService } from 'src/app/layout/modules/homepage/left-sidebar/leftsidebarservice.service';
import { MenulistserviceService } from 'src/app/layout/modules/homepage/left-sidebar/menulistservice.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SvgService } from 'src/app/services/common/svg.service';
import { AppResponseTypeEnum } from 'src/app/shared/Enum/AppResponseType.enum';
import { BeforeLoginResource } from 'src/app/layout/modules/homepage/model/before-login-resources.class';
import { AppRequestHeaderModel } from 'src/app/shared/models/appRequestHeader.model';
declare var $: any;
@Component({
  selector: 'app-services-menu',
  templateUrl: './services-menu.component.html',
  styleUrls: ['./services-menu.component.css']
})
export class ServicesMenuComponent implements OnInit {

  // bharatsrkr = 'भारत सरकार';
  // govtInd = 'GOVERNMENT OF INDIA';
  // marquee = 'to know Procedure and checklist for availing any Service on Vahan Citizen Portal. If unable to View/Login, clear your browser history and try again';
  // usermanualImage = 'assets/img/homepage-images/User_Manual.png'
  //menuListServicedata:any;
  stateCode: String;
  offCode: number;
  menuListServicedata: any;
  iconValue: any;
  emblemLogoSvg: SafeHtml;
  private svgImage: any;
  public resourceObj: BeforeLoginResource = new BeforeLoginResource();
  // @ViewChild(ServiceUserEntryPageComponent) child;  
  constructor(private router: Router,
    private menuListService: MenulistserviceService,
    private leftsidebarserviceService: LeftsidebarserviceService,
    private _svgService: SvgService,
    private _sanitizer: DomSanitizer,) {

  }
  ngOnInit() {
    this.submit();
    //  this.child.showFields(); 
    // this.menuListServicedata=this.menuListService.getmenuListService();
    // localStorage.getItem(this.menuListServicedata);
    // console.log(this.menuListServicedata.istax);
    this.getSvgIcons();

    if ($(".main-header li.dropdown ul").length) {
      $(".main-header .navigation li.dropdown")
        .append('<div class="dropdown-btn"><i class="fa fa-angle-down"></i></div>');
    }
    if ($(".mobile-menu").length) {
      // var mobileMenuContent = $(".main-header .main-menu .navigation").html();
      // $(".mobile-menu .navigation").append(mobileMenuContent);
      // $(".sticky-header .navigation").append(mobileMenuContent);
      $(".mobile-menu .close-btn").on("click", function () {
        $("body").removeClass("mobile-menu-visible");
      });
      $(".mobile-menu li a").on("click", function () {
        $("body").removeClass("mobile-menu-visible");
      });
      $(".mobile-menu li.dropdown .dropdown-btn").on("click", function () {
        $(this).prev("ul").slideToggle(500);
        $(this).toggleClass("active");
      });
      $(".mobile-nav-toggler").on("click", function () {
        $("body").addClass("mobile-menu-visible");
      });
      $(".mobile-menu .menu-backdrop, .mobile-menu .close-btn").on("click", function () {
        $("body").removeClass("mobile-menu-visible");
      });
    }
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

  payTax(iconVal: any) {
    if (iconVal == 'TO') {
      localStorage.setItem('pur_cd', '5')
    }
    if (iconVal == 'CA') {
      localStorage.setItem('pur_cd', '4')
    }
    if (iconVal == 'HPT') {
      localStorage.setItem('pur_cd', '7')
    }
    if (iconVal == 'DPC') {
      localStorage.setItem('pur_cd', '3')
    }
    localStorage.setItem('iconValue', iconVal);
    this.menuListService.payTax(iconVal);
    // window.location.reload();
  }
  submit() {
    const headerData = [];
    const filterParameter = {
      TranName: 'getServiceFromStateCdOffCd'
    };
    headerData.push(new AppRequestHeaderModel('filterParameter', filterParameter));
    this.stateCode = localStorage.getItem("selectedgroupState");
    this.offCode = Number(localStorage.getItem("selectedgroupRTO"));
    const requrl = `/masters/getServiceFromStateCdOffCd/${this.stateCode}/${Number(this.offCode)}`;
    this.leftsidebarserviceService.getServiceFromStateCdOffCd(headerData, requrl, false, true)
      .subscribe((response: any) => {
        this.menuListServicedata = response[0]?response[0]:response;
      })
    //console.log("statyyyyyyy menuuuuu" +this.menuListServicedata);
  }
  getHomePage() {
    // sessionStorage.clear();
    sessionStorage.removeItem('menulistservice');
    this.router.navigate(['vahanservice'])
  }
}
