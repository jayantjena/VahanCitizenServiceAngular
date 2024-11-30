import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NocIssuedVehicleComponent } from 'src/app/layout/modules/homepage/noc-issued-vehicle/noc-issued-vehicle.component';
import { TemporaryRegistedVehicleComponent } from 'src/app/layout/modules/homepage/temporary-registed-vehicle/temporary-registed-vehicle.component';
import { MenulistserviceService } from 'src/app/layout/modules/homepage/left-sidebar/menulistservice.service';
import { LoginService } from 'src/app/services/common/login.service';
import { LeftsidebarserviceService } from 'src/app/layout/modules/homepage/left-sidebar/leftsidebarservice.service';
import { Subscription } from 'rxjs';
import { SvgIcons } from './menu.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SvgService } from 'src/app/services/common/svg.service';
import { AppResponseTypeEnum } from '../Enum/AppResponseType.enum';
import { AppRequestHeaderModel } from '../models/appRequestHeader.model';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit  {
  private svgImage: any;
  public isLogedIn = false;
  public menuhiddenmenu = false;
  userName: any;
  emblemLogoSvg:SafeHtml;
  //  public resourceObj: BeforeLoginResource = new BeforeLoginResource();
  // @ViewChild('logoutDialog', { static: true }) logoutDialog: TemplateRef<any>;

  stateCode: String;
  offCode: number;
  menuListServicedata: any;
  iconValue: any;
  isserviceMenuuOn: boolean = false;
  isBeforeMenuhide = "";
  private serviceList:Subscription;
  ismenuAfter: boolean = false;
  svgIcons: SvgIcons = new SvgIcons();
  constructor(
    private loginService: LoginService, 
    public dialog: MatDialog,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private menuListService: MenulistserviceService,
    private leftsidebarserviceService: LeftsidebarserviceService,
    private _svgService: SvgService,
    private _sanitizer: DomSanitizer,private translate:TranslateService 
  ) {
    
    this._activatedRoute.queryParamMap.subscribe(queryParams => {
      let data = JSON.parse(queryParams.get('data'));
      // console.log("data is locate that"+data);
      this.isserviceMenuuOn = data;
  });

    // this.menuListService.updatedMenu.subscribe(mn=>this.isserviceMenuuOn=mn);
    // private translate:TranslateService 
    // this.translate.setDefaultLang('en');
    // this.translate.use(localStorage.getItem('lang') || 'en')
    // this.isserviceMenuuOn = this.loginService.isServiceMenuOn();
  }

  // ngOnInit(): void {
    // this.isserviceMenuuOn = false;
    // this.menuListService.updatedMenu.subscribe((mn:any)=>{
    //   this.isserviceMenuuOn=mn;
    //   return this.isserviceMenuuOn;
    // });
  // this.resourceObj = this._genericService.getGenericResources();
  // throw new Error('Method not implemented.');

  // }

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
  

  ngOnInit() {
  //   this.translate.setDefaultLang('en');
  //   this.translate.use(localStorage.getItem('lang') || 'en')
  //   if ($(".main-header").length) {
  //     var windowpos = $(window).scrollTop();
  //     var siteHeader = $(".header-style-one");
  //     var scrollLink = $(".scroll-to-top");
  //     var sticky_header = $(".main-header .sticky-header");
  //     if (windowpos > 100) {
  //         sticky_header.addClass("fixed-header animated slideInDown");
  //         scrollLink.fadeIn(300);
  //     } else {
  //         sticky_header.removeClass("fixed-header animated slideInDown");
  //         scrollLink.fadeOut(300);
  //     }
  //     if (windowpos > 1) {
  //         siteHeader.addClass("fixed-header");
  //     } else {
  //         siteHeader.removeClass("fixed-header");
  //     }
  // }
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
     this.getSvgIcons();
    // this.submit();
    this.isLogedIn = this.loginService.isLogedIn();
    this.userName = localStorage.getItem('token');
    this.isserviceMenuuOn = this.menuListService.ismenuon();
    if(sessionStorage.getItem('menulistservice')){
      this.ismenuAfter  =true;
    }else{
      this.ismenuAfter  =false;
    }
  // this.serviceList= this.menuListService.onlineservicelistmenu.subscribe((res:any)=>{
  //   this.ismenuAfter = res? true:false;
   
  //   })
     
  }



  logoutUser() {
    // this.dialog.open(this.logoutDialog);
    // this.loginService.logout();
    // location.reload();
  }
  openusermanualdlg(mode, event: MouseEvent) {
    event.preventDefault();
    if (mode.toLowerCase() == 'noc') {
      this.dialog.open(NocIssuedVehicleComponent)
    } else if (mode.toLowerCase() == 'tempregvhcl') {
      this.dialog.open(TemporaryRegistedVehicleComponent)
    }

  }
  

  // ngOnDestroy(){
  //   this.serviceList.unsubscribe();
  // }
  getHomePage(){
    // sessionStorage.clear();
    sessionStorage.removeItem('menulistservice');
    this.ismenuAfter  =false;
    this.router.navigate(['vahanservice'])
  }



}
