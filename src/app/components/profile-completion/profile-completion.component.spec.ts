import { environment } from './../../../environments/environment.prod';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthService } from './../../Services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RecipesDataService } from './../../Services/recipesData.service';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileCompletionComponent } from './profile-completion.component';

describe('ProfileCompletionComponent', () => {
  let component: ProfileCompletionComponent;
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
