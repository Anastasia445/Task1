import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../services/main.service';
import { Location } from '@angular/common';
import { comments, main } from '../main-page/main-page.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

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

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private MainService: MainService,
    private location: Location) { }

  ngOnInit() {
    this.getRecord();
    this.getcomments();
  }
  getcomments(): void {
    const postId = +this.route.snapshot.paramMap.get('id');
    this.MainService.getusercomment(postId).subscribe(results=>{
      this.userComment = results;
     this.dataSource = new MatTableDataSource(this.userComment);
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
