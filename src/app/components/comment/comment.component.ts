import { Component, OnInit, OnChanges, Input } from '@angular/core';



@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})


export class CommentComponent implements OnInit 
{

  @Input('theComment') Comment: string;

  constructor() 
  { 
    
  }

  ngOnInit() 
  { 
    console.log(this.Comment);
  }

}
