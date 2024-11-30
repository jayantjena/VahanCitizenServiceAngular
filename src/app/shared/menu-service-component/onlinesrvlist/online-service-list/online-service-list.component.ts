import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceMenuInterface } from './servicemenuInterface';
import { MenulistserviceService } from 'src/app/layout/modules/homepage/left-sidebar/menulistservice.service';
import { LeftsidebarserviceService } from 'src/app/layout/modules/homepage/left-sidebar/leftsidebarservice.service';
import { AppResponseTypeEnum } from 'src/app/shared/Enum/AppResponseType.enum';
import { AppRequestHeaderModel } from 'src/app/shared/models/appRequestHeader.model';
import { AppResponse } from 'src/app/shared/models/appResponse';



@Component({
  selector: 'app-online-service-list',
  templateUrl: './online-service-list.component.html',
  styleUrls: ['./online-service-list.component.css']
})
export class OnlineServiceListComponent implements OnInit {
  // menuListServicedata:any;
  stateCode: String;
  offCode: number;
  payyrTax: boolean = true;

  menuListServicedata: ServiceMenuInterface;
  selectedgroupState: string;
  selectedgroupRTO: string;
  menuList: any;

  isSubmitted: boolean;
  constructor(private menuListService: MenulistserviceService,
    private leftsidebarserviceService: LeftsidebarserviceService) {
  }
  ngOnInit() {
    debugger
    // this.submit();
    //  this.menuListServicedata=this.menuListService.getmenuListService();
    // localStorage.getItem(this.menuListServicedata);
    // console.log(this.menuListServicedata.istax);

    let menuicn = document.querySelector(".menuicn");
    let nav = document.querySelector(".navcontainer");
    menuicn.addEventListener("click", () => {
      nav.classList.toggle("navclose");
    })

    this.getAvaildialog();
  }

  getAvaildialog() {
    const headerData = [];
    const filterParameter = {
      TranName: 'getServiceFromStateCdOffCd'
    };
    headerData.push(new AppRequestHeaderModel('filterParameter', filterParameter));
    this.selectedgroupState = localStorage.getItem("selectedgroupState");
    this.selectedgroupRTO = localStorage.getItem("selectedgroupRTO");
    const requrl = `/masters/getServiceFromStateCdOffCd/${this.selectedgroupState}/${Number(this.selectedgroupRTO)}`;
    //  this.hideParent.emit(!this.showFlyoutModel)
    if (this.selectedgroupState == 'DL') {
      window.location.href = "https://vahan.parivahan.gov.in/vahaneservice/?stateCd=DL";
    }
    if (this.selectedgroupState == 'SK') {
      window.location.href = "https://vahan.parivahan.gov.in/vahaneservice/?stateCd=SK";
    }
    this.leftsidebarserviceService.getServiceFromStateCdOffCd(headerData, requrl, false, true).subscribe(
      {
        next: (resp: AppResponse) => {
          if (resp.responseType === AppResponseTypeEnum.Success) {
            this.menuListServicedata = resp.response[0] ? resp.response[0] : [];
            this.menuListService.setmenuListService(this.menuListServicedata);
            console.log(this.menuListServicedata);
            if (this.menuListServicedata !== null && this.menuListServicedata !== undefined) {
              this.leftsidebarserviceService.setStateAndOffice(this.selectedgroupState, Number(this.selectedgroupRTO))
              this.isSubmitted = true;
            }
          } else if (resp.responseType === AppResponseTypeEnum.Information) {

          } else if (resp.responseType === AppResponseTypeEnum.Error) {

          }
        },
        error: (err) => {
          //  this.dialog.open(ErrorHandlingComponent)
        }
      });
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
  // submit() {
  //   // alert('online service menu');
  //   this.menuListServicedata=this.menuListService.getmenuListService();
  //   this.stateCode = localStorage.getItem("selectedgroupState");
  //   this.offCode = Number(localStorage.getItem("selectedgroupRTO"));
  //   this.leftsidebarserviceService.getServiceFromStateCdOffCd(this.stateCode, Number(this.offCode))
  //     .subscribe((response: any) => {
  //       this.menuListServicedata = response;
  //       //  console.log("online menuuuuu" +this.menuListService);

  //     })
  //   console.warn('MEnu Service Dtaa :', this.menuListServicedata);
  // }
}
