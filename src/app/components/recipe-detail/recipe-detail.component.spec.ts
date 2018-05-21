import { Recipe } from './../../models/Recipe';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment.prod';
import { CommentComponent } from './../comment/comment.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipesDataService } from './../../Services/recipesData.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../../Services/auth.service';
import { SimpleChanges, SimpleChange } from '@angular/core';
import { OnChanges } from '@angular/core';



import { RecipeDetailComponent } from './recipe-detail.component';

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let service: AuthService;
  let recipeService: RecipesDataService;
  let ngFireDB: AngularFireDatabase;
  let fixture: ComponentFixture<RecipeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailComponent, CommentComponent ],
      imports: [ ReactiveFormsModule, FormsModule, RouterTestingModule, AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule ],
      providers: [ RecipesDataService, AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = new AuthService(null);
    recipeService = new RecipesDataService(null,null);
    component = new RecipeDetailComponent(recipeService,service,ngFireDB);
    //ngFireDB = new AngularFireDatabase(null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*******************************************************************************************/

  let changes: SimpleChanges;


  it('should detect changes and subtract recipe comments array by 1 when the first element is: "" ', () => {

    let changeDetectMock = {
      RID: "RID",
      name: "name",
      makerName: "maker",
      description: "description",
      imagesrc: "src",
      upvotes: 0,
      upvoted: false,
      recipeIngredients: ['ingredient'],
      comments: ["", 'comment', 'another', 'comment'],
      upvoters: ['none']
    }

    component.changeDetect = changeDetectMock;

    component.ngOnChanges(null);

    fixture.detectChanges();
    component.recipeComments = changeDetectMock.comments;
    expect(component.recipeName).toBe('name');
    expect(component.recipeImageSource).toBe('src');
    expect(component.recipeDescription).toBe('description');
    expect(component.recipeUpvotes).toBe(0);
    expect(component.recipeUpvoted).toBe(false);
    expect(component.recipeIngredients).toBe(changeDetectMock.recipeIngredients);
    expect(component.recipeComments).toBe(changeDetectMock.comments);
    expect(component.recipeMaker).toBe(changeDetectMock.makerName);
    expect(component.recipeComments_Slice).toEqual(changeDetectMock.comments);
    expect(component.lotsOfComments).toBeFalsy();

    expect(component.recipeComments[0]).toBe("");
    expect(component.numberOfComments).toBe(3);  

  });



  let nextSpy = jasmine.createSpy("next");
  let completeSpy = jasmine.createSpy("complete");

  let commentUnsubscribeStub: any = {
    next: nextSpy,
    complete: completeSpy
  };


  it('should upvote', () => {
    let upvoteSpy = spyOn(component, 'upvoteRecipe').and.callFake(() => {});
    component.recipeUpvotes = 0;

    component.onUpvote();

    expect(component.recipeUpvotes).toBe(1);
    expect(component.canUpvote).toBeFalsy();
    expect(upvoteSpy).toHaveBeenCalled();
    expect(upvoteSpy).toHaveBeenCalledWith(component.aSelectedRecipe);

  });

  
  it('should check and validate user profile photo', () => {

    let sAuthState = {photoURL: "mockURL"};
    let authSpy = spyOn(service, 'getAuth').and.returnValue(Observable.of(sAuthState));

    component.checkUserProfilePhoto();

    expect(authSpy).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      service.getAuth().subscribe(authState => {
        //expect(authState).toBe(sAuthState);
        expect(component.commentingProfileImage).toBe(authState.photoURL);
      });
    });

  });



  it('should monitor the number of comments', () => {
    component.onShowMoreComments();
    expect(component.lotsOfComments).toBeFalsy();
  });



  it('should check user upvote state', () => {
    let authState = {displayName: 'name'};
    let recipe = {upvoters: ['name']}
    
    let authSpy = spyOn(service, 'getAuth').and.returnValue(Observable.empty());
    let recipeSpy = spyOn(recipeService, 'getDbRecipeByName').and.returnValue(Observable.empty());

    component.checkUserUpvoteState();

    expect(authSpy).toHaveBeenCalled();

    fixture.whenStable().then(() => {

      service.getAuth().subscribe(auth => {

        expect(recipeSpy).toHaveBeenCalled();

        recipeService.getDbRecipeByName(null).subscribe(recipes => {
          fixture.detectChanges();
          expect(component.canUpvote).toBeTruthy();
        });

      });
    });
  });


  xit('should add comments', () => {
    component.recipeComments = ['comment'];
    component.addComment({value:null, valid:true});
  });


});
