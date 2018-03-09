import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ARecipe } from '../../Models/ARecipe';
import { DataService } from '../../Services/data.service';
import { Observable } from 'rxjs/Observable';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})


export class RecipeDetailComponent implements OnInit, OnChanges
{

  @Input() aSelectedRecipe: ARecipe;
  changeDetect: ARecipe;

  recipeName: string;
  recipeImageSource: string;
  recipeDescription: string;

  /*******************************************************************************************/

  ngOnChanges(changes: SimpleChanges) 
  {
    for (let propName in changes) 
    {
      let chng = changes[propName];
      this.changeDetect = chng.currentValue;                 // RETURNS THE OBJECT IT SELF

      //this.theRecipe  = JSON.stringify(chng.currentValue);  // RETURNS A STRING OF THE OBJECT, NOT THE OBJECT IT SELF
      //let prev = JSON.stringify(chng.previousValue);
    }
      //console.log(changes);
    
      
    this.recipeName = this.changeDetect.name;
    this.recipeImageSource = this.changeDetect.imagesrc;
    this.recipeDescription = this.changeDetect.description;
    //console.log(this.changeDetect.name);
    
  }

  /*******************************************************************************************/

  /*******************************************************************************************/

  constructor(public dataService: DataService) { }

  ngOnInit() { }

}
