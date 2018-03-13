import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit 
{

  closeResult: string;


  formName: string;
  formDescription: string;
  formImageSource: string;

  constructor(private modalService: NgbModal, public dataService: DataService) { }


  open(content) 
  {
    this.modalService.open(content);

    // clear the forms when modal opens
    this.formName = "";
    this.formDescription = "";
    this.formImageSource = "";
  }

  
  ngOnInit() { }


  submitRecipe()
  {
    this.dataService.addRecipe({name:this.formName, description:this.formDescription, imagesrc:this.formImageSource});
    this.dataService.addMyRecipe({name:this.formName, description:this.formDescription, imagesrc:this.formImageSource});

    /*// clear the values after submitting
    this.formName = "";
    this.formDescription = "";
    this.formImageSource = "";*/
  }

}
