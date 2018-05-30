import { RecipeModalComponent } from './../components/recipe-modal/recipe-modal.component';
import { Injectable, wtfCreateScope } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Injectable()
export class ModalService
{

  public modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  openModal() 
  {
    this.modalRef = this.modalService.open(RecipeModalComponent);
  }

  closeModal() 
  {
    this.modalRef.close();
  }

}
