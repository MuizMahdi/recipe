import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ARecipe } from '../../models/ARecipe';
import { Recipe } from './../../models/Recipe';

@Component({
  selector: 'app-a-recipe',
  templateUrl: './a-recipe.component.html',
  styleUrls: ['./a-recipe.component.css']
})


export class ARecipeComponent implements OnInit 
{ 

//---------------------------------------------------------------------------------------------------------------------------------//
  @Input('recipeVal') recipe: ARecipe;
  @Input('recipeVal2') recipe2: Recipe;

  @Input('locatorIDReceived') locatorIDString3: string;
  imageSource: string;
  imagesSources: string[] = [ "assets/R01.png", "assets/R02.png", "assets/R03.jpg", "assets/R04.jpg", "assets/R05.jpg", "assets/R06.jpg", "assets/R07.jpg", "assets/R08.jpg", "assets/R09.jpg" ];


  showMoreText: boolean = false; 
  fullDescription: string;
  miniDescription: string;
  shortText: boolean;

  @Output() theRecipeSelected = new EventEmitter<ARecipe>();
  @Output() theRecipeSelected2 = new EventEmitter<Recipe>();

//---------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------//

  constructor(/*public dataService: DataService*/) { 
    /*this.recipe2 = {
      RID: "",
      name: "",
      makerName: "",
      description: "",
      imagesrc: "",
      upvotes: 0,
      upvoted: false,
      recipeIngredients: [],
      comments: [],
      upvoters: []
    };*/
  }

  ngOnInit() 
  { 
    this.randomizeImages();

    /*this.recipe2 = {
      RID: "",
      name: "",
      makerName: "",
      description: "",
      imagesrc: "",
      upvotes: 0,
      upvoted: false,
      recipeIngredients: [],
      comments: [],
      upvoters: []
    };*/
  }

//---------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------//

  ngAfterContentInit()
  {
    // reset the 'show more', showing it, and viewing the miniDescription every time the page is left and opened again.
    this.initShowMore();
  }

//---------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------//

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

//---------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------//
/*
  getRandomImage(min:number, max:number)
  {
    return Math.floor(Math.random() * (max-min + 1)) + min;
  }
*/
//---------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------//

  randomizeImages()
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

//---------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------//

  getSelected()
  {
    this.theRecipeSelected.emit({name: this.recipe.name, description: this.fullDescription, imagesrc: this.recipe.imagesrc, upvotes: this.recipe.upvotes, ingredients: this.recipe.ingredients, amounts: this.recipe.amounts, upvoted: this.recipe.upvoted, comments: this.recipe.comments});
  }

  getSelected2()
  {
    this.theRecipeSelected2.emit(this.recipe2);

    //window.scroll({top: 0, left: 0, behavior: 'smooth' }); // scroll to top of page with smooth animation.
  }

//---------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------//

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

//---------------------------------------------------------------------------------------------------------------------------------//

}
