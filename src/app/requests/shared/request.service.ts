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
    return this.http.put("http://localhost:8086/request/accept", { requestId: reqId });
  }

  acceptBundle(bundleId) {
    return this.http.put("http://localhost:8086/request/bundle/accept", { bundleId: bundleId });
  }

  refuseRequest(reqId) {
    return this.http.put("http://localhost:8086/request/refuse", { requestId: reqId });
  }

  refuseBundle(bundleId) {
    return this.http.put("http://localhost:8086/request/bundle/refuse", { bundleId: bundleId });
  }

  cancelRequest(reqId) {
    return this.http.put("http://localhost:8086/request/cancel", { requestId: reqId });
  }

  cancelBundle(bundleId) {
    return this.http.put("http://localhost:8086/request/bundle/cancel", { bundleId: bundleId });
  }
}
