import { Recipe } from './../../models/Recipe';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.css']
})
export class RecipeModalComponent implements AfterViewInit, OnInit 
{

  @Input('selectedRecipe') theSelectedRecipe: Recipe;
  @Output() editingDataEmitter = new EventEmitter<any>();

  recipeIngredient: string;
  recipeIngredientAmount: string;
  formImageSource: string = null;
  recipeFormGroup: FormGroup;
  imageUrlError: boolean = false;
  recipeIngredientsArr: any[] = [];
  

  constructor(private formBuilder: FormBuilder, private changeDetectionRef : ChangeDetectorRef) 
  {
    this.buildForm();
  }


  ngOnInit() 
  { 
    this.fillFormFields();
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


  fillFormFields()
  {
    if(typeof this.theSelectedRecipe != 'undefined')
    {
      this.recipeFormGroup.get('recipeNameCtrl').setValue(this.theSelectedRecipe.name);
      this.recipeFormGroup.get('recipeDescriptionCtrl').setValue(this.theSelectedRecipe.description);
      
      this.formImageSource = this.theSelectedRecipe.imagesrc;

      if(typeof this.theSelectedRecipe.recipeIngredients != 'undefined')
      {
        this.recipeIngredientsArr = this.theSelectedRecipe.recipeIngredients.slice();
      }  
    }
    else 
    {
      this.resetFormFields();
    }

    this.changeDetectionRef.detectChanges(); //Prevents: ExpressionChangedAfterItHasBeenCheckedError, caused by change in the <img> src ngModel of formImageSource.
  }


  resetFormFields()
  {
    this.submitClicked = false;
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

  
  emitEditingData()
  {
    let editingData:any = {
      formGroup: this.recipeFormGroup,
      ingredientsArray: this.recipeIngredientsArr
    };

    this.editingDataEmitter.emit(editingData);
  }


  ngOnDestroy()
  {
    this.emitEditingData();
  }

}
