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


  @Output() theRecipeSelected = new EventEmitter<ARecipe>();

//---------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------//

  constructor(public dataService: DataService) {  }

  ngOnInit() 
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

  getSelected()
  {
    this.theRecipeSelected.emit(this.recipe);
  }

//---------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------//

  showMore()
  {
    this.showMoreText = !this.showMoreText;

    if(this.showMoreText) 
    {
      this.recipe.description = this.fullDescription;
    } 
    
    if(!this.showMoreText) 
    {
      this.recipe.description = this.miniDescription;
    }
  }

//---------------------------------------------------------------------------------------------------------------------------------//

}
