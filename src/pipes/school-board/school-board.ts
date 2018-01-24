import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'schoolBoard',
})
export class SchoolBoardPipe implements PipeTransform {
 
  transform(items: any) {
    if (!items) return ['all'];
    var hasMultiBoard = [];
    var schBoard = { '0': 'ssc', '1': 'cbse', '2': 'icse', '3': 'ib', '4': 'isc', '5': 'igcse' };
    for (var prop in schBoard) {
      if (schBoard.hasOwnProperty(prop)) {
        if (items[schBoard[prop]] === 'Y') {
          hasMultiBoard.push(schBoard[prop]);
        }
      }
    }
    return hasMultiBoard;
  }
}

