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
    //return this.http.get<any>('http://localhost:8083/comment/all');
    return this.http.get<any>(environment.api + '/car/comment/all');
}

getCommentsForCar(carId: number) {
  //return this.http.get<any>('http://localhost:8083/comment/' + carId);
  return this.http.get<any>(environment.api + '/car/comment/' + carId);
}

acceptOrRefuse(id: number, decision: boolean){
     return this.http.get<void>(environment.api + '/car/comment/accept/' + id + '/' + decision);
     //return this.http.get<void>('http://localhost:8083/comment/accept/' + id + '/' + decision);
}

createComment(comment: IComment){
  //return this.http.post('http://localhost:8083/comment', comment);
   return this.http.post(environment.api + '/car/comment', comment);
}

}