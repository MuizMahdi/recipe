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

  @Input('recipeVal') recipe: ARecipe;

  imageSource: string;
  imagesSources: string[] = [ "assets/R01.png", "assets/R02.png", "assets/R03.jpg", "assets/R04.jpg", "assets/R05.jpg", "assets/R06.jpg", "assets/R07.jpg", "assets/R08.jpg", "assets/R09.jpg" ];

  @Output() theRecipeSelected = new EventEmitter<ARecipe>();

  constructor(public dataService: DataService) { }

  ngOnInit() { this.imageSource = this.imagesSources[this.getRandomImage(0,8)] }
  getRandomImage(min:number, max:number){return Math.floor(Math.random() * (max-min + 1)) + min;}

  getSelected()
  {
    this.theRecipeSelected.emit(this.recipe);
    //all good it emits the right value
  }

}
