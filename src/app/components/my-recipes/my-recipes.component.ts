import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../Services/data.service';

import { ARecipe } from '../../models/ARecipe';



@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})



export class MyRecipesComponent implements OnInit 
{
  
  /*myRecipes: ARecipe[];
  theSelectedRecipe: ARecipe;
  recipeAdded: boolean = false;
  p: number = 1;*/


  ngOnInit() 
  {
    /*this.myRecipes = this.dataService.getMyRecipes();
    
    if(this.myRecipes.length > 0)
    {
      this.recipeAdded = true;
    }*/
  }

  /*setSelected(selectedRecipe: ARecipe)
  {
    this.dataService.selectedRecipe(selectedRecipe);
    this.theSelectedRecipe = selectedRecipe;  
  }*/

}