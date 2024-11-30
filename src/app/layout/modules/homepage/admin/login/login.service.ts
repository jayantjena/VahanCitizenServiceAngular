import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //calling the server to generate token
  generateToken(credentials: any) {
    return this.http.post(environment.api_url + '/getlogindetails', credentials);
  }

  loginUser(token) {
    localStorage.setItem('token', token);
    return true;
  }
  isLogedIn() {
    let token = localStorage.getItem('token');

    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    localStorage.removeItem('token');
    return true;
  }

  generateOTPforForgotPassword(mobile_No: number) {
    return this.http.get(environment.api_url + "/checkcondtion/" + mobile_No)
  }
  forgotpassword(mobile_no: any, otp: number, password: String, confirmpass: String) {
    return this.http.get(environment.api_url + "/forgotpassword/" + mobile_no + "/" + otp + "/" + password + "/" + confirmpass)
  }

  generateOTP(mobile_No: number) {
    return this.http.get(environment.api_url + "/otpgenrate/" + mobile_No)
  }


}
