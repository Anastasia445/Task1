import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ChartsTableItem {
  id: number;
  fname: string;
  lname: string;
  age: number,
  count: number;
  sum: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ChartsTableItem[] = [
  {id: 1, fname: 'Старова', lname:'Виктория', age: 26,count: 8,sum: 254},
  {id: 2, fname: 'Малик', lname:'Пётр', age: 45,count: 15,sum: 632},
  {id: 3, fname: 'Пир', lname:'Алексей', age: 25,count: 21,sum: 344},
  {id: 4, fname: 'Квик', lname:'Анатолий', age: 54,count: 15,sum: 354},
  {id: 5, fname: 'Гриб', lname:'Максим', age: 29,count: 14,sum: 556},
  {id: 6, fname: 'Луйко', lname:'Алина', age: 25,count: 26,sum: 459},
  {id: 7, fname: 'Пестро', lname:'Михаил', age: 36,count: 43,sum: 289},
  {id: 8, fname: 'Клюк', lname:'Пётр', age: 28,count: 48,sum: 227},
  {id: 9, fname: 'Головач', lname:'Виктория', age: 36,count: 24,sum: 298},
  {id: 10, fname: 'Шедякова', lname:'Карина', age: 48,count: 31,sum: 289},
  {id: 11, fname: 'Лапин', lname:'Николай', age: 24,count: 24,sum: 254},
  {id: 12, fname: 'Молич', lname:'Екатерина', age: 58,count: 36,sum: 584},
  {id: 13, fname: 'Ступкина', lname:'Марина', age: 29,count: 19,sum: 458},
  {id: 14, fname: 'Сатырёва', lname:'Алина', age: 48,count: 16,sum: 285},
  {id: 15, fname: 'Семченко', lname:'Анатолий', age: 27,count: 12,sum: 298},
  {id: 16, fname: 'Мисюк', lname:'сергей', age: 26,count: 7,sum: 254},
  {id: 17, fname: 'Тимашков', lname:'Марк', age: 25,count: 23,sum: 254},
  {id: 18, fname: 'Сонская', lname:'Ольга', age: 37,count: 25,sum: 254},
  {id: 19, fname: 'Пир', lname:'Соня', age: 59,count: 36,sum: 254},
  {id: 20, fname: 'Раким', lname:'Станислав', age: 54,count: 38,sum: 254},
];

export class ChartsTableDataSource extends DataSource<ChartsTableItem> {
  paginator: MatPaginator;
 sort: MatSort;
  data: ChartsTableItem[] = EXAMPLE_DATA;
  filter: string;
 

  constructor() {
    super();
  }

  connect(): Observable<ChartsTableItem[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data],));
    }));
  }

 
  disconnect() {}

  private getPagedData(data: ChartsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  
  private getSortedData(data: ChartsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'fname': return compare(a.fname, b.fname, isAsc);
        case 'lname': return compare(+a.lname, +b.lname, isAsc);
        case 'age': return compare(a.age, b.age, isAsc);
        case 'count': return compare(+a.count, +b.count, isAsc);
        case 'sum': return compare(a.sum, b.sum, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
