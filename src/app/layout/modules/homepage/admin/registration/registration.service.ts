import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http: HttpClient) { }

  generateOTPforRegistration(mobile_no: any) {
    return this._http.get(environment.api_url + '/otpgenrate/' + mobile_no)
  }
  validateGenerateOTP(otp:number, password:string, confirmpassword:string, mobile_no:any) {
    return this._http.get(environment.api_url + "/otpvalidation/" + otp +"/"+ password +"/"+ confirmpassword +"/"+ mobile_no)
  }
  registration(form: any) {
    return this._http.post(environment.api_url + '/registration', form.value);
  }
}
