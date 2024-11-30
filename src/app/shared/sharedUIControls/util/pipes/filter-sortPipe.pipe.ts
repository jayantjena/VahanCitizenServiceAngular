//Created By : Bhupendra Singh
//Purpose : This pipe is used to sort data for particular column

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'FilterSortPipe'
})
export class FilterSortPipe implements PipeTransform {
  transform(items: any[], path: string[], order: number): any[] {
    console.log(path);
    // Check if is not null
    if (!items || !path || !order) return items;

    return items.sort((a: any, b: any) => {
      // We go for each property followed by path
      path.forEach(property => {
        a = a[property];
        b = b[property];
      })

      // Order * (-1): We change our order
      return a > b ? order : order * (- 1);
    })
  }
}