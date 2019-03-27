import { RecipesDataService } from './../../Services/recipesData.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from './../../models/Recipe';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})


export class RecipesComponent implements OnInit 
{
  theSelectedRecipe:Recipe;
  recipes:Recipe[];

  showRecipeModal:boolean = false;
  selectedRecipeImg:string = "";
  pageNum:number = 1;
  

   constructor(private recipesDataService:RecipesDataService, public afAuth:AngularFireAuth) 
   { }


   ngOnInit() 
   {
      // Get recipies on initialization
      this.getRecipes();
   } 

  
   getRecipes()
   {
      // Receive real-time updates of recipes
      this.recipesDataService.getRecipesChanges().subscribe(recipesResponse => {
         // Get recipes by addition order (first added to last added)
         this.recipes = recipesResponse.reverse();
      });
   }


   getModalState(event: boolean)
   {
      if(event) {
         this.showRecipeModal = false;
      } 
      else {
         this.showRecipeModal = true;
      }
   }


   // On recipe selection
   setSelected(selectedRecipe: Recipe)
   {
      // Show recipe details modal
      this.showRecipeModal = true;

      // Set the selected recipe
      this.theSelectedRecipe = selectedRecipe;

      // Get the selected recipe image
      this.selectedRecipeImg = this.theSelectedRecipe.imagesrc;
   }

}