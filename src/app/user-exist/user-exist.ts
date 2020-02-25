import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: any, searchableList: any) {
        if (input) {
            input = input.toLowerCase();


            if (value != null) {
                return value.filter(function (el: any) {
                    var isTrue = false;
                    for (var k in searchableList) {

                        var sh = "" + el[searchableList[k]];

                        if (sh.toLowerCase().indexOf(input) > -1) {
                            isTrue = true;
                        }
                        if (isTrue) {
                            return el
                        }
                    }
                })
            }
        }
        return value;
    }
}