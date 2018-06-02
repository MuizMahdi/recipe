import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RecipesDataService } from './../../Services/recipesData.service';
import { AuthService } from './../../Services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ISubscription } from 'rxjs/Subscription';
import { Comment } from './../../models/Comment';
import { Recipe } from './../../models/Recipe';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.css']
})


export class RecipeModalComponent implements OnInit 
{
  private editingSubscription: ISubscription;
  private routerSubscription: ISubscription; 
  private modalRef: NgbModalRef;
  recipeFormGroup: FormGroup;

  @Output() modalCloseEventEmitter = new EventEmitter<boolean>();
  @Output() editingDataEmitter = new EventEmitter<any>();
  @Input('selectedRecipe') theSelectedRecipe: Recipe;
  @ViewChild('content') modal: ElementRef;

  recipeIngredientAmount: string;
  formImageSource: string = null;
  recipeIngredient: string;
  modalTitle: string;
  
  isAuthenticatedUserRecipe: boolean = false;
  isEditingRecipe: boolean = false;
  imageUrlError: boolean = false;
  submitClicked: boolean = false;
  
  recipeComments: Comment[] = [{comment:"", commenter:"", commenterPhotoURL:""}];
  recipeIngredientsArr: any[] = [];
  recipeUpvoters: string[] = [""];
  
  
  constructor(
    private changeDetectionRef : ChangeDetectorRef,
    private recipesDataService: RecipesDataService,
    private ngFireDB: AngularFireDatabase,
    private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private router: Router) 
  {
    this.buildForm();
  }

  ngOnInit() 
  { 
    this.fillFormFields();
    this.checkIfUserRecipe();
    this.onRouteChange();
  }

  ngAfterViewInit() 
  { 
    setTimeout(()=> {
      this.open(this.modal);
    }, 0);
  }

  open(content) 
  {
    if(typeof this.theSelectedRecipe != 'undefined')
    {
      this.isEditingRecipe = false;
      this.modalTitle = "Edit Recipe";
    }
    else {
      this.isEditingRecipe = true;
      this.modalTitle = "Add Recipe";
    }
    
    this.submitClicked = false;
    this.modalRef = this.modalService.open(content, {size: 'lg'});
    this.modalRef.result.then((result) => {}, (reason) => { this.emitModalClose(); });
  }
 
  buildForm()
  {
    this.recipeFormGroup = new FormGroup({
      recipeNameCtrl: new FormControl(null, [Validators.required]),
      recipeDescriptionCtrl: new FormControl(null, []),
      recipeImageUrlCtrl: new FormControl(null, [Validators.required]),
      anIngredientCtrl: new FormControl(null, []),
      anIngredientAmountCtrl: new FormControl(null, [])
    });
  }

  checkIfUserRecipe() 
  {
    if(typeof this.theSelectedRecipe != 'undefined')
    {
      this.authService.getAuth().subscribe(authState => {
        if(authState.displayName === this.theSelectedRecipe.makerName) {
          this.isAuthenticatedUserRecipe = true;
  
        } else {
          this.isAuthenticatedUserRecipe = false;
        }
      });
    }
  }

  fillFormFields()
  {
    if(typeof this.theSelectedRecipe != 'undefined') {
      this.recipeFormGroup.get('recipeNameCtrl').setValue(this.theSelectedRecipe.name);
      this.recipeFormGroup.get('recipeDescriptionCtrl').setValue(this.theSelectedRecipe.description);
      
      this.formImageSource = this.theSelectedRecipe.imagesrc;

      if(typeof this.theSelectedRecipe.recipeIngredients != 'undefined') {
        this.recipeIngredientsArr = this.theSelectedRecipe.recipeIngredients.slice();
      } 
       
    } else {
      this.resetFormFields();
    }

    this.changeDetectionRef.detectChanges();
  }

  resetFormFields()
  {
    this.recipeFormGroup.get('recipeNameCtrl').reset(null);
    this.recipeFormGroup.get('recipeDescriptionCtrl').reset(null);
    this.recipeFormGroup.get('recipeImageUrlCtrl').reset(null);
    this.recipeFormGroup.get('anIngredientCtrl').reset(null);
    this.recipeFormGroup.get('anIngredientAmountCtrl').reset(null);
    this.recipeIngredientsArr = [];
    this.formImageSource = null;
  }

  onImageUrlError() 
  { 
    this.imageUrlError = true; 
  }

  onNoImageUrlError() 
  { 
    this.imageUrlError = false; 
  }

  addIngredient()
  {
    this.recipeIngredient = this.recipeFormGroup.get('anIngredientCtrl').value;
    this.recipeIngredientAmount = this.recipeFormGroup.get('anIngredientAmountCtrl').value;

    this.recipeIngredientsArr.push({name:this.recipeIngredient, amount:this.recipeIngredientAmount});
  }

  onRecipeDelete()
  {
    this.modalRef.close();
    this.emitModalClose();
    this.recipesDataService.deleteRecipe(this.theSelectedRecipe);
  }

  onRecipeEdit()
  {
    this.isEditingRecipe = true;
  }

  closeModal(event:boolean)
  {
    if(event) {
      this.modalRef.close();
      this.emitModalClose();
    } 
  }

  onEditingCancel()
  {
    this.isEditingRecipe = false;
  }

  onEditingSubmit()
  {
    this.submitClicked = true;
    this.modalRef.close();
    this.emitModalClose();
    
    if(typeof this.theSelectedRecipe != 'undefined')
    {
      this.applyRecipeEdits();

    } else {

      this.addRecipe();
    }

  }
  
  applyRecipeEdits()
  {
    this.unSubscribeAll();
    
    let editingData:any = {
      formGroup: this.recipeFormGroup,
      ingredientsArray: this.recipeIngredientsArr
    }

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

  addRecipe()
  {
    let recipeName = this.recipeFormGroup.get('recipeNameCtrl').value;
    let recipeDescription = this.recipeFormGroup.get('recipeDescriptionCtrl').value;
    let recipeImageUrl = this.recipeFormGroup.get('recipeImageUrlCtrl').value;
    
    this.authService.getAuth().subscribe(authState => {
      
      let addingData = {
        RID: authState.uid,
        name: recipeName,
        makerName: authState.displayName,
        description: recipeDescription,
        imagesrc: recipeImageUrl,
        comments: this.recipeComments,
        recipeIngredients: this.recipeIngredientsArr,
        upvoters: this.recipeUpvoters,
        upvotes: 0,
        upvoted: false
      }

      if(this.recipeFormGroup.valid) {
        this.recipesDataService.addRecipe(addingData);
      }

    });
  
  }

  onRouteChange()
  {
    this.routerSubscription = this.router.events.subscribe(route => {
      this.modalRef.dismiss();   
    });
  }

  emitModalClose()
  {
    this.modalCloseEventEmitter.emit(true);
  }

  unSubscribeAll()
  {
    if(typeof this.editingSubscription != 'undefined') {
      this.editingSubscription.unsubscribe();
    }

    this.routerSubscription.unsubscribe();
  }

  ngOnDestroy()
  {
    this.modalRef.close();
  }
}
