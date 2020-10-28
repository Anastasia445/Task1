import { Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }
    comments: string[] = [];

  add(comments: string) {
    this.comments.push(comments);
  }

  clear() {
    this.comments = [];
  }
}
