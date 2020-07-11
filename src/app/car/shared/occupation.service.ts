import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OccupationService {

  constructor(private http: HttpClient) { }

  setOccupied(occupied: any) {
    return this.http.post<any>(environment.api + "/car/occupied", occupied);
    //return this.http.post<any>("http://localhost:8080/occupied", occupied);
  }

  getOccupations(username: any) {
    return this.http.get<any>(environment.api + "/car/occupied/user/" + username);
    //return this.http.get<any>("http://localhost:8080/occupied/user/" + username);
  }
}
