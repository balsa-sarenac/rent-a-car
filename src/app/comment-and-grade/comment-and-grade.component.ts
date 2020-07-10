import { Component, OnInit } from '@angular/core';
import { GradeService } from '../comment/shared/grade.service';
import { CommentService } from '../comment/shared/comment.service';
import { IGrade } from '../comment/shared/grade';
import { IComment } from '../comment/shared/comment';
import { CarService } from '../car/shared/car.service';
import { Car } from '../car/shared/car';
import { CarInfo } from '../car/shared/carInfo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-and-grade',
  templateUrl: './comment-and-grade.component.html',
  styleUrls: ['./comment-and-grade.component.css']
})
export class CommentAndGradeComponent implements OnInit {
  grades: IGrade[];
  comments: IComment[];
  cars: CarInfo[];
  selectedCar: CarInfo;
  commentText: string='';
  role: string;
  comment: IComment;
  selectedComment: IComment;
  mode: string = 'VIEW';
  username: string;
  checkCommentFlag: boolean = false;



  constructor(private gradeService: GradeService,
              private commentService: CommentService,
              private carService: CarService,
              private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("User-role");
    this.username = localStorage.getItem("Username");
    this.carService.getCarsByUser(this.username).subscribe(
      data =>{
        this.cars = data;
      }
    );

  }

  cancel(){
    this.mode='VIEW';
    this.commentText = '';
  }

  addComment(comment){
      this.mode = 'COMMENT';
      this.selectedComment = comment;
  }

  getCommentAndGrades(){
    this.mode = 'VIEW';
    this.gradeService.getGradesForCar(this.selectedCar.id).subscribe(
      data => {
          this.grades = data;
      }
    );

    this.commentService.getCommentsForCar(this.selectedCar.id).subscribe(
      data => {
          this.comments = data;
      }
    );
  }

  sendComment(): void {
    if(this.commentText == ''){
      this._toastr.info('Please, insert text', "Comment");
      return;
    }
    this.comment = {
      adId: this.selectedComment.adId,
      role: localStorage.getItem("User-role"),
      approved: false,
      text: this.commentText,
      userUsername: this.username,
      id: null,
      carId: this.selectedComment.carId
    };
    this.commentService.createCommentReply(this.comment).subscribe(
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
    this.commentText = '';
    this.mode ='VIEW';
  }

}
