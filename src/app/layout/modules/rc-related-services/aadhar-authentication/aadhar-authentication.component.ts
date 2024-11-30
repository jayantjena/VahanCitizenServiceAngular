import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AadhaarDto } from './AadhaarDto';
import { AadharServiceService } from './aadhar-service.service';
import { CustomvalidationService } from 'src/app/services/common/customvalidation.service';

@Component({
  selector: 'app-aadhar-authentication',
  templateUrl: './aadhar-authentication.component.html',
  styleUrls: ['./aadhar-authentication.component.css']
})
export class AadharAuthenticationComponent implements OnInit {
  aadhaar_no: string;
  showAadharPanel: boolean = false;
  hideAadharPanel = true;
  aadharNoWithVirIDAuth: string = "";
  getOTP_btn_enble: boolean = false;
  checkedCheckBox = false;
  submitted = false;
  aadharAuth: NgForm;
  OTPform: NgForm;
  mobile_OTP: any;
  success_OTP: any;
  succ_OTP_msg: string = "OTP successfully sent on your mobile no.";
  public aadhaardto: AadhaarDto;
  aadhaarData: any;

  @ViewChild('aadhaarOTPDialog', { static: true }) aadhaarOTPDialog: TemplateRef<any>;

  constructor(private customValidator: CustomvalidationService, private router:Router,
    public dialog: MatDialog, private aadharService: AadharServiceService) { }

  ngOnInit(): void {

  }

  getAadharPanel() {
    this.showAadharPanel = true;
    this.hideAadharPanel = false;
    this.aadharNoWithVirIDAuth = "Aadhar Number Authenticate";
  }
  getVirtualAadharPanel() {
    this.showAadharPanel = true;
    this.hideAadharPanel = false;
    this.aadharNoWithVirIDAuth = "Virtual Aadhar ID Authenticate";
  }

  checkAadhaarDclrtion(event: MatCheckboxChange) {
    this.checkedCheckBox = true;
    if (event.checked && this.checkedCheckBox) {
      this.getOTP_btn_enble = true;
    } else {
      this.getOTP_btn_enble = false;
    }
  }

  getAadhaarOTP(aadhar: any) {
    this.submitted = true
    if (this.submitted && this.aadhaar_no != null && this.aadhaar_no != "") {
      this.aadharService.generateAadharOTP(aadhar.control.value).subscribe({next:(resAadhar: any) => {
        this.success_OTP = resAadhar;
        if (this.success_OTP != "" && this.success_OTP != null && this.success_OTP == this.succ_OTP_msg) {
          this.dialog.open(this.aadhaarOTPDialog);
        }
      },
        error:err => {
          console.log(err);
        }})
    }
  }

  vaidateaadhar(mobileAadhaarotp: any) {
    this.submitted = true;
    let regn_no = localStorage.getItem("regn_no");
    let state_cd = localStorage.getItem("selectedgroupState");
    let aadharNo = this.aadhaar_no;
    let aadharotp = mobileAadhaarotp.control.value;
    this.aadhaardto = new AadhaarDto();
    this.aadhaardto.regn_no = regn_no;
    this.aadhaardto.state_cd = state_cd;
    this.aadhaardto.aadharNo = aadharNo;
    this.aadhaardto.aadharotp = aadharotp;
    if (this.submitted) {
      this.aadharService.vaidateaadhar(this.aadhaardto).subscribe((respAadhaarData: any) => {
        this.aadhaarData = respAadhaarData;
        if (this.aadhaarData != null && this.aadhaarData != '') {
          //this.errorMessage = responseOTP;
          localStorage.setItem('iconValue', this.aadhaarData);
          this.router.navigate(['/tocahpdrchd']);

        }

      })
    }
  }

  spaceNotAllowed(onlySpace: any) {
    return this.customValidator.spaceNotAllowed(onlySpace);
  }
  onlyNumberAllowed(onlyNumber: any) {
    return this.customValidator.onlyNumberAllowed(onlyNumber);
  }
}
