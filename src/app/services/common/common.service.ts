import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NextStepDto } from './NextStepDto';
import { ChangeOfAddressDto } from 'src/app/layout/modules/rc-related-services/ChangeOfAddressDto';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) {

  }
  nextstepList: NextStepDto[];
  getAllStateList() {
    return this.http.get(environment.api_url + '/getAllStateNameList');
  }
  onChangeService(state_code: String) {
    // state_code=this.encryptionService.convertText(state_code);
    return this.http.get(environment.api_url + '/getServiceList/' + state_code);
  }
  getOfficeListByStateCode(state_code: String) {
    // state_code=this.encryptionService.convertText(state_code);
    return this.http.get(environment.api_url + '/getOfficeListByStateCode/' + state_code);
  }
  saveasdraftchangeofaddress(changeofaddressdto: ChangeOfAddressDto) {
    return this.http.post(environment.api_url + '/saveasdraftchangeofaddress', changeofaddressdto);
  }

  // basicservicecontroller/beforePayment
  beforePayment(changeofaddressdto: ChangeOfAddressDto){
    return this.http.post(environment.api_url +'/beforePayment', changeofaddressdto);
  }

  getnextStep(sr_no: number) {
    this.nextstepList = JSON.parse(localStorage.getItem('stepList'));
    //return Object.values(this.nextstepList).filter(x=>x.flow_srno===sr_no);
    return this.nextstepList.find(x => x.flow_srno == sr_no + 1);
  }
}
