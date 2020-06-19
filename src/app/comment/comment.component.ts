import { Component, OnInit } from '@angular/core';
import { IComment } from './shared/comment';
import { CommentService } from './shared/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comments: IComment[];

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.commentService.getComments().subscribe(
        (data: IComment[]) =>   this.comments = data,
        err => console.error('Error in getting comments')
        );
  }
  refresh(){
    this.commentService.getComments().subscribe(
       (data: IComment[]) => this.comments = data,
       err => console.error('Error in getting comments')
       );
 }

  onClickRefuse(comment: any){
    this.commentService.acceptOrRefuse(comment.id, false).subscribe(
      data => {
          console.log('Comment refused');
          this.refresh();
      },
      err => {
          console.error('Error accepting comment');
      });
  }

  onClickAccepte(comment: any){
    this.commentService.acceptOrRefuse(comment.id, true).subscribe(
      data => {
          console.log('Comment accepted');
          this.refresh();
      },
      err => {
          console.error('Error accepting comment');
      });
  }

}
