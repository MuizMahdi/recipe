import { Recipe } from './../../models/Recipe';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment.prod';
import { CommentComponent } from './../comment/comment.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DataService } from './../../Services/data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipesDataService } from './../../Services/recipesData.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from './../../Services/auth.service';
import { SimpleChanges, SimpleChange } from '@angular/core';
import { OnChanges } from '@angular/core';


import { RecipeDetailComponent } from './recipe-detail.component';

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let service: AuthService;
  let recipeService: RecipesDataService;
  let fixture: ComponentFixture<RecipeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailComponent, CommentComponent ],
      imports: [ ReactiveFormsModule, FormsModule, RouterTestingModule, AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule ],
      providers: [ DataService, RecipesDataService, AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = new AuthService(null);
    recipeService = new RecipesDataService(null,null);
    component = new RecipeDetailComponent(null,recipeService,service,null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should check and validate user profile photo', () => {

    let sAuthState = {photoURL: "mockURL"};
    let authSpy = spyOn(service, 'getAuth').and.returnValue(Observable.of(sAuthState));

    component.checkUserProfilePhoto();

    expect(authSpy).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      service.getAuth().subscribe(authState => {
        expect(authState).toBe(sAuthState);
        expect(component.commentingProfileImage).toBe(authState.photoURL);
      });
    });

  });



  it('should monitor the number of comments', () => {
    component.onShowMoreComments();
    expect(component.lotsOfComments).toBeFalsy();
  });



});
