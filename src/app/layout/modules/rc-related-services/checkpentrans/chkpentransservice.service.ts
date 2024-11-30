import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from  'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChkpentransserviceService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http:HttpClient, private httpClient:HttpClient) { }
 
    showDetailByTrans_No(trasaction_no: String) {
      return this.http.get(environment.api_url+'/showDetailByTrans_No/'+trasaction_no);
     
      }
      showDetailByReg_No(reg_No: String,chasi_No:String) {
        return this.http.get(environment.api_url+'/showDetailByReg_No/'+reg_No+'/'+chasi_No);
       
        }
        getTaxBreakUp(purCD:number,transactionID:String,offCD:number,stateCD:String,regnNo:String) {
          return this.http.get(environment.api_url+'/getTaxBreakUp/'+purCD+'/'+transactionID+'/'+offCD+'/'+stateCD+'/'+regnNo);
         
          }
          checkToBank(checkToBank :any){
            return this.httpClient.post(environment.api_url+'/checkToBank', checkToBank, { headers: this.headers });
            
            }

}
