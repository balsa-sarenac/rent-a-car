import { Component, OnInit } from '@angular/core';
import { CarService } from './shared/car.service';
import { CommentService } from '../comment/shared/comment.service';
import { IComment } from '../comment/shared/comment';
import { AdInfo } from './shared/adInfo';

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

  constructor(private carService: CarService,
              private commentService: CommentService) { }

  ngOnInit(): void {
    this.carService.getOneAd(5).subscribe(
      data => {this.ad = data;
        this.commentService.getCommentsForCar(this.ad.car.id).subscribe(
          data => {this.comments = data
          }
        );
      }
    );
    
  } 

  sendComment(): void{
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

}
