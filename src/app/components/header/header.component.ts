import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit 
{

  closeResult: string;

  constructor(private modalService: NgbModal) { }



  open(content) 
  {
    this.modalService.open(content);
  }

  
  ngOnInit() {
  }

}
