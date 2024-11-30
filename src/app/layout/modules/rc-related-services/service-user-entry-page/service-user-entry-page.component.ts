import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
  
import { ServiceEntryService } from './service-entry.service';
import { ChangeOfAddressDto } from '../ChangeOfAddressDto';
import { ValidateOtp } from '../change-address/ValidatOtp';
import { CustomvalidationService } from 'src/app/services/common/customvalidation.service';
import { LoginService } from 'src/app/services/common/login.service';
import { propertiesConfigEN } from 'src/app/shared/message.config/properties.config.en';
import { MenulistserviceService } from '../../homepage/left-sidebar/menulistservice.service';

@Component({
  selector: 'app-service-user-entry-page',
  templateUrl: './service-user-entry-page.component.html',
  styleUrls: ['./service-user-entry-page.component.css']
})
export class ServiceUserEntryPageComponent implements OnInit {
  iconValue: any= this.menuIconService.onlineservicelistmenu;
  menulist: any;
  regn_no: string;
  chsNo: string;
  chasis_no: boolean = true;
  entrypageheader: String = "";
  authPanelforMobEmail = '';
  generateOTP: boolean;
  mobileAadhaarPanel: boolean;
  hideRegnChasiPanel: boolean = true;
  validRegnChasi: NgForm;
  submitted: boolean = false;
  mobile_No: number;
  mobileListData: any;
  validMobile: NgForm;
  reGenerateOTPBtn: boolean;
  gen_OTP: number;
  errorMessage: any;
  ownerListData: any;
  refID: any;
  disableMobileNo:boolean=false;
  pendingList:any;
  @Input() public pur_cd_value:any;
  public changeOfAddressDto: ValidateOtp;

  @ViewChild('otpDialog') otpDialog: TemplateRef<any>;

  tooltip_for_chasi_no=propertiesConfigEN.tooltip_for_chasi_no;

  otp: string; 
  showOtpComponent = true; 
@ViewChild("ngOtpInput", { static: false }) ngOtpInput: any; 
config = { allowNumbersOnly: true, length: 4, isPasswordInput: false, disableAutoFocus: false, inputStyles: { width: "40px", height: "40px", }, }; 

  constructor(private menuIconService: MenulistserviceService,
    public dialog: MatDialog,
    private router: Router,
    private loginService: LoginService,
    private customValidator: CustomvalidationService,
    private serviceentry: ServiceEntryService) {
    this.changeOfAddressDto = new ValidateOtp();
  }

  ngOnInit(): void {
    this.disableMobileNo=true;
    // this.iconValue = localStorage.getItem("iconValue");
    this.menuIconService.iconValue.subscribe((item:any)=>{
      this.iconValue =  item;
      alert(item);
      if(this.iconValue){
        this.showFields();
      }
      
    })
    //console.log("icon value is found by local storage " + this.iconValue);
    
    // window.location.reload();
  }
// OTP Code 
onOtpChange(otp) { this.otp = otp;
   // When all 4 digits are filled, trigger OTP validation method
    if (otp.length == 4) { this.validateOtp(); } }
     setVal(val) { this.ngOtpInput.setValue(val); } 
     onConfigChange() { this.showOtpComponent = false; 
      this.otp = null; 
      setTimeout(() => { this.showOtpComponent = true; }, 0); } 
      validateOtp() { }// write your logic here to validate it, you can integrate sms API here if you want } 

  validateRegnChasi(regn_no, chsNo) {
    debugger
    this.hideRegnChasiPanel = false;
    this.mobileAadhaarPanel = true;
    const chassicNo = chsNo;
    let trimmedchassicNo = chassicNo.trim();
    localStorage.setItem("regn_no", regn_no);
    const state_cd = localStorage.getItem("selectedgroupState");
    const pur_cd = localStorage.getItem("pur_cd");
    this.submitted = true;
    if (regn_no != "" && trimmedchassicNo != "" && pur_cd != "" && state_cd != "") {
      this.serviceentry.validateRegnChasi(regn_no, trimmedchassicNo, state_cd, pur_cd).subscribe({next:(ownerListData) => {
        this.ownerListData = ownerListData;
        if (this.ownerListData.conditionstatus == true) {
          this.mobile_No = this.ownerListData.mobile_no;
          this.hideRegnChasiPanel = false;

          this.mobileAadhaarPanel = true;
        }
      }, error:err => { 
        console.log(err);
      }});

    }
  }

