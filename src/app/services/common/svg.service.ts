
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SvgService {
    filePath = "assets/svg-data.json";
    constructor(private http: HttpClient) {
    }

    getSvg(): Observable<any> {
        const httpOptions = { headers: new HttpHeaders().set('requestType',"local") };
        return this.http.get(this.filePath,httpOptions)
    }
}


