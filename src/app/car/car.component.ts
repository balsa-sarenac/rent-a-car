import { Component, OnInit } from '@angular/core';
import { CarService } from './shared/car.service';
import { CommentService } from '../comment/shared/comment.service';
import { IComment } from '../comment/shared/comment';
import { AdInfo } from './shared/adInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  ad: AdInfo;
  commentText: string;
  comment: IComment;
  comments: IComment[];
  id: number;
  private sub: any;
  role: string = '';

  constructor(private carService: CarService, private _toastr: ToastrService, private _location: Location,
    private commentService: CommentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("User-role");
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    this.carService.getOneAd(this.id).subscribe(
      data => {
        this.ad = data;
        this.ad.fromDate = new Date(this.ad.fromDate);
        this.ad.toDate = new Date(this.ad.toDate);
        this.commentService.getCommentsForCar(this.ad.car.id).subscribe(
          data => {
            this.comments = data
          }
        );
      }
    );

  }

  sendComment(): void {
    this.comment = {
      adId: this.ad.id,
      approved: false,
      role: localStorage.getItem("User-role"),
      text: this.commentText,
      userUsername: localStorage.getItem("Username"),
      id: null,
      carId: this.ad.car.id
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
    this.commentText = "";
  }

  back() {
    this._location.back();
  }

}
