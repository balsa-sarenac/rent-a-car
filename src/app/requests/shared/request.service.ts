import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRequest } from './irequest.request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getRequests() {
    return this.http.get<IRequest[]>("http://localhost:8086/request/1");
  }

  acceptRequest(reqId) {
    return this.http.put("http://localhost:8086/request/accept/" + reqId, null);
  }

  acceptBundle(bundleId) {
    return this.http.put("http://localhost:8086/request/bundle/accept/" + bundleId, null);
  }

  refuseRequest(reqId) {
    return this.http.put("http://localhost:8086/request/refuse/" + reqId, null);
  }

  refuseBundle(bundleId) {
    return this.http.put("http://localhost:8086/request/bundle/refuse/" + bundleId, null);
  }

  cancelRequest(reqId) {
    return this.http.put("http://localhost:8086/request/cancel/" + reqId, null);
  }

  cancelBundle(bundleId) {
    return this.http.put("http://localhost:8086/request/bundle/cancel/" + bundleId, null);
  }
}
