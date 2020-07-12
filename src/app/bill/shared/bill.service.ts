import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  getBills(username: string) {
    return this.http.get<any>('http://localhost:8080/bill/' + username);
    // return this.http.get<any>(environment.api + '/request/bill/' + username);
  }

  payBill(id: number) {
    return this.http.patch<any>('http://localhost:8080/bill/pay/' + id,{});
    // return this.http.patch<any>(environment.api + '/request/bill/pay/' + id, {});
  }
}
