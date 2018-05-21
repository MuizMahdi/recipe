import { Subject } from 'rxjs/Subject';
import { ARecipeComponent } from './../a-recipe/a-recipe.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
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

  private ngUnsubscribe: Subject<any> = new Subject();

//-----------------------------------------------------------------------------------------------------------// 

//-----------------------------------------------------------------------------------------------------------// 
  
  constructor(db: AngularFireDatabase, public recipeDataService: RecipesDataService) 
  { }

//-----------------------------------------------------------------------------------------------------------// 


//-----------------------------------------------------------------------------------------------------------// 

  ngOnInit() 
  { 
    //this.recipes = this.dataService.getRecipes();
    window.scroll({top: 0, left: 0, behavior: 'smooth' });


    this.recipeDataService.getRecipesChanges().takeUntil(this.ngUnsubscribe).subscribe( val => {
      this.recipesDB = val;
    });
  }

//-----------------------------------------------------------------------------------------------------------// 

  
//-----------------------------------------------------------------------------------------------------------//

  /*addRecipe(recipe: ARecipe)
  {
    this.dataService.addRecipe(recipe);
  }*/

//-----------------------------------------------------------------------------------------------------------// 


//-----------------------------------------------------------------------------------------------------------// 

  /*setSelected(selectedRecipe: ARecipe)
  {
    this.dataService.selectedRecipe(selectedRecipe);
    this.theSelectedRecipe = selectedRecipe;
  }*/

  setSelected2(selectedRecipe: Recipe)
  {
    this.theSelectedRecipe = selectedRecipe;
  }

//-----------------------------------------------------------------------------------------------------------// 



  ngOnDestroy() 
  {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}