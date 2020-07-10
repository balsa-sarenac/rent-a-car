import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRequest } from './irequest.request';
import { environment } from 'src/environments/environment';
import { IReport } from './ireport.report';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getRequests() {
    //return this.http.get<IRequest[]>("http://localhost:8084/1");
    return this.http.get<IRequest[]>(environment.api + "/request/2");
  }

  getActive() {
    return this.http.get<IRequest[]>(environment.api + "/request/active/1")
  }

  getPast() {
    return this.http.get<IRequest[]>(environment.api + "/request/past/1")
  }

  acceptRequest(reqId) {
    return this.http.patch(environment.api + "/request/accept", { id: reqId });
  }

  acceptBundle(bundleId) {
    return this.http.patch(environment.api + "/bundle/accept", { id: bundleId });
  }

  refuseRequest(reqId) {
    return this.http.patch(environment.api + "/request/refuse", { id: reqId });
  }

  refuseBundle(bundleId) {
    return this.http.patch(environment.api + "/bundle/refuse", { id: bundleId });
  }

  cancelRequest(reqId) {
    return this.http.patch(environment.api + "/request/cancel", { id: reqId });
  }

  cancelBundle(bundleId) {
    return this.http.patch(environment.api + "/bundle/cancel", { id: bundleId });
  }

  createReport(report: IReport) {
    return this.http.post<any>(environment.api + "/report", report);
  }
}
