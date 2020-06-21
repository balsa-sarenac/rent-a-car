import { Component, OnInit } from '@angular/core';
import { IRequest } from '../shared/irequest.request';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../shared/request.service';
import { CommentService } from 'src/app/comment/shared/comment.service';
import { GradeService } from 'src/app/comment/shared/grade.service';
import { IComment } from 'src/app/comment/shared/comment';
import { Router } from '@angular/router';
import { IReport } from '../shared/ireport.report';

@Component({
  selector: 'app-past-requests',
  templateUrl: './past-requests.component.html',
  styleUrls: ['./past-requests.component.css']
})
export class PastRequestsComponent implements OnInit {
  requests: IRequest[];
  request: IRequest;
  report: IReport;
  textComment: string;
  textCommentReport: string;
  currentRate: number = 0;
  myModal: NgbModalRef;
  myModalReport: NgbModalRef;
  user: string;
  kilometrage: number;

  constructor(private requestService: RequestService,
    private modalService: NgbModal,
    private commentService: CommentService,
    private gradeService: GradeService, private router: Router) { }

  ngOnInit(): void {
    this.getPast();
    this.user = localStorage.getItem('User-role');
  }

  open(content, req) {
    this.myModal = this.modalService.open(content);
    this.request = req;
  }

  openReport(content, req) {
    this.myModalReport = this.modalService.open(content);
    this.request = req;
  }

  send() {
    if (this.textComment == undefined || this.textComment == "") {
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

    if (this.currentRate != 0) {
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
      ad_id: this.request.adId
    };
    this.requestService.createReport(newReport).subscribe(data => {
      this.report = data;
    }, err => {
      alert("Error");
    });

    this.myModalReport.close();
  }

  getPast() {
    this.requestService.getPast()
      .subscribe((data: IRequest[]) => this.requests = data);
  }

  openAd(req: IRequest) {
    this.router.navigate(['/car', req.adId]);
  }
}
