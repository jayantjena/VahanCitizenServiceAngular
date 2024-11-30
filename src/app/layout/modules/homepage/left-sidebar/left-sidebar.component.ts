import { HomeData } from 'src/app/layout/modules/homepage/model/homeData';
import { Component, OnInit, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { LeftsidebarserviceService } from './leftsidebarservice.service';
import { MenulistserviceService } from './menulistservice.service';
import { LeftSidebarResorces } from './left-sidebar.model';
import { BeforeLoginResource } from '../model/before-login-resources.class';
import { AppResponseTypeEnum } from 'src/app/shared/Enum/AppResponseType.enum';
import { AppRequestHeaderModel } from 'src/app/shared/models/appRequestHeader.model';
import { AppResponse } from 'src/app/shared/models/appResponse';
import { MatDialog } from '@angular/material/dialog';
import { DialogavailserviceComponent } from '../dialogavailservice/dialogavailservice.component';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeftSidebarComponent implements OnInit {
  public resorceObj: LeftSidebarResorces = new LeftSidebarResorces();
  stateList: any;
  officeList: any[];
  selectedState: String;
  selectedRTO: any;
  isSubmitted: boolean = false;
  menuList: any;
  stateListFilter: any;
  officeListFilter: any;
  @Input() isHomePageDisplay: boolean = false;
  public resourceObj: BeforeLoginResource = new BeforeLoginResource();
  checked = false;
  isServiceMenuHidden: boolean = false;
  stateRTOForm!: FormGroup;
  HomeData: HomeData[];
  isBeforeMenuhide: string = "";
  isDisableProceesBtn: boolean = true;
  isAvailserviceDialog: boolean = false;
  selectedgroupState: string = "";
  selectedgroupRTO: string = "";


  constructor(public fb: FormBuilder,
    private router: Router,
    private leftsidebarserviceService: LeftsidebarserviceService,
    private menulistservice: MenulistserviceService,
    private dialog: MatDialog
    // private _genericService:VahanresourceService
  ) { }

  ngOnInit() {
    this.stateRTOForm = new FormGroup({
      stateName: new FormControl(null, Validators.required),
      RTOName: new FormControl(null, Validators.required),
      RegnNo: new FormControl(null, Validators.required)
    })
    // this.resourceObj = this._genericService.getGenericResources();
    // this.stateListFilter = JSON.parse(localStorage.getItem('statelist'));
    // alert(this.stateListFilter);
    // if(!this.stateListFilter){
    this.getAllStatesList();
    // }
   
    this.isHomePageDisplay = true;
  }

  search(query: string) {
     // this.stateListFilter=this.stateList.filter(a => a.descr.contains(query.toUpperCase));
    let result = this.select(query)
    this.stateListFilter = result;
    let officeresult = this.selectOffice(query)
    this.officeListFilter = officeresult;
  }
  searchOffice(query: string) {
    console.log('query', query)
    // this.stateListFilter=this.stateList.filter(a => a.descr.contains(query.toUpperCase));
    let officeresult = this.selectOffice(query)
    this.officeListFilter = officeresult;
  }

  select(query: string): string[] {
    let result: string[] = [];
    for (let state of this.stateList) {
      if (state.descr.toLowerCase().indexOf(query) > -1) {
        result.push(state)
      }
    }
    return result
  }

  selectOffice(query: string): string[] {
    let result: string[] = [];
    for (let office of this.officeList) {
      if (office.off_name.toLowerCase().indexOf(query) > -1) {
        result.push(office)
      }
    }
    return result
  }

  checkprivacypolicy(event) {
    if (event.checked == true) {
      this.isDisableProceesBtn = false;
    } else if (event.checked == false) {
      this.isDisableProceesBtn = true;
    }
  }


  //  selectedgroupState?: string, selectedgroupRTO?: string
  proceed(selectedgroupState?: string, selectedgroupRTO?: string) {
    this.selectedgroupState = selectedgroupState;
    this.selectedgroupRTO = selectedgroupRTO;
    localStorage.setItem("selectedgroupState", this.selectedgroupState);
    localStorage.setItem("selectedgroupRTO", this.selectedgroupRTO);
    if (selectedgroupState && selectedgroupRTO && selectedgroupState != 'Select State' && selectedgroupRTO != 'Select RTO') {
      this.isAvailserviceDialog = true;
      if (this.isAvailserviceDialog) {
        this.dialog.open(DialogavailserviceComponent);
      } else {
        this.isAvailserviceDialog = false;
        this.dialog.closeAll();
      }
    } else {

    }
  }

 


  getAllStatesList() {
    debugger
    const headerData = [];
    const filterParameter = {
      TranName: 'stateInfo'
    };
    headerData.push(new AppRequestHeaderModel('filterParameter', filterParameter));
    this.leftsidebarserviceService.getAllStatesList(headerData, '/masters/stateInfo', false, true)
      .subscribe({
        next: (resp: AppResponse) => {
          if (resp.responseType === AppResponseTypeEnum.Success) {
            this.stateList = resp.response ? resp.response : [];
            // console.log(this.stateList);
            this.stateListFilter = [...this.stateList];
            // console.log(this.stateListFilter);
            // localStorage.setItem('statelist', JSON.stringify(this.stateListFilter)) 
            //  alert(this.stateListFilter);
          } else if (resp.responseType === AppResponseTypeEnum.Information) {

          } else if (resp.responseType === AppResponseTypeEnum.Error) {

          }
        },
        error: (err) => {
          //  this.dialog.open(ErrorHandlingComponent)
        }
      }
      );
  }
  // this.leftsidebarserviceService.getAllStatesList().subscribe({next:(states:any[])=> {
  //     this.stateList = states;
  //     this.stateListFilter=this.stateList;
  //     console.log(this.stateListFilter);
  //   },
  //  error: err => {
  //     console.log(err);
  //   }}
  // );
  // }

  onChangeState(stateCode) {
    debugger
    const requrl = `/masters/officeInfo/${stateCode.value}`
    const headerData = [];
    const filterParameter = {
      TranName: 'getOfficeListByStateCode',
      stateCode: stateCode.value
    };
    headerData.push(new AppRequestHeaderModel('filterParameter', filterParameter));
    var onchangeState = 
    this.leftsidebarserviceService.onChangeState(headerData, requrl, false, true)
      .subscribe({
        next: (resp: AppResponse) => {
          if (resp.responseType === AppResponseTypeEnum.Success) {
            this.officeList = resp.response ? resp.response : [];
            this.officeListFilter = [...this.officeList];
            this.stateListFilter = [...this.stateList];
          } else if (resp.responseType === AppResponseTypeEnum.Information) {

          } else if (resp.responseType === AppResponseTypeEnum.Error) {

          }
        },
        error: (err) => console.error("API exception")
      }
      );
      setTimeout(() => {
        console.log('observerA unsubscribed');
        onchangeState.unsubscribe();
      }, 1200);
    // this.leftsidebarserviceService.onChangeState(stateCode.value).subscribe({next:(res:any[]) => {
    //     this.officeList = res;
    //     this.officeListFilter=this.officeList;
    //     this.stateListFilter=this.stateList;
    //     console.log("office list "+this.officeListFilter);
    //   },
    //   error:err => {
    //     console.log(err);
    //   }}
    // );

  }
   


}
