import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/Recipe';



@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.css']
})


export class RecipeModalComponent implements OnInit 
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
