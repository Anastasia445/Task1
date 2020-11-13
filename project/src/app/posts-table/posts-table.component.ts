import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { main } from '../main-page/main-page.component';
import { MainService } from '../services/main.service';
import { AuthService } from '../services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = [
    'id',
    'title',
    'body'
  ];

  length:number;
  dataSource: any;
  records: main[];
  isReady:boolean;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private MainService: MainService,
   /* public Auth: AuthService,*/
  ) {}

  ngOnInit() {
    this.getRecords();
  }
  
  getRecords(): void {
    this.MainService.getRecords10().subscribe(results=>{
      this.records = results;
      this.dataSource = new MatTableDataSource(this.records);
      this.dataSource.sort = this.sort;
      console.log(this.records);
  }
    );
  }
}
