import { Component, OnInit } from '@angular/core';
import { IRequest } from '../shared/irequest.request';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../shared/request.service';
import { CommentService } from 'src/app/comment/shared/comment.service';
import { GradeService } from 'src/app/comment/shared/grade.service';
import { IComment } from 'src/app/comment/shared/comment';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Message } from 'src/app/chat/shared/message';
import { ChatService } from 'src/app/chat/shared/chat.service';
import { IReport } from '../shared/ireport.report';
import { ToastrService } from 'ngx-toastr';
import { IGrade } from 'src/app/comment/shared/grade';

@Component({
  selector: 'app-past-requests',
  templateUrl: './past-requests.component.html',
  styleUrls: ['./past-requests.component.css']
})
export class PastRequestsComponent implements OnInit {
  requests: IRequest[];
  request: IRequest;
  report: IReport;
  textComment: string ='';
  textCommentReport: string;
  currentRate: number = 0;
  myModal: NgbModalRef;
  myModalReport: NgbModalRef;
  user: string;
  messageForm;
  newMessage: Message;
  companionId: number;
  kilometrage: number;
  checkCommentFlag: boolean = false;
  checkGradeFlag: boolean = false;

  constructor(private requestService: RequestService,
    private modalService: NgbModal,
    private commentService: CommentService,
    private gradeService: GradeService,
    private chatService: ChatService,
    private formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { this.messageForm = this.formBuilder.group({ text: '' }); }

  ngOnInit(): void {
    this.getPast();
    this.user = localStorage.getItem('User-role');
  }

  checkDate(date){
    var today = new Date();
    var inputDate = new Date(date);

    if(inputDate.setHours(0,0,0,0) <= today.setHours(0,0,0,0)) {
        return true;
    }

    return false;
  }

  checkComment(id){
    this.commentService.checkComment(id , localStorage.getItem('Username')).subscribe(
      data =>{
        this.checkCommentFlag = data;
      }
    );
  }

  checkGrade(id){
    this.gradeService.checkGrade(id , localStorage.getItem('Username')).subscribe(
      data =>{
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

  openReport(content, req) {
    this.myModalReport = this.modalService.open(content);
    this.request = req;
  }

  send() {
    if (this.textComment == '' && this.currentRate == 0) {
      this._toastr.info("Please, fill the information")
      return;
    }

    if(this.textComment != ""){
      let comment: IComment = {
        id: null,
        text: this.textComment,
        approved: false,
        adId: this.request.adId,
        carId: null,
        userUsername: localStorage.getItem('Username'),
        role: localStorage.getItem('User-role')
      };
      this.commentService.createComment(comment).subscribe(
        data=>{
          this._toastr.success("Comment succesfully created", "Comment");
        },
        error =>{
          if(error.status == 400)
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
        data=>{
          this._toastr.success("Grade succesfully created", "Grade");
        },
        error =>{
          if(error.status == 400)
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

  /*
  report(req: IRequest) {
    console.log("report");
  }
  */

  getPast() {
    this.requestService.getPast()
      .subscribe((data: IRequest[]) => this.requests = data);
  }

  openAd(req: IRequest) {
    this.router.navigate(['car', req.adId],{relativeTo: this.route.parent});
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

}