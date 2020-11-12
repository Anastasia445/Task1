import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ChartsTableDataSource, ChartsTableItem } from './charts-table-datasource';

@Component({
  selector: 'app-charts-table',
  templateUrl: './charts-table.component.html',
  styleUrls: ['./charts-table.component.css']
})
export class ChartsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ChartsTableItem>;
  dataSource: ChartsTableDataSource;
//@ViewChild(MatTable) table: MatTable;
 dataLength: number;
 
  displayedColumns = ['id', 'fname', 'lname','age','count','sum'
];

  ngOnInit() {
    this.dataSource = new ChartsTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.paginator.pageIndex * this.paginator.pageSize,
    this.paginator.pageSize,
    this.sort.active,
    this.sort.direction
  }
}
