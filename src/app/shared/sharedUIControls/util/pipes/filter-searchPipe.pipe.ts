//Created By : Bhupendra Singh
//Purpose : This pipe is used to search data for particular column

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'FilterSearchPipe'
})
export class FilterSearchPipe implements PipeTransform {
    transform(items: any[], value: string, label:string): any[] {
        if (!items) return [];
        if (!value) return  items;
        if (value == '' || value == null) return [];
        let columnArray=label.split(',');
       // return items.filter(e => e[label].toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1 );
        return items.filter(item => {
          for (let k of columnArray) {
            // if key (e.g id) matches the search term
          if(item[k]!=null && item[k]!=undefined){
            if (item[k].toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1) {
              return true; 
            } 
          }
          
          }
          return false;
      });
      }
}