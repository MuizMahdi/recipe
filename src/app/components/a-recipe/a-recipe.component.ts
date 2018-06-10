import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from './../../models/Recipe';

@Component({
  selector: 'app-a-recipe',
  templateUrl: './a-recipe.component.html',
  styleUrls: ['./a-recipe.component.css']
})


export class ARecipeComponent implements OnInit 
{ 

//---------------------------------------------------------------------------------------------------------------------------------//
  @Output() theRecipeSelected2 = new EventEmitter<Recipe>();
  @Input('recipeVal2') recipe2: Recipe;

  showMoreText: boolean = false; 
  shortText: boolean;

  fullDescription: string;
  miniDescription: string;
  imageSource: string;
//---------------------------------------------------------------------------------------------------------------------------------//

  constructor() { }

  ngOnInit() 
  { 
    this.setDefaultImageOnError();
  }

  ngAfterContentInit()
  {
    this.initShowMore();
  }

  initShowMore()
  {
    if(this.recipe2.description.length > 90) 
    {
      this.miniDescription = this.recipe2.description.slice(0,90) + "..."; //start sliced
      this.shortText = false; //view the "ShowMore"
    } 
    else 
    { 
      this.miniDescription = this.recipe2.description; 
      this.shortText = true; //dont view the "ShowMore"
    }
    
    this.fullDescription = this.recipe2.description;
    this.recipe2.description = this.miniDescription;
  }

  setDefaultImageOnError()
  { 
    if(this.recipe2.imagesrc.length > 5)
    {
      this.imageSource = this.recipe2.imagesrc;
    }
    else
    {
      this.imageSource = "https://cdn3.iconfinder.com/data/icons/food-and-ingredients/512/Food_and_Drinks_Fish_dish-01-512.png"
      this.recipe2.imagesrc = this.imageSource;
    }
  }

  getSelected2()
  {
    this.theRecipeSelected2.emit(this.recipe2);
  }

  showMore()
  {
    
    this.showMoreText = !this.showMoreText;

    if(this.showMoreText) 
    {
      this.recipe2.description = this.fullDescription;
      this.shortText = true; // hide the 'show more' after viewing full description (until page is left)
    } 
    
    if(!this.showMoreText)
    {
      this.recipe2.description = this.miniDescription;
    }

  }

}
