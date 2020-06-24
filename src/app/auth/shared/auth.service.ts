import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken() {
    let token = localStorage.getItem("User-token");
    return token == null ? '' : 'Bearer ' + token;
  }

  login(login: any) {
    return this.http.post<any>('http://localhost:8080/login', login);
    //return this.http.post<any>(environment.api + '/security/login', login);
  }
}
