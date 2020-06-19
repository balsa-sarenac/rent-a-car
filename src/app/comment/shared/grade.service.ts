import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http: HttpClient) { }


createGrade(grade: any){
  return this.http.post('http://localhost:8083/grade', grade);
   //return this.http.post(environment.api + '/car/grade', grade);
}

}