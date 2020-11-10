import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NewPostComponent } from '../new-post/new-post.component';
import { MainService } from '../services/main.service';
import { AuthService } from '../services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

export interface main {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface comments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
const r: main[] =[];
@Component({
  selector: 'app-main-page',  
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = [
    'id',
    'title',
    'body',
    'options'
  ];
 // records = new MatTableDataSource<main>(this.main);
  length:number;
  dataSource: any;
  records: main[];
  isReady:boolean;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoading = true;
  isLoadingResults = true;
  constructor(
    public dialog: MatDialog,
    private MainService: MainService,
    public Auth: AuthService,
  ) {setTimeout(()=> {
    this.isReady = true;}, 600);}

  ngOnInit() {
    this.getRecords();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  getRecords(): void {
    this.MainService.getRecords().subscribe(results=>{
      this.isLoading = false;
      this.records = results;
      this.dataSource = new MatTableDataSource(this.records);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
    );
  }
  
  addRecords() : void {
    const dialogRef = this.dialog.open(NewPostComponent, {
      disableClose: true, 
      data: {
        userId: this.userId,
        title: this.title,
        body: this.body,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.MainService.addRecord(result.main).subscribe((result2) => {
       this.isLoading = false;
       this.records.push(result2),
       this.dataSource = new MatTableDataSource(this.records);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       console.log(this.records);
       });
      }
    });
  }

  changeRecord(item): void{
    const dialogRef = this.dialog.open(NewPostComponent, {
      data: {
        item,
        userId: this.userId,
        title: this.title,
        body: this.body,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
         this.MainService.updateRecord(result.main).subscribe(data => { 
          this.isLoading = false;
           const newvalue = data ? this.records.findIndex(h => h.id === data.id) : -1;
          if (newvalue > -1) {
            this.records[newvalue] = data;
          }
          this.dataSource = new MatTableDataSource(this.records);
          this.dataSource.sort = this.sort;
        });
    
     console.log('one', this.records);
    }
    });
    
  }

  removeRecord(Record:main): void { 
   //this.dataSource = this.records.filter(h => h !== Record);
   this.isLoading = false;
   this.dataSource.data.splice(this.records.indexOf(Record), 1);
   this.dataSource = new MatTableDataSource(this.dataSource.data);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
   this.MainService.deleteRecord(Record).subscribe();
    console.log(this.records);
  }
  onNoClick(): void {}

}
