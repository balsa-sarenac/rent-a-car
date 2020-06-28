import { Component, OnInit } from '@angular/core';
import { CarService } from './shared/car.service';
import { CommentService } from '../comment/shared/comment.service';
import { IComment } from '../comment/shared/comment';
import { AdInfo } from './shared/adInfo';
import { ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common'

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

  constructor(private carService: CarService, private _location: Location,
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
      text: this.commentText,
      userUsername: 'agent',
      id: null,
      carId: null
    };
    this.commentService.createComment(this.comment).subscribe();
    this.commentText = "";
  }

  back(){
    this._location.back();
  }

}
