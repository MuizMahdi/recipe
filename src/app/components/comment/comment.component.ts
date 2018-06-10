import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Comment } from './../../models/Comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit 
{
  @Input('theComment') Comment: Comment;

  comment:string;
  commenter:string;
  commenterPhotoUrl:string;

  constructor() 
  { }

  ngOnInit() 
  { 
    this.comment = this.Comment.comment;
    this.commenter = this.Comment.commenter;
    this.commenterPhotoUrl = this.Comment.commenterPhotoURL;
  }
}
