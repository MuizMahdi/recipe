import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment.prod';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './../../Services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RecipesDataService } from './../../Services/recipesData.service';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let service: AuthService;
  let recipeService: RecipesDataService;
  let router: Router;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, RouterTestingModule, ReactiveFormsModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule ],
      providers: [ AuthService, RecipesDataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = new AuthService(null);
    recipeService = new RecipesDataService(null,null);
    component = new LoginComponent(null,null,null,service,null);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the login form with 2 controls', () => {
    expect(component.loginFormGroup.contains('emailCtrl')).toBeTruthy();
    expect(component.loginFormGroup.contains('passwordCtrl')).toBeTruthy();
  });

  it('should create the registeration form with 4 controls', () => {
    expect(component.registerationFormGroup.contains('nameCtrl')).toBeTruthy();
    expect(component.registerationFormGroup.contains('emailCtrl')).toBeTruthy();
    expect(component.registerationFormGroup.contains('passwordCtrl')).toBeTruthy();
    expect(component.registerationFormGroup.contains('confirmPasswordCtrl')).toBeTruthy();
  });

  it('should make the login form email and password required', () => {
    let emailCtrl = component.loginFormGroup.get('emailCtrl');
    let passwordCtrl = component.loginFormGroup.get('passwordCtrl');

    emailCtrl.setValue('');
    passwordCtrl.setValue('');

    expect(emailCtrl.valid).toBeFalsy();
    expect(passwordCtrl.valid).toBeFalsy();
  });

  it('should make the all of registeration form fields required', () => {
    let regUsername = component.registerationFormGroup.get('nameCtrl');
    let regnEmail = component.registerationFormGroup.get('emailCtrl');
    let regPassword = component.registerationFormGroup.get('passwordCtrl');
    let regConfirmPassword = component.registerationFormGroup.get('confirmPasswordCtrl');

    regUsername.setValue('');
    regnEmail.setValue('');
    regPassword.setValue('');
    regConfirmPassword.setValue('');

    expect(regUsername.valid).toBeFalsy();
    expect(regnEmail.valid).toBeFalsy();
    expect(regPassword.valid).toBeFalsy();
    expect(regConfirmPassword.valid).toBeFalsy();
  });

  it('should make limit the length of the name field to 4 characters', () => {
    let regUsername = component.registerationFormGroup.get('nameCtrl');

    regUsername.setValue('000');
    expect(regUsername.valid).toBeFalsy();

    regUsername.setValue('0000');
    expect(regUsername.valid).toBeTruthy();
  });

  it('should make sure that the confirmation password equals the password', () => {
    let regPassword = component.registerationFormGroup.get('passwordCtrl');
    let regConfirmPassword = component.registerationFormGroup.get('confirmPasswordCtrl');

    regPassword.setValue('0');
    expect(regConfirmPassword.valid).toBeFalsy();

    regConfirmPassword.setValue('0');
    expect(regConfirmPassword.valid).toBeTruthy();
  });

  it('should login user onLogin', () => {
    let loginFormGroup = component.loginFormGroup;

    expect(loginFormGroup.valid).toBeFalsy();

    let emailCtrl = component.loginFormGroup.get('emailCtrl');
    let passwordCtrl = component.loginFormGroup.get('passwordCtrl');

    emailCtrl.setValue('0');
    passwordCtrl.setValue('0');

    expect(loginFormGroup.valid).toBeTruthy();

    let emailVal = emailCtrl.value;
    let passwordVal = passwordCtrl.value;

    let spy = spyOn(service, 'login').and.returnValue(Promise.resolve(true));

    component.onLogin();

    expect(component.loginClick).toBeTruthy();
    expect(component.loginEmail).toBe(emailCtrl.value);
    expect(component.loginPassword).toBe(passwordCtrl.value);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(emailVal, passwordVal);
  });



  it('should login and then get the logged user', () => {
    let emailCtrl = component.loginFormGroup.get('emailCtrl');
    let passwordCtrl = component.loginFormGroup.get('passwordCtrl');

    emailCtrl.setValue('0');
    passwordCtrl.setValue('0');

    let spy = spyOn(service, 'login').and.returnValue(Promise.resolve(true));
    let authState = {displayName: 'name'};
    let userObject = {completedProfile: true};

    let getAuthSpy = spyOn(service, 'getAuth').and.returnValue(Observable.of(authState)).and.callFake(() => {
      return recipeService.getDbUserByName(authState.displayName);
    });

    let getDbUserSpy = spyOn(recipeService, 'getDbUserByName').and.returnValue(Observable.of([userObject]));

    component.onLogin();

    fixture.whenStable().then(() => {
      expect(getAuthSpy).toHaveBeenCalled();

      service.getAuth().subscribe(authVal => {
        fixture.detectChanges();
        expect(getDbUserSpy).toHaveBeenCalled();
        expect(getDbUserSpy).toHaveBeenCalledWith(authState.displayName);

        recipeService.getDbUserByName(authState.displayName).subscribe(users => {
          users.map(user => {
            expect(user.completedProfile).toBeTruthy();
            // expect router to navigate to '/allrecipes'
          });
        });
      });
    }) 
  });



  it('should register user', () => {
    
    expect(component.registerClick).toBeFalsy();

    let nameCtrl = component.registerationFormGroup.get('nameCtrl');
    let emailCtrl = component.registerationFormGroup.get('emailCtrl');
    let passwordCtrl = component.registerationFormGroup.get('passwordCtrl');
    let confirmPasswordCtrl = component.registerationFormGroup.get('confirmPasswordCtrl');

    nameCtrl.setValue('0000');
    emailCtrl.setValue('00');
    passwordCtrl.setValue('0');
    confirmPasswordCtrl.setValue('0');

    let registerSpy = spyOn(service, 'register').and.returnValue(Promise.resolve(true));

    component.onRegister();

    expect(component.registerClick).toBeTruthy();
    expect(component.registerationFormGroup.valid).toBeTruthy();
    expect(registerSpy).toHaveBeenCalledWith(nameCtrl.value, emailCtrl.value, passwordCtrl.value);
    
    /*fixture.whenStable().then(() => {
      expect(addUserSpy).toHaveBeenCalled();
      expect(component.swapFormBoolean).toBeFalsy();
    });*/
    
  });


});
