import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PgiserviceService {

  constructor( private http:HttpClient) { }
 
  getDataForPrintReciept(encData: String) {
    return this.http.get(environment.api_url+'/afterPayment/'+encData);
    
    }
}
