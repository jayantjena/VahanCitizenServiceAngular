import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqServiceService {

  constructor(private _http: HttpClient) { }
  _url = environment.api_url;

  getfaqdetails() {
    return this._http.get(this._url + '/getfaqdetails/');
  }

  getfaqcode(servi_code: number) {
    return this._http.get(this._url + '/getfaqcode/' + servi_code)
  }
}
