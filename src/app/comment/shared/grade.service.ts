import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http: HttpClient) { }


createGrade(grade: any){
  //return this.http.post('http://localhost:8080/grade', grade);
   return this.http.post(environment.api + '/car/grade', grade);
}

checkGrade(id: number, username: string) {
  //return this.http.get<any>('http://localhost:8080/grade/check/' + username + "/" + id);
  return this.http.get<any>(environment.api + '/car/grade/check/' + username + "/" + id);
}

getGradesForCar(carId: number) {
  //return this.http.get<any>('http://localhost:8080/grade/car/' + carId);
  return this.http.get<any>(environment.api + '/car/grade/car/' + carId);
}

}