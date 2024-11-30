import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
 
 import { LoginService } from './login.service';
import { UserManualComponent } from '../../user-manual/user-manual.component';
import { CaptchaService } from 'src/app/services/common/captcha.service';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  // bharatsrkr = 'भारत सरकार';
  // govtInd = 'GOVERNMENT OF INDIA';
  // marquee = 'to know Procedure and checklist for availing any Service on Vahan Citizen Portal. If unable to View/Login, clear your browser history and try again';
  // usermanualImage = 'assets/img/homepage-images/User_Manual.png'
  // sadakparivahanhindi = 'सड़क परिवहन और राज मार्ग मंत्रालय';
  // roadtransport = 'MINISTRY OF ROAD TRANSPORT & HIGHWAYS';
  mobile_No: String = "";
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
// abc(){
//   alert('sdfdfdafdaf');
// }
  constructor(
    private cpatchService: CaptchaService,
    private fb: FormBuilder,
    private loginService: LoginService,
    public dialog: MatDialog,
    private router: Router ) {
      // this.translate.setDefaultLang('en');
      // this.translate.use(localStorage.getItem('lang') || 'en')
     }
  loginForm: FormGroup;

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
    this.router.navigate(['/user-registration']);
  }

}
