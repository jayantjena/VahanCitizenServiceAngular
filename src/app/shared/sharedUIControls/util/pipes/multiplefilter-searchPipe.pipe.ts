import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'MultiFilterSearchPipe'
})
 
export class MultiFilterSearchPipe implements PipeTransform {
          
  transform(items: any[], value: string,label:any[]){

   if (!items) return [];
   //if (!value) return  items;
    //if (value == '' || value == null) return [];
    if (items && items.length){ 
        return items.filter((item) =>{ 
            for( let i=0; i< label.length; i++){
               // let x = label[i].searchvalue;
                //if(label[i].searchvalue){
                // if (typeof x === 'string'){
                //     label[i].searchvalue = label[i].searchvalue;
                // }
                // else{
                //     label[i].searchvalue = +label[i].searchvalue;  
                // }
            if (label[i].searchvalue && item[label[i].columnFieldName] && item[label[i].columnFieldName].toString().toLowerCase().indexOf(label[i].searchvalue.toString().toLowerCase()) === -1){
                return false;
            } }
            return true; 
        
        })    
    }
    else{
        return items;
    }
}}