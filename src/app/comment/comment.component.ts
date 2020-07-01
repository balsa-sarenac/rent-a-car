import { Component, OnInit } from '@angular/core';
import { IComment } from './shared/comment';
import { CommentService } from './shared/comment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comments: IComment[];

  constructor(private commentService: CommentService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.commentService.getComments().subscribe(
        (data: IComment[]) =>   this.comments = data,
        err => this._toastr.error("Error getting comments", "Comments")
        );
  }
  refresh(){
    this.commentService.getComments().subscribe(
       (data: IComment[]) => this.comments = data,
       err => this._toastr.error("Error getting comments", "Comments")
       );
 }

  onClickRefuse(comment: any){
    this.commentService.acceptOrRefuse(comment.id, false).subscribe(
      data => {
          this._toastr.success("Comment " + comment.text +" refused", "Comment")
          this.refresh();
      },
      err => {
        this._toastr.error("Error refusing comment", "Comment")
      });
  }

  onClickAccepte(comment: any){
    this.commentService.acceptOrRefuse(comment.id, true).subscribe(
      data => {
          this._toastr.success("Comment " + comment.text +" accepted", "Comment")
          this.refresh();
      },
      err => {
        this._toastr.error("Error accepting comment", "Comment")
      });
  }

}
