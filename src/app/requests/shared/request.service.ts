import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRequest } from './irequest.request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getRequests() {
    //return this.http.get<IRequest[]>("http://localhost:8084/1");
    return this.http.get<IRequest[]>(environment.api + "/request/1");
  }

  acceptRequest(reqId) {
    return this.http.patch(environment.api + "/request/accept", { id: reqId });
  }

  acceptBundle(bundleId) {
    return this.http.patch(environment.api + "/request/bundle/accept", { id: bundleId });
  }

  refuseRequest(reqId) {
    return this.http.patch(environment.api + "/request/refuse", { id: reqId });
  }

  refuseBundle(bundleId) {
    return this.http.patch(environment.api + "/request/bundle/refuse", { id: bundleId });
  }

  cancelRequest(reqId) {
    return this.http.patch(environment.api + "/request/cancel", { id: reqId });
  }

  cancelBundle(bundleId) {
    return this.http.patch(environment.api + "/request/bundle/cancel", { id: bundleId });
  }
}
