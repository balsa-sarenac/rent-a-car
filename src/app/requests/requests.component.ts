import { Component, OnInit } from '@angular/core';
import { IRequest } from './shared/irequest.request';
import { RequestService } from './shared/request.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IAllRequests } from './shared/irequests.all';
import { FormBuilder } from '@angular/forms';
import { ChatService } from '../chat/shared/chat.service';
import { IComment } from '../comment/shared/comment';
import { IGrade } from '../comment/shared/grade';
import { CommentService } from '../comment/shared/comment.service';
import { GradeService } from '../comment/shared/grade.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  all: IRequest[];
  pending: IRequest[];
  paid: IRequest[];
  finished: IRequest[];

  request: IRequest;
  textComment: string;
  currentRate: number = 0;
  myModal: NgbModalRef;
  userRole: string;
  checkCommentFlag: boolean = false;
  checkGradeFlag: boolean = false;

  messageForm;
  newMessage;
  companionId: number;

  constructor(private requestService: RequestService, private router: Router, private route: ActivatedRoute,
    private _toastr: ToastrService, private formBuilder: FormBuilder, private chatService: ChatService,
    private commentService: CommentService, private gradeService: GradeService, private modalService: NgbModal) {
    this.messageForm = this.formBuilder.group({ text: '' });
  }

  ngOnInit(): void {
    this.getRequests();
    this.userRole = localStorage.getItem("User-role");
  }

  getRequests() {
    this.requestService.getRequests()
      .subscribe((data: IAllRequests) => {
        this.all = data.all;
        this.pending = data.pending;
        this.paid = data.paid;
        this.finished = data.finished;
      });
  }

  cancel(req: IRequest) {
    if (req.bundleId == -1)
      this.requestService.cancelRequest(req.id).subscribe(data => { this.getRequests() },
        error => { this._toastr.error(error.error) });
    else
      this.requestService.cancelBundle(req.bundleId).subscribe(data => { this.getRequests() },
        error => { this._toastr.error(error.error) });
  }

  openAd(req: IRequest) {
    this.router.navigate(['car', req.adId], { relativeTo: this.route.parent });
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
  }

  setCompanion(req: IRequest) {
    this.companionId = req.userId;
  }


  checkDate(date) {
    var today = new Date();
    var inputDate = new Date(date);

    if (inputDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
      return true;
    }

    return false;
  }

  checkComment(id) {
    this.commentService.checkComment(id, localStorage.getItem('Username')).subscribe(
      data => {
        this.checkCommentFlag = data;
      }
    );
  }

  checkGrade(id) {
    this.gradeService.checkGrade(id, localStorage.getItem('Username')).subscribe(
      data => {
        this.checkGradeFlag = data;
      }
    );
  }

  open(content, req) {
    this.myModal = this.modalService.open(content);
    this.request = req;
    this.checkComment(this.request.adId);
    this.checkGrade(this.request.adId);
  }

  send() {
    if (this.textComment == '' && this.currentRate == 0) {
      this._toastr.info("Please, fill the information")
      return;
    }

    if (this.textComment != "") {
      let comment: IComment = {
        id: null,
        text: this.textComment,
        approved: false,
        adId: this.request.adId,
        carId: null,
        role: this.userRole,
        userUsername: localStorage.getItem('Username')
      };
      this.commentService.createComment(comment).subscribe(
        data => {
          this._toastr.success("Comment succesfully created", "Comment");
        },
        error => {
          if (error.status == 400)
            this._toastr.info("Comment already sent", "Comment");
          else
            this._toastr.error("Error creating comment", "Comment");
        }
      );
    }

    if (this.currentRate != 0) {
      let grade: IGrade = {
        id: null,
        grade: this.currentRate,
        adId: this.request.adId,
        carId: null,
        userUsername: localStorage.getItem('Username')
      };
      this.gradeService.createGrade(grade).subscribe(
        data => {
          this._toastr.success("Grade succesfully created", "Grade");
        },
        error => {
          if (error.status == 400)
            this._toastr.info("Grade already sent", "Grade");
          else
            this._toastr.error("Error creating grade", "Grade");
        }
      );
    }
    this.textComment = '';
    this.currentRate = 0;
    this.myModal.close();
  }
}
