import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'MarksPipe'
})
export class MarksPipe implements PipeTransform {

  transform(value: any, args?: any): any {
   console.log(args);
   var arr = value.split(".");
   var result="";
    if(arr.length > 1){
    if(arr[1].split("").length == 1){
      result= arr[0] + "." + arr[1] + "0";
    }
    else if(arr[1].split("").length >= 2){
      result= arr[0] + "." + arr[1];
    }
    }
    else
      result= arr[0] + "." + "00";
    
    if(result.indexOf('%')==-1){
      result=result + '%';
    }
    return result;
  }

}
