import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthlyprogress'
})
export class MonthlyprogressPipe implements PipeTransform {

  transform(value: any, year?: any, month?: any): any {
    let filteredArr = value;
    if(year)
    filteredArr = value.filter(v => v.year == year);
    if(month)
    filteredArr = value.filter(v => v.month == month);    
    return filteredArr;
  }

}
