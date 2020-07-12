import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from '../shared/request.service';
import { IAllRequests } from '../shared/irequests.all';
import { IRequest } from '../shared/irequest.request';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/chat/shared/chat.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IReport } from '../shared/ireport.report';

@Component({
  selector: 'app-received-requests',
  templateUrl: './received-requests.component.html',
  styleUrls: ['./received-requests.component.css']
})
export class ReceivedRequestsComponent implements OnInit {
  @ViewChild('dismissbutton') closeButton;

  all: IRequest[];
  pending: IRequest[];
  paid: IRequest[];
  finished: IRequest[];

  user: string;
  kilometrage: number;
  textCommentReport: string = '';
  request: IRequest;
  report: IReport;
  myModalReport: NgbModalRef;

  messageForm;
  newMessage;
  companionId: number;

  constructor(private requestService: RequestService, private toastr: ToastrService, private router: Router,
    private route: ActivatedRoute, private chatService: ChatService, private formBuilder: FormBuilder,
    private modalService: NgbModal, private _toastr: ToastrService) {
    this.messageForm = this.formBuilder.group({ text: '' });
  }

  ngOnInit(): void {
    this.getRequests();
    this.user = localStorage.getItem('User-role');
  }

  getRequests() {
    this.requestService.getReceived()
      .subscribe((data: IAllRequests) => {
        this.all = data.all;
        this.pending = data.pending;
        this.paid = data.paid;
        this.finished = data.finished;
      });
  }

  accept(req: IRequest) {
    if (req.bundleId == -1)
      this.requestService.acceptRequest(req.id)
        .subscribe(
          data => { this.getRequests() },
          error => { this.toastr.error(error.error) }
        );
    else
      this.requestService.acceptBundle(req.bundleId)
        .subscribe(data => { this.getRequests() },
          error => { this.toastr.error(error.error) });
  }

  refuse(req: IRequest) {
    if (req.bundleId == -1)
      this.requestService.refuseRequest(req.id)
        .subscribe(data => { this.getRequests() },
          error => { this.toastr.error(error.error) });
    else
      this.requestService.refuseBundle(req.bundleId)
        .subscribe(data => { this.getRequests() },
          error => { this.toastr.error(error.error) });
  }

  openAd(req: IRequest) {
    this.router.navigate(['car', req.adId], { relativeTo: this.route.parent });
  }

  openReport(content, req) {
    this.myModalReport = this.modalService.open(content);
    this.request = req;
  }

  sendReport() {
    if (this.textCommentReport == undefined || this.textCommentReport == "" ||
      this.kilometrage == undefined || this.kilometrage == null || this.kilometrage == 0) {
      alert("Enter info properly!");
      return;
    }

    let newReport: IReport = {
      id: null,
      kilometrage: this.kilometrage,
      comment: this.textCommentReport,
      ad_id: this.request.adId,
      user_id: this.request.userId
    };
    this.requestService.createReport(newReport).subscribe(data => {
      this.report = data;
    }, err => {
      alert("Error");
    });

    this.myModalReport.close();
  }

  onSubmit(mess: { text: String; }) {
    this.newMessage = {
      id: -1,
      text: mess.text,
      sent: new Date(),
      user: 'sent',
      companionId: this.companionId,
    };
    this.chatService.sendMessage(this.newMessage)
      .subscribe(() => {
        console.log("Message sent");
      }
      );

    this.messageForm.reset();
    this.closeButton.nativeElement.click();
  }

  setCompanion(req: IRequest) {
    this.companionId = req.userId;
  }
}
