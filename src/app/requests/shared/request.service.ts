import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRequest } from './irequest.request';
import { environment } from 'src/environments/environment';
import { IReport } from './ireport.report';
import { IAllRequests } from './irequests.all';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getRequests() {
    return this.http.get<IAllRequests>("http://localhost:8080/request");
    // return this.http.get<IAllRequests>(environment.api + "/request");
  }

  getReceived() {
    return this.http.get<IAllRequests>("http://localhost:8080/request/received");
    // return this.http.get<IAllRequests>(environment.api + "/request/received")
  }

  acceptRequest(reqId) {
    return this.http.patch("http://localhost:8080/request/accept", { id: reqId });
    // return this.http.patch(environment.api + "/request/accept", { id: reqId });
  }

  acceptBundle(bundleId) {
    return this.http.patch("http://localhost:8080/request/bundle/accept", { id: bundleId });
    // return this.http.patch(environment.api + "/request/bundle/accept", { id: bundleId });
  }

  refuseRequest(reqId) {
    return this.http.patch("http://localhost:8080/request/refuse", { id: reqId });
    // return this.http.patch(environment.api + "/request/refuse", { id: reqId });
  }

  refuseBundle(bundleId) {
    return this.http.patch("http://localhost:8080/request/bundle/refuse", { id: bundleId });
    // return this.http.patch(environment.api + "/request/bundle/refuse", { id: bundleId });
  }

  cancelRequest(reqId) {
    return this.http.patch("http://localhost:8080/request/cancel", { id: reqId });
    // return this.http.patch(environment.api + "/request/cancel", { id: reqId });
  }

  cancelBundle(bundleId) {
    return this.http.patch("http://localhost:8080/request/bundle/cancel", { id: bundleId })
    // return this.http.patch(environment.api + "/request/bundle/cancel", { id: bundleId });
  }

  createReport(report: IReport) {
    return this.http.post<any>("http://localhost:8080/car/report", report);
    // return this.http.post<any>(environment.api + "/car/report", report);
  }
}
