import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../models/Recipe';

@Component({
  selector: 'app-recipe-details-modal',
  templateUrl: './recipe-details-modal.component.html',
  styleUrls: ['./recipe-details-modal.component.css']
})


export class RecipeDetailsModalComponent implements OnInit 
{
  @Output() modalCloseEventEmitter = new EventEmitter<boolean>();
  @Input('selectedRecipe') theSelectedRecipe: Recipe;
  selectedRecipeImg: string = "";

  constructor() { }

  ngOnInit() { }


  ngOnChanges()
  {
    this.selectedRecipeImg = this.theSelectedRecipe.imagesrc;
  }

  closeModal()
  {
    this.modalCloseEventEmitter.emit(true);
  }

}
