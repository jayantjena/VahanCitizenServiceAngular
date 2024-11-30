import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ValidateOtp } from '../change-address/ValidatOtp';

@Injectable({
  providedIn: 'root'
})
export class ServiceEntryService {
   regn_no:String;
   public objMobOtpRegn:any;
  constructor(private http: HttpClient) { }

  validateRegnChasi(regn_no,chsNo, state_cd, pur_cd) {
    debugger
    return this.http.get(environment.api_url + '/Validateregandchasino/' + regn_no + "/" +chsNo+"/"+ state_cd + "/" + pur_cd )
  }

  showAllServices(objMobOtpRegn:ValidateOtp) {
   
    return this.http.post(environment.api_url + '/validateOtpforchangeofAddress', objMobOtpRegn);
  }

  getfeepanel(reg_no:any,pur_cd:any,state_cd:any){
return this.http.get(environment.api_url +'/getfeepanel/'+ reg_no +"/"+ pur_cd+"/"+state_cd);
  }
}
