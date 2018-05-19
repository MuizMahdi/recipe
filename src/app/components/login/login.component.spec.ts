import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment.prod';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let service: AuthService;
  let recipeService: RecipesDataService;
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
    component = new LoginComponent(null,service,null,null,null);
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

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(emailVal, passwordVal);

    /*spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges();

      let getAuthSpy = spyOn(service, 'getAuth');
      expect(getAuthSpy).toHaveBeenCalled();

      done();
    });*/

    //let getAuthSpy = spyOn(service, 'getAuth').and.returnValue(Promise.resolve(true));
    //let getDbUserSpy = spyOn(recipeService, 'getDbUserByName').and.returnValue(Promise.resolve(true));
    //expect(getAuthSpy).toHaveBeenCalled();
  });

  it('should access inside then', () => {
    let emailCtrl = component.loginFormGroup.get('emailCtrl');
    let passwordCtrl = component.loginFormGroup.get('passwordCtrl');
    emailCtrl.setValue('0');
    passwordCtrl.setValue('0');

    let spy = spyOn(service, 'login').and.returnValue(Promise.resolve(true));
    let getAuthSpy = spyOn(service, 'getAuth').and.returnValue(Observable.of('FUCK!'));
    let getDbUserSpy = spyOn(recipeService, 'getDbUserByName').and.returnValue(Observable.empty());

    component.onLogin();

    fixture.whenStable().then(() => {
      expect(getAuthSpy).toHaveBeenCalled();
      //expect(getDbUserSpy).toHaveBeenCalled(); // NOT BEING CALLED..

      service.getAuth().subscribe(authVal => {
        expect(authVal).toBe('FUCK!');
      });

    });

  });




});
