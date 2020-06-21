import { Component, OnInit } from '@angular/core';
import { IRequest } from './shared/irequest.request';
import { RequestService } from './shared/request.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests: IRequest[];
  request: IRequest;
  textComment: string;
  currentRate: number = 0;
  myModal: NgbModalRef;

  constructor(private requestService: RequestService, private router: Router) { }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    this.requestService.getActive()
      .subscribe((data: IRequest[]) => this.requests = data);
  }

  accept(req: IRequest) {
    if (req.bundleId == -1)
      this.requestService.acceptRequest(req.id)
        .subscribe();
    else
      this.requestService.acceptBundle(req.bundleId)
        .subscribe();
  }

  refuse(req: IRequest) {
    if (req.bundleId == -1)
      this.requestService.refuseRequest(req.id)
        .subscribe();
    else
      this.requestService.refuseBundle(req.bundleId)
        .subscribe();
  }

  cancel(req: IRequest) {
    if (req.bundleId == -1)
      this.requestService.cancelRequest(req.id).subscribe();
    else
      this.requestService.cancelBundle(req.bundleId).subscribe();
  }

  openAd(req: IRequest) {
    this.router.navigate(['/car', req.adId]);
  }
}
