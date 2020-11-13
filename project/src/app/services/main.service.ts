import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { main, comments } from '../main-page/main-page.component';
import { Observable, of } from 'rxjs';
import { CommentsService } from '../services/comments.service';

const  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const getRrcords = " http://jsonplaceholder.typicode.com/posts"
const getRrcords10 = " http://jsonplaceholder.typicode.com/posts/?userId=1"
const addRecord = "http://jsonplaceholder.typicode.com/posts"
const deleteRecord = "http://jsonplaceholder.typicode.com/posts"
const updateRecord= "http://jsonplaceholder.typicode.com/posts/1"
const comment = "http://jsonplaceholder.typicode.com/comments"

@Injectable({
  providedIn: 'root'
})

export class MainService {

  constructor( private http: HttpClient,
    private router: Router,
    private injector: Injector,
    private CommentsService: CommentsService) { }

  getRecords(): Observable<main[]> {
    return this.http.get<main[]>(getRrcords);
  }
  getRecords10(): Observable<main[]> {
    return this.http.get<main[]>(getRrcords10);
  }

  getusercomment(postId:number): Observable<comments[]> {
    //const url = `${comment}/${postId}`;
    return this.http.get<comments[]>(`${comment}/?postId=${postId}`)
  }

  getusercommentt(postId:number): Observable<comments[]> {
    //const url = `${comment}/${postId}`;
    return this.http.get<comments[]>(`${comment}/?postId=${postId}`)
  }

  getusercomments(id:number): Observable<comments> {
    const url = `${comment}/${id}`;
    return this.http.get<comments>(url);
  }

  getRecord(id:number): Observable<main> {
    const url = `${getRrcords}/${id}`;
    return this.http.get<main>(url);
  }

  getcomments(id){
    return this.http.get(getRrcords + "/" + id +"/comments")
  }

  searchRecords(term: string): Observable<main[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<main[]>(`${getRrcords}/?title=${term}`).pipe(
      tap(x => x.length ?
         this.log(`найдена запись: "${term}"`) :
         this.log(`запись не наедена: "${term}"`)),
      catchError(this.handleError<main[]>('searchHeroes', []))
    );
  }

  addRecord(Record: main): Observable<any> {
    return this.http.post(addRecord, Record, httpOptions);
  }
  
  deleteRecord(Record: main | number): Observable<main> {
   const id = typeof Record === 'number' ? Record : Record.id;
   const url = `${deleteRecord}/${id}`;
    return this.http.delete<main>(url, httpOptions)
  }

  updateRecord(Record: main ): Observable<any>{
    return this.http.put(updateRecord, Record, httpOptions);
  }  

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
    private log(comments: string) {
      this.CommentsService.add(`CommentsService: ${comments}`);
    }
  }


