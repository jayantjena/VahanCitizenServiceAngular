import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AadharServiceService {
  constructor(private _http: HttpClient) { }

  generateAadharOTP(aadharNo: any) {
    return this._http.get(environment.api_url + '/getaadharotp/' + aadharNo);
  }

  vaidateaadhar(aadharObj: any) {
    return this._http.post(environment.api_url + '/vaidateaadhar', aadharObj);
  }

}
