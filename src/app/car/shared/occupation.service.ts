import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OccupationService {

  constructor(private http: HttpClient) { }

  setOccupied(occupied: any) {
    //return this.http.post<any>(environment.api + "/car/occupied", occupied);
    return this.http.post<any>("http://localhost:8083/occupied", occupied);
  }
}
