import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  getBills(username: string) {
    return this.http.get<any>('http://localhost:8080/bill/' + username);
    //return this.http.delete<any>(environment.api + '/security/bill/' + username);
  }

  payBill(id: number) {
    return this.http.patch<any>('http://localhost:8080/bill/pay/' + id,{});
    //return this.http.delete<any>(environment.api + '/security/bill/pay/' + id);
  }
}
