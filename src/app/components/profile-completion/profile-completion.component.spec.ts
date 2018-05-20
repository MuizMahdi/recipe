import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment.prod';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder }   from '@angular/forms';
import { AuthService } from './../../Services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RecipesDataService } from './../../Services/recipesData.service';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileCompletionComponent } from './profile-completion.component';

describe('ProfileCompletionComponent', () => {
  let component: ProfileCompletionComponent;
  let service: AuthService;
  let recipeService: RecipesDataService;
  let fixture: ComponentFixture<ProfileCompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCompletionComponent ],
      imports: [ FormsModule, ReactiveFormsModule, AngularFireModule.initializeApp(environment.firebase), 
      AngularFireDatabaseModule, AngularFireAuthModule, RouterTestingModule ],
      providers: [ AuthService, RecipesDataService ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = new AuthService(null);
    recipeService = new RecipesDataService(null,null);
    component = new ProfileCompletionComponent(null,service,recipeService,null,null);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should create the profile completion form', () => {
    component.buildForm();
    expect(component.profileCompletionFormGroup.contains('photoUrlCtrl')).toBeTruthy();
    expect(component.profileCompletionFormGroup.contains('aboutUserCtrl')).toBeTruthy();
  });

  
  it('should validate the profile image url', () => {
    component.onValidProfileImageUrl();
    expect(component.invalidImageUrl).toBeFalsy();
    component.onInvalidProfileImageUrl();
    expect(component.invalidImageUrl).toBeTruthy();
  });

});
