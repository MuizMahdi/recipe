import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { RecipesDataService } from './../../Services/recipesData.service';
import { ARecipeComponent } from './../a-recipe/a-recipe.component';
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
  
  private editingSubscription: ISubscription; 
  private routerSubscription: ISubscription; 
  private modalRef: NgbModalRef;

  recipeEditForm: FormGroup;

  isAuthenticatedUserRecipe: boolean = false;
  isEditingRecipe: boolean = false;
  submitClicked: boolean = false;

  theSelectedRecipe: Recipe;
  recipeDBTest: Recipe[];
  recipesDB: Recipe[];

  selectedRecipeImg: string = "";
  p: number = 1;

//-----------------------------------------------------------------------------------------------------------// 

//-----------------------------------------------------------------------------------------------------------// 
  
  constructor(
    private recipesDataService: RecipesDataService,
    private formBuilder: FormBuilder,
    private authService: AuthService, 
    private ngFireDB: AngularFireDatabase, 
    private modalService: NgbModal,
    private router: Router) 
  {
    this.buildForm();
  }


  buildForm()
  {
    this.recipeEditForm = new FormGroup({
      nameCtrl: new FormControl(null, [Validators.required]),
      descriptionCtrl: new FormControl(null, []),
      imageUrlCtrl: new FormControl(null, [Validators.required]),
      anIngredientCtrl: new FormControl(null, []),
      anIngredientAmountCtrl: new FormControl(null, [])
    })
  }

//-----------------------------------------------------------------------------------------------------------// 


//-----------------------------------------------------------------------------------------------------------// 

  ngOnInit() 
  { 
    this.recipesDataService.getRecipesChanges().subscribe( recipes => {
      this.recipesDB = recipes.reverse();
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
    this.isEditingRecipe = false;
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
    this.recipesDataService.deleteRecipe(this.theSelectedRecipe);
    this.modalRef.dismiss();
  }

//-----------------------------------------------------------------------------------------------------------// 


//-----------------------------------------------------------------------------------------------------------//

  onRecipeEdit()
  {
    // Replace recipe details in the recipe modal to the editing fields
    this.isEditingRecipe = true;
  }

  onEditingCancel()
  {
    this.isEditingRecipe = false;
  }

  onEditingSubmit()
  {
    this.isEditingRecipe = false;
    this.modalRef.dismiss(); // Modal dismissal causes the recipe-modal component to emit the form group(with edited fields), which is received in updateRecipe()
  }

  updateRecipe(editingData: any)
  {
    
    let recipeList = this.ngFireDB.list<any>('/recipes', ref => ref.orderByChild('name').equalTo(this.theSelectedRecipe.name));

    this.editingSubscription = this.recipesDataService.getDbListObject(recipeList).subscribe(recipes => {
      recipeList.update(recipes[0].key, {

        name: editingData.formGroup.get('recipeNameCtrl').value,
        description: editingData.formGroup.get('recipeDescriptionCtrl').value,
        imagesrc: editingData.formGroup.get('recipeImageUrlCtrl').value,
        recipeIngredients: editingData.ingredientsArray

      });
    });
    
  }

//-----------------------------------------------------------------------------------------------------------//


//-----------------------------------------------------------------------------------------------------------//

  ngOnDestroy() 
  {
    this.routerSubscription.unsubscribe();
    this.editingSubscription.unsubscribe();
  }

//-----------------------------------------------------------------------------------------------------------// 

}