import { Observable } from 'rxjs/Observable';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';


/********/

//Declarations
import { RecipesDataService } from './../../Services/recipesData.service';
import { environment } from './../../../environments/environment.prod';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './../../Services/auth.service';
import { RecipeDetailComponent } from './../recipe-detail/recipe-detail.component';
import { RecipesComponent } from './../recipes/recipes.component';
import { ARecipeComponent } from './../a-recipe/a-recipe.component';
import { CommentComponent } from './../comment/comment.component';

//Imports
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgcFloatButtonModule } from 'ngc-float-button';
import{ FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

/********/

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let service: AuthService;
  let recipeService: RecipesDataService;
  let fixture: ComponentFixture<NavbarComponent>;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent, RecipesComponent, RecipeDetailComponent, ARecipeComponent, CommentComponent ],
      
      imports: [ ReactiveFormsModule, MatAutocompleteModule, NgcFloatButtonModule, NgxPaginationModule, RouterModule, FormsModule, AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule, RouterTestingModule, NgbModule.forRoot() ],

      providers: [ AuthService, RecipesDataService ]
      
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = new AuthService(null);
    recipeService = new RecipesDataService(null,null);
    component = new NavbarComponent(recipeService,null,new FormBuilder,null,null);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
  it('should create the recipe adding modal form with 5 controls', () => {
    component.buildForm();
    expect(component.recipeAddFormGroup.contains('recipeNameCtrl')).toBeTruthy();
    expect(component.recipeAddFormGroup.contains('recipeDescriptionCtrl')).toBeTruthy();
    expect(component.recipeAddFormGroup.contains('recipeImageUrlCtrl')).toBeTruthy();
    expect(component.recipeAddFormGroup.contains('anIngredientCtrl')).toBeTruthy();
    expect(component.recipeAddFormGroup.contains('anIngredientAmountCtrl')).toBeTruthy();
  });
  */

  it('should logout user', () => {
    let logoutAuth = spyOn(service, 'logout');
    component.onLogout();
    expect(logoutAuth).toHaveBeenCalled();
  });


  /*
  it('should reset recipe adding form field when it opens', () => {
    component.resetFormFields();
    expect(component.submitClicked).toBeFalsy();
    expect(component.recipeAddFormGroup.get('recipeNameCtrl').value).toBe(null);
    expect(component.recipeAddFormGroup.get('recipeDescriptionCtrl').value).toBe(null);
    expect(component.recipeAddFormGroup.get('recipeImageUrlCtrl').value).toBe(null);
    expect(component.recipeAddFormGroup.get('anIngredientCtrl').value).toBe(null);
    expect(component.recipeAddFormGroup.get('anIngredientAmountCtrl').value).toBe(null);
    expect(component.formImageSource).toBe(null);
  });
  */

  /*
  it('should add ingredient on the button click', () => {
    component.addIngredient();
    expect(component.recipeIngredient).toBe(component.recipeAddFormGroup.get('anIngredientCtrl').value);
    expect(component.recipeIngredientAmount).toBe(component.recipeAddFormGroup.get('anIngredientAmountCtrl').value);
    expect(component.recipeIngredientsArr.length).toBeGreaterThan(0);
  });
  */

  /*
  it('should submit recipe', () => {

    let authState = {uid: 'uid', displayName: 'name'};
    let authSpy = spyOn(service, 'getAuth').and.returnValue(Observable.of(authState));
    let resetFormSpy = spyOn(component, 'resetFormFields');

    component.onRecipeSubmit();

    expect(component.recipeName).toBe(component.recipeAddFormGroup.get('recipeNameCtrl').value);
    expect(component.recipeDescription).toBe(component.recipeAddFormGroup.get('recipeDescriptionCtrl').value);
    expect(component.recipeImageUrl).toBe(component.recipeAddFormGroup.get('recipeImageUrlCtrl').value);
    expect(authSpy).toHaveBeenCalled();

    service.getAuth().subscribe(authStateo => {
      expect(authState).toBe(authState);
    });

    fixture.whenStable().then(() => {
      expect(resetFormSpy).toHaveBeenCalled();
    });

  });
  */
  /*
  it('should catch recipe image error', () => {
    component.onImageUrlError();
    expect(component.imageUrlError).toBeTruthy();

    component.onNoImageUrlError();
    expect(component.imageUrlError).toBeFalsy();
  });
  */

});
