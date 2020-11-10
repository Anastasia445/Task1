import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../services/main.service';
import { Location } from '@angular/common';
import { comments} from '../main-page/main-page.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { filter } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
export interface numbers {
  one:number,
  two:number,
  three:number,
  four:number,
  five:number,
  six:number,
  seven:number,
  eight:number,
  nine:number,
  ten:number
}
const number: numbers[]=[
  {one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10},
  {one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10},
  {one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10},
  {one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10},
  {one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10}]
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers:[MainService]
})
export class InfoComponent implements OnInit {

  numberss={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10}
  data: comments[];
  [x: string]: any;
  checked = false;
  displayedColumns: string[] = [
    'body',
   /* 'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',*/
    'preference',
    'sum'
  ];
  dataSource: any;
  isLoading = true;
  
  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private MainService: MainService,
    private location: Location) { }

  ngOnInit(){
    this.getrecord();

  }
  
  mark = "0";
  setValue(element){
    console.log(element.mark);
   // let v = element.mark;
  }

  checkSelected(label: string) {
    this.number.forEach(x => {
        if(x.label !== label) {
            x.checked = !x.checked
        }
    })
 }

  n: number = 0;
  count: number = 0;
 radioChange1($event : MatRadioChange):void{
 if($event){
  this.count++;}
}
count2: number = 0;
radioChange2($event : MatRadioChange):void{
  if($event){
   this.count2++;
  }
 }
 count3: number = 0;
radioChange3($event : MatRadioChange):void{
  if($event){
   this.count3++;
  }
 }
 count4: number = 0;
radioChange4($event : MatRadioChange):void{
  if($event){
   this.count4++;
  }
 }
 count5: number = 0;
radioChange5($event : MatRadioChange):void{
  if($event){
   this.count5++;
  }
 }
 count6: number = 0;
radioChange6($event : MatRadioChange):void{
  if($event){
   this.count6++;
  }
 }
 count7: number = 0;
radioChange7($event : MatRadioChange):void{
  if($event){
   this.count7++;
  }
 }
 count8: number = 0;
radioChange8($event : MatRadioChange):void{
  if($event){
   this.count8++;
  }
 }
 count9: number = 0;
radioChange9($event : MatRadioChange):void{
  if($event){
   this.count9++;
  }
 }
 count10: number = 0;
radioChange10($event : MatRadioChange):void{
  if($event){
   this.count10++;
  }
 }

  allNumbers: any;
  //selection = new SelectionModel(true, []);
  position: Array<number> = [1,2,3,4,5];
 

  change(){
    // this.count = 0;
    this.allNumbers.forEach(n =>{
      this.count = 0
      n.position.forEach(element => {
        if (element.checked) 
        this.count++;
        n.count = this.count;
        console.log(element.checked)
      });
    })

  }

  getrecord(): void {
    const postId = +this.route.snapshot.paramMap.get('id');
    this.MainService.getusercommentt(postId).subscribe(results=>{
      this.isLoading = false;
      this.data = results;
     this.dataSource = new MatTableDataSource(this.data);
   console.log(this.data);
  });
  }

  goBack(): void {
    this.location.back();
  }

}
