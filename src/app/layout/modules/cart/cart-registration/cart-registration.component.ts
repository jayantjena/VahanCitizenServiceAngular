import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomvalidationService } from 'src/app/services/common/customvalidation.service';
import { AppResponseTypeEnum } from 'src/app/shared/Enum/AppResponseType.enum';
import { AppRequestHeaderModel } from 'src/app/shared/models/appRequestHeader.model';
import { AppResponse } from 'src/app/shared/models/appResponse';
import { RegistrationService } from '../../homepage/admin/registration/registration.service';
import { LeftsidebarserviceService } from '../../homepage/left-sidebar/leftsidebarservice.service';
import { UserManualComponent } from '../../homepage/user-manual/user-manual.component';

@Component({
  selector: 'app-cart-registration',
  templateUrl: './cart-registration.component.html',
  styleUrls: ['./cart-registration.component.css']
})
export class CartRegistrationComponent {
  regnForm: FormGroup;
  submitted = false;
  generateOTPforRegn = false;
  stateListFilter: any;
  stateList: any;
  gen_OTP: any;
  mobile_no: any;
  errorMessage: any;
  saveform: any;

 @ViewChild('regnOtpDialog', {static:true}) regnOtpDialog:TemplateRef<any>;
 setNavBackground() {
  let styles = {
    'background': '#037188',
    'background-image': 'url("../../assets/img/homepage-images/flag-mark.png"), linear-gradient(180deg, #79b3f1, #037188)',
    'background-repeat': 'no-repeat',
    'background-position': 'right',
    'background-size': 'contain',
  };
  return styles;
}


constructor(private fb: FormBuilder, 
  private registrationService: RegistrationService, 
  private leftsidebarserviceService: LeftsidebarserviceService, 
  private router: Router, public dialog: MatDialog, 
  private customValidator: CustomvalidationService) { }
// , Validators.pattern('^(\+\d{1,3}[- ]?)?\d{10}$')
ngOnInit() {
  this.regnForm = this.fb.group({
    fullname: ['', Validators.required],
    email_id: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    user_password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
    confirmPassword: ['', [Validators.required]],
    mobile_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    landline_no: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    add1: ['', Validators.required],
    add2: ['', Validators.required],
    city: ['', Validators.required],
    state_cd: ['', Validators.required],
    pincode: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
    otp: ['', Validators.required]
  }, {
    validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
  })
  this.getAllStatesList();
  this.generateOTPforRegn = false;
}
get rgfrm() {
  return this.regnForm.controls;
}
signInPage(){
  this.router.navigate(['/portal-login']);
}
submitRegn(form: any) {
  this.submitted = true;
  if (form.value.otp != "" && form.value.otp != null) {
    this.validateOTP(form);
  } 
  if (this.regnForm.valid) {
    this.registrationService.registration(form).subscribe(
      {next:(saveForm: any) => {
      this.saveform = saveForm;
    },
      error:error => {
        console.log(error);
        this.errorMessage = "Registartion form does not save";
      }})
  }
}
validateOTP(form) {
  this.registrationService.validateGenerateOTP(form.value.otp, form.value.user_password, form.value.confirmPassword, form.value.mobile_no)
    .subscribe(
      {next:(responseOTP: any) => {
      this.errorMessage = responseOTP;
    },
     error: error => {
        console.log(error);
        this.errorMessage = "Generated OTP is valid";
      }})
}
generateOTPforRegistration(form: any) {
  this.submitted = true;
  if (form.value.fullname != "" && form.value.fullname != null && 
  form.value.email_id != "" && form.value.email_id != null &&
  form.value.user_password != "" && form.value.user_password != null &&
  form.value.confirmPassword != "" && form.value.confirmPassword != null &&
  form.value.mobile_no != "" && form.value.mobile_no != null &&
  form.value.landline_no != "" && form.value.landline_no != null &&
  form.value.add1 != "" && form.value.add1 != null &&
  form.value.city != "" && form.value.city != null &&
  form.value.add2 != "" && form.value.add2 != null &&
  form.value.state_cd != "" && form.value.state_cd != null &&
  form.value.pincode != "" && form.value.pincode != null ) {
    this.registrationService.generateOTPforRegistration(form.value.mobile_no).subscribe({next:(response: any) => {
      this.gen_OTP = response;
      this.dialog.open(this.regnOtpDialog)
      this.generateOTPforRegn = true;
    },
      error:error => {
        console.log(error);
      }})
 }
}


getAllStatesList() { 
  const headerData = [];
  const filterParameter = {
    TranName: 'getAllStateList'
  };
  headerData.push(new AppRequestHeaderModel('filterParameter', filterParameter));
  this.leftsidebarserviceService.getAllStatesList(headerData, '/getAllStateList', false, true)
  .subscribe({next:(resp: AppResponse) => {
    if (resp.responseType === AppResponseTypeEnum.Success) {
      this.stateList = resp.response? resp.response: [];
      console.log(this.stateList);
      this.stateListFilter=this.stateList;
      console.log(this.stateListFilter);
    } else if (resp.responseType === AppResponseTypeEnum.Information) {
      
    } else if (resp.responseType === AppResponseTypeEnum.Error) {
      
    }
  },
 error:(err) => console.error("API exception")}
);
}


// getAllStatesList() {
//   this.leftsidebarserviceService.getAllStatesList().subscribe(
//     {next:(states: any[]) => {
//     this.stateList = states;
//     this.stateListFilter = this.stateList;
//     console.log(this.stateListFilter);
//   },
//     error:err => {
//       console.log(err);
//     }}
//   );
// }

public openusermanualdlg() {
  this.dialog.open(UserManualComponent)
}
redirectHome() {
  this.router.navigate(['']);
}
reset() {
  this.regnForm.reset();
}
spaceNotAllowed(onlySpace: any) {
  return this.customValidator.spaceNotAllowed(onlySpace);
}
onlyNumberAllowed(onlyNumber: any) {
  return this.customValidator.onlyNumberAllowed(onlyNumber);
}


}
