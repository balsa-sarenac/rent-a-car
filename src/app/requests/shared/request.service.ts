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
    return this.http.get<IRequest[]>(environment.api + "/request/1");
  }

  acceptRequest(reqId) {
    return this.http.put(environment.api + "/request/accept", { requestId: reqId });
  }

  acceptBundle(bundleId) {
    return this.http.put(environment.api + "/request/bundle/accept", { bundleId: bundleId });
  }

  refuseRequest(reqId) {
    return this.http.put(environment.api + "/request/refuse", { requestId: reqId });
  }

  refuseBundle(bundleId) {
    return this.http.put(environment.api + "/request/bundle/refuse", { bundleId: bundleId });
  }

  cancelRequest(reqId) {
    return this.http.put(environment.api + "/request/cancel", { requestId: reqId });
  }

  cancelBundle(bundleId) {
    return this.http.put(environment.api + "/request/bundle/cancel", { bundleId: bundleId });
  }
}
