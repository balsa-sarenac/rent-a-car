import { Injectable } from '@angular/core';
import { IComment } from './comment';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments() {
    //return this.http.get<any>('http://localhost:8080/comment');
    return this.http.get<any>(environment.api + '/car/comment');
  }

  getCommentsForCar(carId: number) {
    //return this.http.get<any>('http://localhost:8080/comment/car/' + carId);
    return this.http.get<any>(environment.api + '/car/comment/car/' + carId);
  }

  checkComment(id: number, username: string) {
    //return this.http.get<any>('http://localhost:8080/comment/check/' + username + "/" + id);
    return this.http.get<any>(environment.api + '/car/comment/check/' + username + "/" + id);
  }

  acceptOrRefuse(id: number, decision: boolean) {
    return this.http.get<void>(environment.api + '/car/comment/accept/' + id + '/' + decision);
    //return this.http.get<void>('http://localhost:8080/comment/accept/' + id + '/' + decision);
  }

  createComment(comment: IComment) {
    //return this.http.post('http://localhost:8080/comment', comment);
    return this.http.post(environment.api + '/car/comment', comment);
  }

  createCommentReply(comment: IComment) {
    //return this.http.post('http://localhost:8080/comment/reply', comment);
    return this.http.post(environment.api + '/car/comment/reply', comment);
  }

}