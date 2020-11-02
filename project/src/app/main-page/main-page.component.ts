import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NewPostComponent } from '../new-post/new-post.component';
import { MainService } from '../services/main.service';
import { AuthService } from '../services/auth.service';
import { MatPaginator } from '@angular/material/paginator';

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
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private MainService: MainService,
    public Auth: AuthService,
  ) {}

  ngOnInit() {
    this.getRecords();
  }
  
  getRecords(): void {
    this.MainService.getRecords().subscribe(results=>{
      this.records = results;
      this.dataSource = new MatTableDataSource(this.records);
      this.dataSource.paginator = this.paginator;
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
       this.records.push(result2),
       
       this.dataSource = new MatTableDataSource(this.records);
       this.dataSource.paginator = this.paginator;
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
           const newvalue = data ? this.records.findIndex(h => h.id === data.id) : -1;
          if (newvalue > -1) {
            this.records[newvalue] = data;
          }
          this.dataSource = new MatTableDataSource(this.records);
          this.dataSource.paginator = this.paginator;
        });
    
     console.log('one', this.records);
    }
    });
    
  }

  removeRecord(Record:main): void { 
   //this.dataSource = this.records.filter(h => h !== Record);
   this.dataSource.data.splice(this.records.indexOf(Record), 1);
   this.dataSource = new MatTableDataSource(this.dataSource.data);
   this.dataSource.paginator = this.paginator;
    this.MainService.deleteRecord(Record).subscribe();
    console.log(this.records);
  }
  onNoClick(): void {}

}
