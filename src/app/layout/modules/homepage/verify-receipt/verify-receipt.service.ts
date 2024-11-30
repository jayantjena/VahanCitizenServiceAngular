import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyReceiptService {
   
  public isHomepage = new Subject();
  constructor(private http:HttpClient) {}
    
    getRegnRcpt(reciept_No: String,regn_No:String) {
      return this.http.get(environment.api_url+'/verifyDetails/'+reciept_No+'/'+ regn_No);
      }
}
