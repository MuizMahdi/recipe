import { ARecipeComponent } from './../a-recipe/a-recipe.component';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';

import { ARecipe } from '../../models/ARecipe';
import { Recipe } from './../../models/Recipe';


import { AngularFireDatabase } from 'angularfire2/database';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Client } from './../../models/clients';
import { RecipesDataService } from './../../Services/recipesData.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit 
{

//-----------------------------------------------------------------------------------------------------------// 
  
  recipes: ARecipe[];
  theSelectedRecipe: Recipe;
  p: number = 1;

  recipesDB: Recipe[];

//-----------------------------------------------------------------------------------------------------------// 

//-----------------------------------------------------------------------------------------------------------// 
  
  constructor(public dataService: DataService, db: AngularFireDatabase, public recipeDataService: RecipesDataService) 
  { }

//-----------------------------------------------------------------------------------------------------------// 



// THIS IS AS FAR AS IT GOES, I CAN ONLY USE 'recipesDB' INSIDE THE SUBSCRIBE SCOPE AND VIEW IT ON TEMPLATE.
//-----------------------------------------------------------------------------------------------------------// 

  ngOnInit() 
  { 
    this.recipes = this.dataService.getRecipes();
    window.scroll({top: 0, left: 0, behavior: 'smooth' });


    this.recipeDataService.getRecipesChanges().subscribe( val => {
      this.recipesDB = val;
      console.log(this.recipesDB);
    });
  }

//-----------------------------------------------------------------------------------------------------------// 

  
//-----------------------------------------------------------------------------------------------------------//

  addRecipe(recipe: ARecipe)
  {
    this.dataService.addRecipe(recipe);
  }

//-----------------------------------------------------------------------------------------------------------// 



//-----------------------------------------------------------------------------------------------------------// 

  /*setSelected(selectedRecipe: ARecipe)
  {
    this.dataService.selectedRecipe(selectedRecipe);
    this.theSelectedRecipe = selectedRecipe;

    //console.log(this.theSelectedRecipe);
    // it receices the right recipe when clicking all good !

    //this.dataService.selectedRecipe(this.theSelectedRecipe);
    //console.log("selected recipe passed to data service")
  }*/

  setSelected2(selectedRecipe: Recipe)
  {
    this.theSelectedRecipe = selectedRecipe;
  }

//-----------------------------------------------------------------------------------------------------------// 

}