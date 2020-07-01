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

  register(user: any) {
    return this.http.post<any>('http://localhost:8080/register', user);
    //return this.http.post<any>(environment.api + '/security/register', user);
  }

  getUsers() {
    return this.http.get<any>('http://localhost:8080/users');
    //return this.http.get<any>(environment.api + '/security/users');
  }

  disableUser(id: number) {
    return this.http.get<any>('http://localhost:8080/disable/' + id);
    //return this.http.get<any>(environment.api + '/security/enable/'+id);
  }

  enableUser(id: number) {
    return this.http.get<any>('http://localhost:8080/enable/' + id);
    //return this.http.get<any>(environment.api + '/security/disable/'+id);
  }
}
