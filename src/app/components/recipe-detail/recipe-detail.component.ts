import { Component, OnInit, Input } from '@angular/core';
import { ARecipe } from '../../Models/ARecipe';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit 
{

  @Input('selectedRecipe') Recipe: ARecipe;
  //@Input('selectedRecipeImgSrc') selectedImgSrc: string;

  recipeName: string;

  recipe: ARecipe;
  
  constructor(public dataService: DataService) { console.log("FUC"); }

  ngOnInit() 
  { 
    //this.recipe = this.dataService.getRecipe();
    //console.log(this.recipe);

    
  }

}
