import { ISubscription } from 'rxjs/Subscription';
import { AuthService } from './../../Services/auth.service';
import { Subject } from 'rxjs/Subject';
import { ARecipeComponent } from './../a-recipe/a-recipe.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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
  isAuthenticatedUserRecipe: boolean = false;

  recipesDB: Recipe[];

  private modalRef: NgbModalRef;

  private ngUnsubscribe: Subject<any> = new Subject();
  private routerSubscription: ISubscription;


//-----------------------------------------------------------------------------------------------------------// 

//-----------------------------------------------------------------------------------------------------------// 
  
  constructor(
    private authService: AuthService, 
    public db: AngularFireDatabase, 
    public recipeDataService: RecipesDataService,
    private modalService: NgbModal,
    private router: Router) 
  {   }

//-----------------------------------------------------------------------------------------------------------// 

  onRouteChange()
  {
    this.routerSubscription = this.router.events.subscribe(route => {
      this.modalRef.dismiss();   
    });
  }


//-----------------------------------------------------------------------------------------------------------// 

  ngOnInit() 
  { 
    this.recipeDataService.getRecipesChanges().takeUntil(this.ngUnsubscribe).subscribe( val => {
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
  
  open(content) 
  {
    this.modalRef = this.modalService.open(content, {size: 'lg'});
  }

//-----------------------------------------------------------------------------------------------------------// 


//-----------------------------------------------------------------------------------------------------------// 

  setSelected2(selectedRecipe: Recipe)
  {
    this.theSelectedRecipe = selectedRecipe;
    this.selectedRecipeImg = this.theSelectedRecipe.imagesrc;
    this.checkIfUserRecipe();
  }

//-----------------------------------------------------------------------------------------------------------// 


//-----------------------------------------------------------------------------------------------------------//

  ngOnDestroy() 
  {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.routerSubscription.unsubscribe();
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

}