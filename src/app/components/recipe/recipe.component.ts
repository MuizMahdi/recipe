import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ARecipe } from '../../Models/ARecipe';
import { DataService } from '../../Services/data.service';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})


export class RecipeComponent implements OnInit 
{ 

//---------------------------------------------------------------------------------------------------------------------------------//
  @Input('recipeVal') recipe: ARecipe;
  @Input('locatorIDReceived') locatorIDString3: string;

  imageSource: string;
  imagesSources: string[] = [ "assets/R01.png", "assets/R02.png", "assets/R03.jpg", "assets/R04.jpg", "assets/R05.jpg", "assets/R06.jpg", "assets/R07.jpg", "assets/R08.jpg", "assets/R09.jpg" ];


  showMoreText: boolean = false; 
  fullDescription: string;
  miniDescription: string;
  shortText: boolean;

x
  @Output() theRecipeSelected = new EventEmitter<ARecipe>();

//---------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------//

  constructor(public dataService: DataService) { }

  ngOnInit() 
  { 
    this.randomizeImages(); 
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
    if(this.recipe.description.length > 90) 
    {
      this.miniDescription = this.recipe.description.slice(0,90) + "..."; //start sliced
      this.shortText = false; //view the "ShowMore"
    } 
    else 
    { 
      this.miniDescription = this.recipe.description; 
      this.shortText = true; //dont view the "ShowMore"
    }
    
    this.fullDescription = this.recipe.description;
    this.recipe.description = this.miniDescription;
  }

//---------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------//

  getRandomImage(min:number, max:number)
  {
    return Math.floor(Math.random() * (max-min + 1)) + min;
  }

//---------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------//

  randomizeImages()
  { 
    if(this.recipe.imagesrc.length > 5)
    {
      this.imageSource = this.recipe.imagesrc;
    }
    else
    {
      this.imageSource = this.imagesSources[this.getRandomImage(0,8)] 
      this.recipe.imagesrc = this.imageSource;
    }
  }

//---------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------//

  getSelected()
  {
    //send recipe with full description to view in details, so it wont view the sliced version.
    this.theRecipeSelected.emit({name: this.recipe.name, description: this.fullDescription, imagesrc:this.recipe.imagesrc});
  }

//---------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------//

  showMore()
  {
    
    this.showMoreText = !this.showMoreText;

    if(this.showMoreText) 
    {
      this.recipe.description = this.fullDescription;
      this.shortText = true; // hide the 'show more' after viewing full description (until page is left)
    } 
    
    if(!this.showMoreText)
    {
      this.recipe.description = this.miniDescription;
    }

  }

//---------------------------------------------------------------------------------------------------------------------------------//

}
