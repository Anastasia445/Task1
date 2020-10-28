import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { MainService } from '../services/main.service';
import { main } from '../main-page/main-page.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  records$: Observable<main[]>;
  private searchTerms = new Subject<string>();

  constructor(private MainService: MainService,
    private location: Location) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.records$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.MainService.searchRecords(term)),
    );
  }
  
  goBack(): void {
    this.location.back();
  }

}
