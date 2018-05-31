import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/Recipe';



@Component({
  selector: 'app-recipe-details-modal',
  templateUrl: './recipe-details-modal.component.html',
  styleUrls: ['./recipe-details-modal.component.css']
})


export class RecipeDetailsModalComponent implements OnInit 
{

  @Input('selectedRecipe') theSelectedRecipe: Recipe;
  selectedRecipeImg: string = "";

  
  constructor() { }

  ngOnInit() { }

  ngOnChanges()
  {
    this.selectedRecipeImg = this.theSelectedRecipe.imagesrc;
  }

}
