import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initialCapitalize'
})
export class InitialCapitalizePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // first letter capital
    // if (!value) return value; // Return empty if the input is empty
    // return value.replace(/\b[a-z]/g, char => char.toUpperCase()); // Capitalize first letter of each word
  }

}
