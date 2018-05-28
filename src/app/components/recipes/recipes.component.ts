import { AuthService } from './../../Services/auth.service';
import { Subject } from 'rxjs/Subject';
import { ARecipeComponent } from './../a-recipe/a-recipe.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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

  selectedRecipeImg: string = "";

  recipesDB: Recipe[];

  private modalRef: NgbModalRef;

  private ngUnsubscribe: Subject<any> = new Subject();

//-----------------------------------------------------------------------------------------------------------// 

//-----------------------------------------------------------------------------------------------------------// 
  
  constructor(
    private authService: AuthService, 
    public db: AngularFireDatabase, 
    public recipeDataService: RecipesDataService,
    private modalService: NgbModal) 
  { 
    this.authService.getAuth().subscribe(authState => {
      console.log("[RecipesComponent]: Current Authenticated User: " + authState.displayName);
    });
  }

//-----------------------------------------------------------------------------------------------------------// 


//-----------------------------------------------------------------------------------------------------------// 

  ngOnInit() 
  { 
    //this.recipes = this.dataService.getRecipes();

    this.recipeDataService.getRecipesChanges().takeUntil(this.ngUnsubscribe).subscribe( val => {
      this.recipesDB = val;

      /*
      for(let i=0; i<val.length; i++)
      {
        this.recipesDB.unshift(val[i]);
      }
      */
    });
  } 

//-----------------------------------------------------------------------------------------------------------// 

  
//-----------------------------------------------------------------------------------------------------------//

  /*addRecipe(recipe: ARecipe)
  {
    this.dataService.addRecipe(recipe);
  }*/

  
  open(content) 
  {
    this.modalRef = this.modalService.open(content, {size: 'lg'});
  }

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
    this.selectedRecipeImg = this.theSelectedRecipe.imagesrc;
    console.log(this.selectedRecipeImg);
  }

//-----------------------------------------------------------------------------------------------------------// 



  ngOnDestroy() 
  {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}