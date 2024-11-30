import { Component, Input } from '@angular/core';
 
import { BeforeLoginResource } from '../model/before-login-resources.class';
import { VahanresourceService } from 'src/app/services/common/vahanresource.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeftSidebarResorces } from '../left-sidebar/left-sidebar.model';
import { LeftsidebarserviceService } from '../left-sidebar/leftsidebarservice.service';
import { MenulistserviceService } from '../left-sidebar/menulistservice.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from 'src/app/shared/dialog-body/dialog-body.component';
import { MaphomepageserviceService } from '../maphomepage/maphomepageservice.service';
@Component({
  selector: 'app-vs-new-layout',
  templateUrl: './vs-new-layout.component.html',
  styleUrls: ['./vs-new-layout.component.css']
})
export class VsNewLayoutComponent {

  public resorceObj:LeftSidebarResorces = new LeftSidebarResorces();
  stateList: any;
  officeList: any[];
  selectedState: String;
  selectedRTO: number;
  isSubmitted:boolean=false;
  menuList:any;
  stateListFilter:any;
  officeListFilter:any;
  @Input() isHomePageDisplay:boolean = false;
  public resourceObj: BeforeLoginResource = new BeforeLoginResource();
  checked = false;
  isServiceMenuHidden: boolean = false;

  
  noOfServices: any;
  onLineServicesList: any[];
   
  constructor(private maphomepageservice: MaphomepageserviceService,private matDialog: MatDialog,public fb: FormBuilder,private router: Router, private leftsidebarserviceService: LeftsidebarserviceService,
    private menulistservice:MenulistserviceService,private _genericService:VahanresourceService) { }
  stateRTOForm = this.fb.group({
    stateName: ['', [Validators.required]],
    RTOName: ['', [Validators.required]],
    RegnNo: ['', [Validators.required]]
  })
  ngOnInit() {
    // this.resourceObj = this._genericService.getGenericResources();
    this.getAllStatesList();
    this.isHomePageDisplay = true;
     
  }
   
  search(query: string){
    console.log('query', query)
   // this.stateListFilter=this.stateList.filter(a => a.descr.contains(query.toUpperCase));
    let result = this.select(query)
    this.stateListFilter = result;
    let officeresult = this.selectOffice(query)
    this.officeListFilter = officeresult;
  }
  searchOffice(query: string){
    console.log('query', query)
   // this.stateListFilter=this.stateList.filter(a => a.descr.contains(query.toUpperCase));
    let officeresult = this.selectOffice(query)
    this.officeListFilter = officeresult;
  }

  select(query: string):string[]{
    let result: string[] = [];

    for(let state of this.stateList){
      if(state.descr.toLowerCase().indexOf(query) > -1){
        result.push(state)
      }
    }
    return result
  }

  selectOffice(query: string):string[]{
    let result: string[] = [];
    for(let office of this.officeList){
      if(office.off_name.toLowerCase().indexOf(query) > -1){
        result.push(office)
      }
    }
    return result
  }


  // proceed(){
  //   //  '/vs/vahan/admin/portal-login'
  //   // this.isServiceMenuHidden = true;
  //   // this.menulistservice.getServiceComList(this.isServiceMenuHidden);
  //   this.router.navigate(['/vs/servicelist']) 
  //    sessionStorage.setItem('serviceListMenu','serviceListMenu')
  // }
  proceed(selectedgroupState?: string, selectedgroupRTO?: string) {
   
    if (!(selectedgroupState == "" || selectedgroupState === undefined) &&
      !(selectedgroupRTO == "" || selectedgroupRTO === undefined) ) {
      localStorage.setItem( "selectedgroupState", selectedgroupState);
      localStorage.setItem( "selectedgroupRTO", selectedgroupRTO);
      //  this.hideParent.emit(!this.showFlyoutModel)
      if(selectedgroupState=='DL'){
        window.location.href = "https://vahan.parivahan.gov.in/vahaneservice/?stateCd=DL";
      }
      if(selectedgroupState=='SK'){
        window.location.href="https://vahan.parivahan.gov.in/vahaneservice/?stateCd=SK";
      }
      this.leftsidebarserviceService.getServiceFromStateCdOffCd(selectedgroupState,Number(selectedgroupRTO)).subscribe((states:any[])=>
       {
          this.menuList = states;
          this.menulistservice.setmenuListService(this.menuList);
          console.log(this.menuList);
          if(this.menuList !== null && this.menuList!==undefined){
            this.leftsidebarserviceService.setStateAndOffice(selectedgroupState,Number(selectedgroupRTO))
            this.router.navigate(['service-after-menu']);
            this.isSubmitted=true;
            }
        },
        err => {
          console.log(err);
          
        });
    }
  }

  getAllStatesList() {
    this.leftsidebarserviceService.getAllStatesList().subscribe(
      {next:(states:any[])=> {
        this.stateList = states;
        this.stateListFilter=this.stateList;
        console.log(this.stateListFilter);
      },
      error:err => {
        console.log(err);
      }}
    );
  }

  onChangeState(stateCode) {
    // alert(stateCode.value);
    this.leftsidebarserviceService.onChangeState(stateCode.value).subscribe((res:any[]) => {
        this.officeList = res;
        this.officeListFilter=this.officeList;
        this.stateListFilter=this.stateList;
        console.log("office list "+this.officeListFilter);
      },
      err => {
        console.log(err);
      }
    );

  }
  private handleError(error: any): Promise<Array<any>> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


    

  getTotalServices(state_cd:String){
  this.maphomepageservice.getTotalServices(state_cd).subscribe((states:any[])=>{
    this.noOfServices =  states;
    
    },
    err => {
    console.log(err);
    }
   );
  }

  fetchServicesOfStates(state_cd:String){
    this.maphomepageservice.fetchServicesOfStates(state_cd).subscribe((res:any[]) => {
      this.onLineServicesList =  res;
      console.log(this.onLineServicesList);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data=this.onLineServicesList;
    this.matDialog.open(DialogBodyComponent, dialogConfig);
      },
      err => {
      console.log(err);
      }
     );
    }


}
