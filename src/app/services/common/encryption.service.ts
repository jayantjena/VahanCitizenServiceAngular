import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  plainText:string;  
  encryptText: string;  
  encPassword: string='aaabbbccc!!';  
  decPassword:string;  
  conversionEncryptOutput: string;  
  conversionDecryptOutput:string;  
  constructor() { }

  convertText(conversion:String) {  
   // if (conversion=="encrypt") {  
     this.conversionEncryptOutput = CryptoJS.AES.encrypt(conversion, this.encPassword.toString());  
     return this.conversionEncryptOutput;
     // this.conversionEncryptOutput=this.conversionEncryptOutput.toString().replace('/','@');
   // }  
   // else {  
    //  this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText, this.decPassword).toString(CryptoJS.enc.Utf8);  
     
 // }  
}  
}
