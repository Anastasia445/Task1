import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../services/main.service';
import { Location } from '@angular/common';
import { comments, main } from '../main-page/main-page.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers:[MainService]
})
export class DetailsComponent implements OnInit {
  
  Record: main;
  userComment: comments[];
  [x: string]: any;
  
  displayedColumns: string[] = [
    'postId',
    'id',
    'name',
    'email',
    'body'
  ];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private MainService: MainService,
    private location: Location) { }

  ngOnInit() {
    this.getRecord();
    this.getcomments();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getcomments(): void {
    const postId = +this.route.snapshot.paramMap.get('id');
    this.MainService.getusercomment(postId).subscribe(results=>{
      this.userComment = results;
     this.dataSource = new MatTableDataSource(this.userComment);
     this.dataSource.sort = this.sort;
   console.log(this.userComment);
  });
  }
  getRecord():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.MainService.getRecord(id)
      .subscribe(Records => this.Record = Records);
  }

  goBack(): void {
    this.location.back();
  }
}
