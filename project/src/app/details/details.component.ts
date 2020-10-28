import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../services/main.service';
import { Location } from '@angular/common';
import { main } from '../main-page/main-page.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers:[MainService]
})
export class DetailsComponent implements OnInit {
  Record: main;

  constructor(private route: ActivatedRoute,
    private MainService: MainService,
    private location: Location) { }

  ngOnInit(): void {
    this.getRecord();
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
