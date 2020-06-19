import { Component, OnInit } from '@angular/core';
import { IRequest } from './shared/irequest.request';
import { RequestService } from './shared/request.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from '../comment/shared/comment.service';
import { IComment } from '../comment/shared/comment';
import { GradeService } from '../comment/shared/grade.service';

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

  constructor(private requestService: RequestService,
              private modalService: NgbModal,
              private commentService: CommentService,
              private gradeService: GradeService) { }

  ngOnInit(): void {
    this.getRequests();
  }

  open(content, req) {
    this.myModal =  this.modalService.open(content);
    this.request = req;
  }

  send(){
    if(this.textComment == undefined || this.textComment == ""){
      alert("Please, fill the comment");
      return;
    }
    let comment: IComment = {
        id: null,
        text: this.textComment,
        approved: false,
        adId: this.request.adId,
        carId: null,
        userUsername: 'bax'
    };
    this.commentService.createComment(comment).subscribe();

    if(this.currentRate != 0){
      let grade: any = {
        id: null,
        grade: this.currentRate,
        adId: 4,
        carId: null,
        userUsername: 'bax'
      };
      this.gradeService.createGrade(grade).subscribe();
    }
    this.myModal.close();
  }

  getRequests() {
    this.requestService.getRequests()
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
}
