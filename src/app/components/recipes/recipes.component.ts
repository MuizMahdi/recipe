import { ARecipeComponent } from './../a-recipe/a-recipe.component';
//import { BookmarksComponent } from './../bookmarks/bookmarks.component';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';

//import { RecipeComponent } from '../recipe/recipe.component';
import { ARecipe } from '../../models/ARecipe';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})


export class RecipesComponent implements OnInit 
{

  recipes: ARecipe[];
  theSelectedRecipe: ARecipe;
  p: number = 1;

  constructor(public dataService: DataService) 
  { }

  ngOnInit() 
  { 
    this.recipes = this.dataService.getRecipes();
  }

  addRecipe(recipe: ARecipe)
  {
    this.dataService.addRecipe(recipe);
  }


  setSelected(selectedRecipe: ARecipe)
  {
    this.dataService.selectedRecipe(selectedRecipe);
    this.theSelectedRecipe = selectedRecipe;

    console.log(this.theSelectedRecipe);
    // it receices the right recipe when clicking all good !

    //this.dataService.selectedRecipe(this.theSelectedRecipe);
    //console.log("selected recipe passed to data service")
    
  }

}