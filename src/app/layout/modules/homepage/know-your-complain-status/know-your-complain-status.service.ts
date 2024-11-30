import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KnowYourComplainStatusService {
  constructor(private _http:HttpClient) { }
   
  
  knowyourComplaintStatus(credential:any){
     return this._http.post(environment.api_url+"/knowyourComplaintStatus", credential);
  }
}
