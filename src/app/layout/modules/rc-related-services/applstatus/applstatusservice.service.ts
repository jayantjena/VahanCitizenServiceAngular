import { environment} from  'src/environments/environment';
//import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplstatusserviceService {

  constructor(private http: HttpClient) { }

  getApplNo(applNo: String) {
    return this.http.get(environment.api_url + '/searchAdvanceVehicleData/' + applNo);
  }
  getOldStatus(applNo: String,regn_no:String,off_cd:number,pur_cd:number,vh_class:number) {
    return this.http.get(environment.api_url + '/getOldStatus/' + applNo+'/'+regn_no+'/'+off_cd+'/'+pur_cd+'/'+vh_class);
  }
 
}
