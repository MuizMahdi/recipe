import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';


/********/

//Declarations
import { DataService } from './../../Services/data.service';
import { RecipesDataService } from './../../Services/recipesData.service';
import { environment } from './../../../environments/environment.prod';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './../../Services/auth.service';
import { RecipeDetailComponent } from './../recipe-detail/recipe-detail.component';
import { RecipesComponent } from './../recipes/recipes.component';
import { ARecipeComponent } from './../a-recipe/a-recipe.component';
import { CommentComponent } from './../comment/comment.component';

//Imports
import { ReactiveFormsModule } from '@angular/forms';
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
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent, RecipesComponent, RecipeDetailComponent, ARecipeComponent, CommentComponent ],
      
      imports: [ ReactiveFormsModule, MatAutocompleteModule, NgcFloatButtonModule, NgxPaginationModule, RouterModule, FormsModule, AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule, RouterTestingModule, NgbModule.forRoot() ],

      providers: [ AuthService, RecipesDataService, DataService ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
