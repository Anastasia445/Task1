import { DataSource } from '@angular/cdk/table';
import { HttpClient } from '@angular/common/http';
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
const r: main[] =[];
@Component({
  selector: 'app-main-page',  
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
 // providers:[MainService]
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
 // public recordse;
  constructor(
    public dialog: MatDialog,
    private MainService: MainService,
    public Auth: AuthService,
  ) {}

  ngOnInit() {
    this.MainService.getRecords().subscribe(results=>{
      this.records = results;
      this.dataSource = new MatTableDataSource(this.records);
      this.dataSource.paginator = this.paginator;
   //   this.length = this.records.length;
    });
  }
  /*
  getRecords(): void {
    this.MainService.getRecords().subscribe((records1) => {
    this.records = records1;
  }
    );
  }*/
  
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
        this.MainService.addRecord(result.main).subscribe((result2) => 
       this.dataSource.push(result2),
       );
       //console.log(result.main);
       console.log(this.records);
     /*  const r = this.records;
       this.records = r;  */
      }
    });
  }

  changeRecord(): void{
    const dialogRef = this.dialog.open(NewPostComponent, {
      data: {
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
        });
    // console.log('one', this.dataSource);
     console.log('one', this.records);
    }
    });
    
  }

  removeRecord(Record:main): void { 
    this.dataSource = this.records.filter(h => h !== Record);
    this.MainService.deleteRecord(Record).subscribe();
    console.log(this.dataSource);
  }

  /*updateRecord() {
    
      this.MainService
        .updateRecord(this.Record)
        .subscribe(hero => {
        // replace the hero in the heroes list with update from server
        const ix = hero ? this.recordse.findIndex(h => h.id === hero.id) : -1;
        if (ix > -1) {
          this.recordse[ix] = hero;
        }
      });
    }*/

  onNoClick(): void {}

  /*
    changeRecord(Record: main) {
    const dialogRef = this.dialog.open(NewPostComponent, {
      data: {
      //  item,
        userId: this.userId,
        title: this.title,
        body: this.body,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
         this.MainService.updateRecord(this.result).subscribe((result2) => { 
          const ix = result2 ? this.records.findIndex(h => h.id === result2.id) : -1;
          if (ix > -1) {
            this.records[ix] = result2;
          }
        console.log('one', result);
         console.log('one', result2);
       //this.main[this.main.indexOf(item)] = result.main;
       //this.records = new MatTableDataSource<main>(this.main.data);
     })
    }
    });
  }
  */
}