  generateOTPforMobile(mobileNo) {
   
    this.submitted = true;
    if (this.submitted) {
      this.reGenerateOTPBtn = true;
      this.generateOTP = true;
      this.loginService.generateOTP(mobileNo).subscribe(
        {next:(mobileData) => {
        this.mobileListData = mobileData;
        // console.log(" "+this.mobileListData);
        if (this.mobileListData != "") {
          this.refID = this.mobileListData.refId;
          this.dialog.open(this.otpDialog)
          this.reGenerateOTPBtn = true;
          this.generateOTP = true;
          //sessionStorage.setItem("mobileNo", mobileNo);
        }
      }, error:err => {
        console.log(err);
      }});
    }
  }
  mobNoWise: boolean;
  getMobileAuthentication() {
    this.mobNoWise = true;
    this.mobileAadhaarPanel=false;
  }
   
   getAadhaarAuthentication()
   {
     this.router.navigate(['/aadhat_auth']);
   }

  //  showAllServices(mobile_no, otp) {
  showAllServices() {
    this.router.navigate(['/vs/rcservice/tocahpdrchd']);
    if (String(this.gen_OTP) != " " && this.gen_OTP != null) {
      // this.changeOfAddressDto.mobile_no=mobile_no;
      // this.changeOfAddressDto.otp=otp;
      this.changeOfAddressDto.regn_no=localStorage.getItem("regn_no");
      this.serviceentry.showAllServices(this.changeOfAddressDto)
        .subscribe({next:(responseOTP: any) => {
          if (responseOTP != null && responseOTP != '') {
            this.errorMessage = responseOTP;
            this.pendingList=responseOTP
           // alert(responseOTP.pendingActionList);
           if(this.pendingList.list !=null && this.pendingList.list !=''){
            localStorage.setItem('iconValue',this.pendingList.list);
            this.router.navigate(['/tocahpdrchd']);
           }else{
          localStorage.setItem("pendiblistparent", JSON.stringify(this.pendingList.pendingActionList));
          localStorage.setItem("pendiblistchild", JSON.stringify(this.pendingList.pendingActionSubList));
          this.router.navigate(['/pendingstages']);         
           }

          }
        },
          error:error => {
            console.log(error);
            this.errorMessage = "Generated OTP is not valid";
          }})

    }
  }
  redirectHome() {
    this.router.navigate(['']);
  }
  reset() {

  }
  spaceNotAllowed(onlySpace: any) {
    return this.customValidator.spaceNotAllowed(onlySpace);
  }
   
  onlyNumberAllowed(onlyNumber: any) {
    return this.customValidator.onlyNumberAllowed(onlyNumber);
  }
  showFields() {
    
    if (this.iconValue == 'payYrTax') {
      this.entrypageheader = "Online Application(Road Tax)";
      this.chasis_no = false;
    } else if (this.iconValue == 'TO') {
      this.entrypageheader = "Transfer of Ownership";
    } else if (this.iconValue == 'CA') {
      this.entrypageheader = "Change of Address";
    } else if (this.iconValue == 'HPA') {
      this.entrypageheader = "Hypothecation Addition";
    } else if (this.iconValue == 'HPC') {
      this.entrypageheader = "Hypothecation Continuation";
    } else if (this.iconValue == 'HPT') {
      this.entrypageheader = "Hypothecation Termination";
    } else if (this.iconValue == 'DPC') {
      this.entrypageheader = "Duplicate RC";
    } else if (this.iconValue == 'frrAfbf') {
      this.entrypageheader = "Fitness Fee";
    } else if (this.iconValue == 'adonvhl') {
      this.entrypageheader = "Advertisement on Vehicle";
    } else if (this.iconValue == 'pbff') {
      this.entrypageheader = "Pay Balance Fees Fine";
    } else if (this.iconValue == 'anoc') {
      this.entrypageheader = "Application for No Objection Certificate";
    } else if (this.iconValue == 'rcp') {
      this.entrypageheader = "RC Particulars";
    } else if (this.iconValue == 'dfc') {
      this.entrypageheader = "Duplicate Fitness Certificate";
    } else if (this.iconValue == 'rr') {
      this.entrypageheader = "Renewal of Registration";
    } else if (this.iconValue == 'cov') {
      this.entrypageheader = "Conversion Of Vehicle";
    } else if (this.iconValue == 'raov') {
      this.entrypageheader = "Re-Assignment Of Vehicle";
      this.chasis_no = false;
    } else if (this.iconValue == 'aov') {
      this.entrypageheader = "Alteration Of Vehicle";
    } else if (this.iconValue == 'envtax') {
      this.entrypageheader = "Enviromental Tax/Green Tax/Passanger Tax/Goods Tax";
      this.chasis_no = false;
    } else if (this.iconValue == 'mobupdt') {
      this.entrypageheader = "Mobile Number Update";
    } else if (this.iconValue == 'withdrowapp') {
      this.entrypageheader = "Withdraw Your Application";
    } else if (this.iconValue == 'aplforslfbacklog') {
      this.entrypageheader = "Application for Self Backlog"
    }

  }
}


export class MobileOtpRegnObject {
  mobile_no: any;
 otp: number;
  regn_no: any;
}

