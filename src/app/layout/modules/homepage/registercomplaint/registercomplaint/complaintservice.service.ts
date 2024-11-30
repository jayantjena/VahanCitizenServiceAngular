import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintserviceService {
       message:any;
  constructor(private http:HttpClient) { }
  
  onUpload(form:any,selectedFile:any) {
    console.log(selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('dto',form);
    uploadImageData.append('imageFile', selectedFile, selectedFile.name);
    return this.http.post(environment.api_url + '/upload', uploadImageData);
  }
  getImage() {
    let imageName;
    return this.http.get( environment.api_url +'/get/'+ imageName);
  }

}
