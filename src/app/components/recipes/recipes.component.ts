import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { RecipesDataService } from './../../Services/recipesData.service';
import { ARecipeComponent } from './../a-recipe/a-recipe.component';
import { ModalService } from './../../Services/modal.service';
import { AuthService } from './../../Services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ISubscription } from 'rxjs/Subscription';
import { Recipe } from './../../models/Recipe';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit 
{

//-----------------------------------------------------------------------------------------------------------// 
  
  private routerSubscription: ISubscription; 
  isAuthenticatedUserRecipe: boolean = false;
  selectedRecipeImg: string = "";
  public modalRef: NgbModalRef;
  theSelectedRecipe: Recipe;
  recipesDB: Recipe[];
  p: number = 1;

//-----------------------------------------------------------------------------------------------------------// 

//-----------------------------------------------------------------------------------------------------------// 
  
  constructor(
    public recipeDataService: RecipesDataService,
    private recipeModalService: ModalService,
    private authService: AuthService, 
    public db: AngularFireDatabase, 
    private modalService: NgbModal,
    private router: Router) 
  {}

//-----------------------------------------------------------------------------------------------------------// 


//-----------------------------------------------------------------------------------------------------------// 

  ngOnInit() 
  { 
    this.recipeDataService.getRecipesChanges().subscribe( val => {
      this.recipesDB = val;

      /*
      for(let i=0; i<val.length; i++)
      {
        this.recipesDB.unshift(val[i]);
      }
      */
    });

    this.onRouteChange();
  } 

//-----------------------------------------------------------------------------------------------------------// 


//-----------------------------------------------------------------------------------------------------------// 

  onRouteChange()
  {
    this.routerSubscription = this.router.events.subscribe(route => {
      this.modalRef.dismiss();   
    });
  }

//-----------------------------------------------------------------------------------------------------------// 

  
//-----------------------------------------------------------------------------------------------------------//
  
  open(content) 
  {
    this.modalRef = this.modalService.open(content, {size: 'lg'});
  }

//-----------------------------------------------------------------------------------------------------------// 


//-----------------------------------------------------------------------------------------------------------// 

  setSelected(selectedRecipe: Recipe)
  {
    this.theSelectedRecipe = selectedRecipe;
    this.selectedRecipeImg = this.theSelectedRecipe.imagesrc;
    this.checkIfUserRecipe();
  }

//-----------------------------------------------------------------------------------------------------------// 


//-----------------------------------------------------------------------------------------------------------//

  checkIfUserRecipe() 
  {
    this.authService.getAuth().subscribe(authState => {
      if(authState.displayName === this.theSelectedRecipe.makerName) 
      {
        this.isAuthenticatedUserRecipe = true;
      }
      else 
      {
        this.isAuthenticatedUserRecipe = false;
      }
    });
  }

//-----------------------------------------------------------------------------------------------------------//


//-----------------------------------------------------------------------------------------------------------//

  onRecipeDelete()
  {
    this.recipeDataService.deleteRecipe(this.theSelectedRecipe);
    this.modalRef.dismiss();
  }

//-----------------------------------------------------------------------------------------------------------// 


//-----------------------------------------------------------------------------------------------------------//

  onRecipeEdit()
  {
    
  }

//-----------------------------------------------------------------------------------------------------------//


//-----------------------------------------------------------------------------------------------------------//

  ngOnDestroy() 
  {
    this.routerSubscription.unsubscribe();
  }

//-----------------------------------------------------------------------------------------------------------// 

}