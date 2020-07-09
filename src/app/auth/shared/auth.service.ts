import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/car/shared/user';
import { environment } from 'src/environments/environment';

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

  deleteUser(id: number) {
    return this.http.delete('http://localhost:8080/' + id);
    //return this.http.delete<any>(environment.api + '/security/'+id);
  }

  getUser(username: string) {
    return this.http.get<any>('http://localhost:8080/' + username);
    //return this.http.delete<any>(environment.api + '/security/'+username);
  }

  disableEnableRent(id: number, privilege: boolean) {
    return this.http.get<any>('http://localhost:8080/rentPrivilege/' + privilege + "/" + id);
    //return this.http.delete<any>(environment.api + '/security/rentPrivilege/' + privilege + "/" + id);
  }

  editUser(user: User) {
    return this.http.patch('http://localhost:8080', {
      id: user.id,
      companyName: user.companyName,
      businessID: user.businessID,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address
    });
    //return this.http.delete<any>(environment.api + '/security/', {});
  }

  getRegistrationRequests() {
    return this.http.get(environment.api + '/registration-requests');
  }

  approveRequest(id: number) {
    return this.http.post(environment.api + '/approve/' + id, {});
  }

  refuseRequest(id: number) {
    return this.http.post(environment.api + '/refuse/' + id, {});
  }

}
