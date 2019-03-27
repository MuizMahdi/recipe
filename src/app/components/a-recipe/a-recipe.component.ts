import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from './../../models/Recipe';


@Component({
   selector: 'app-a-recipe',
   templateUrl: './a-recipe.component.html',
   styleUrls: ['./a-recipe.component.css']
})


export class ARecipeComponent implements OnInit 
{ 
   @Output() selectedRecipe = new EventEmitter<Recipe>();
   @Input('recipe') recipe:Recipe;

   showMoreText: boolean = false; 
   shortText: boolean;

   fullDescription: string;
   miniDescription: string;
   imageSource: string;


   constructor() 
   { }


   ngOnInit() 
   { 
      this.setDefaultImageOnError();
   }


   ngAfterContentInit()
   {
      // Set the length of recipe description text to be viewed before hiding it and adding 'ShowMore' 
      this.initShowMore();
   }


   initShowMore()
   {
      // If the description is more than 90 characters long
      if(this.recipe.description.length > 90) 
      {
         // Construct minified description of 90 characters
         this.miniDescription = this.recipe.description.slice(0,90) + "..."; //start sliced
         // View the "ShowMore"
         this.shortText = false; 
      } 
      else 
      {
         // No limited description if its 90 characters or fewer
         this.miniDescription = this.recipe.description;
         // Dont view the "ShowMore" 
         this.shortText = true; 
      }
      
      this.fullDescription = this.recipe.description;
      this.recipe.description = this.miniDescription;
   }


   setDefaultImageOnError()
   { 
      // Validate recipe image source
      if(this.recipe.imagesrc.length > 5) 
      {
         this.imageSource = this.recipe.imagesrc;
      }
      else 
      {
         // Use a template recipe image in case an invalid image source is posted
         this.imageSource = "https://cdn3.iconfinder.com/data/icons/food-and-ingredients/512/Food_and_Drinks_Fish_dish-01-512.png"
         this.recipe.imagesrc = this.imageSource;
      }
   }


   setSelected()
   {
      // Set current recipe as selected recipe and emit it to recipes component 
      this.selectedRecipe.emit(this.recipe);
   }


   showMore()
   {
      // Toggle showing full description
      this.showMoreText = !this.showMoreText;

      // When showing full text
      if(this.showMoreText)
      {
         // Set the recipe's description as the full description
         this.recipe.description = this.fullDescription;

         // hide the 'show more' after viewing full description
         this.shortText = true;
      }
      else
      {  // When hiding full text
         // Set the recipe's description as the minified short description
         this.recipe.description = this.miniDescription;
      }
   }
}
