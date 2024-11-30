import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CaptchaService } from 'src/app/services/common/captcha.service';
import { LoginService } from 'src/app/services/common/login.service';
import { UserManualComponent } from '../../homepage/user-manual/user-manual.component';

@Component({
  selector: 'app-cart-login',
  templateUrl: './cart-login.component.html',
  styleUrls: ['./cart-login.component.css']
})
export class CartLoginComponent {
  mobile_No: String = "97970";
  mobileListData: any;
  gen_OTP: number;
  password: String;
  confirmPass: String;
  generatedCpatcha: String;
  errorMsg: any;
  submitted = false;
  reGenerateOTPBtn = false;
  fillcaptcha: string = "";
  invalidcaptcha = false;
  image: any;
  resForgotData: any;
  succMobChng = false;
  forgotOTPForm: NgForm;
  @ViewChild('passChngSuccDialog', { static: true }) passChngSuccDialog: TemplateRef<any>;
  @ViewChild('forgotOtpDialog', { static: true }) forgotOtpDialog: TemplateRef<any>;
  isForgotModal: boolean=false;
  isloginModal: boolean = true;
  loginForm: FormGroup;
  constructor(
    private cpatchService: CaptchaService,
    private fb: FormBuilder,
    private loginService: LoginService,
    public dialog: MatDialog,
    private router: Router ) {
      // this.translate.setDefaultLang('en');
      // this.translate.use(localStorage.getItem('lang') || 'en')
     }
     ngOnInit(): void {
      this.loginForm = this.fb.group({
        uname: ['', Validators.required],
        pwdrd: ['', Validators.required]
      })
      this.generatedCpatcha = this.cpatchService.generateCaptcha();
    }
    get loginf() {
      return this.loginForm.controls;
    }
    credentials =
      {
        user_name: "",
        password: "",
      }
  
    redirectHome() {
      this.router.navigate(['']);
    }

     // only number allowed method start
  onlyNumberAllowed(event): boolean {
    const charCode = (event.which) ? event.which : event.keycode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  // only number allowed method start

  // space not allowed method start
  spaceNotAllowed(event): boolean {
    const charCode = (event.which) ? event.which : event.keycode;
    if (charCode < 48) {
      return false;
    }
    return true;
  }
  // space not allowed method end

  onSubmit() {
    if ((this.credentials.user_name != "" && this.credentials.password != "") && (this.credentials.user_name != null && this.credentials.password != null)
      && (this.fillcaptcha != "" && this.fillcaptcha != null)) {
      if ((this.fillcaptcha == this.generatedCpatcha)) {
        this.invalidcaptcha = false;
        if (this.credentials.user_name != '' && this.credentials.password != '') {
          this.loginService.generateToken(this.credentials).subscribe(
            {next:
            (response: any) => {
              console.log(response);
              this.loginService.loginUser(response.user_name);
              this.router.navigate(['/user-info']);
            },
           error: error => {
              console.log(error);
            }})
        }
      } else {
        // alert(this.fillcaptcha+'    '+this.generatedCpatcha);
        this.invalidcaptcha = true;
      }
    }
  }
  reset() {
    //this.forgotOTPForm.value.reset();
  }
  refreshCaptha() {
    this.generatedCpatcha = this.cpatchService.generateCaptcha();
  }
  // mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";

  generateOTPforForgotPassword(mobileNo: any) {
    this.submitted = true;
    if (this.submitted) {
      this.loginService.generateOTPforForgotPassword(mobileNo).subscribe(
        {next:(mobileData) => {
        this.mobileListData = mobileData;
        // console.log(" "+this.mobileListData);
        if (this.mobileListData != "") {
          this.dialog.open(this.forgotOtpDialog)
          this.reGenerateOTPBtn = true;
          sessionStorage.setItem("mobileNo", mobileNo);
        }},
      error: err => {
        this.errorMsg = err;
        this.reset();
      }});
    }
  }
  showLogin(){
    this.isForgotModal = false;
    this.isloginModal = true;
  }
  showForgotPassword(){
    this.isForgotModal = true;
    this.isloginModal = false;
  }
  forgotpassword(form: any) {
    this.submitted = true;
    let mobile_No = sessionStorage.getItem("mobileNo");

    this.loginService.forgotpassword(mobile_No, form.value.genOTP, form.value.pswd, form.value.cnfrmpass).subscribe(
      {next:(responce: any) => {
      this.resForgotData = responce;
      console.log("successfull " + this.resForgotData);
      if (this.resForgotData != "" && this.resForgotData != null
        && this.resForgotData == "User password successfully changed"
        && this.password === this.confirmPass) {
        this.succMobChng = true;
        this.successDialogOpen();
      }
    },
      error:errorForgot => {
        console.log(errorForgot);
      }})
  }
  successDialogOpen() {
    this.dialog.open(this.passChngSuccDialog);
  }
  succDialogClose() {
    window.location.reload();
  }
  openusermanualdlg() {
    this.dialog.open(UserManualComponent)
  }
  regnPage(){
    this.router.navigate(['vs/cart/cart-registration']);
  }

}
