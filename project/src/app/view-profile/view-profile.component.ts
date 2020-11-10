import { style } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  profile = {
    lname:'Фролов', 
    fname:'Виктор', 
    patronymic:'Петрович', 
    email:'vf002@mail.com', 
    address:'пр. Победы 12/44',
    city:'Минск',
    pcode:'246140'} 
    isReady:boolean;
  constructor() { }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  ngOnInit(): void {
  }

  url="assets/profile.png";
  onSelectFile(file){
    if(file.target.files){
      let reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload=(event:any)=>{
      this.url=event.target.result;
      }
    }
  }
  
  save(){
   this.isReady = false;
   console.log(this.profile);
  }

  created(){
    this.isReady = true;
  }

}
