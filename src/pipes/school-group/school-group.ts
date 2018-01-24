import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'schoolGroup',
})
  
export class SchoolGroupPipe implements PipeTransform {

  transform(items: any[], param: string) {
    if (!items) return [];
    if (!param || param == 'all') return items;
    param = param.toLowerCase();
    return items.filter(it => {
      return (it[param] === 'Y' ? true : false);
    });
  }
  
}
