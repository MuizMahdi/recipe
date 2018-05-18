import { environment } from './../../environments/environment.prod';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { TestBed, inject } from '@angular/core/testing';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { AngularFireModule } from 'angularfire2/angularfire2';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, AngularFireAuth],
      imports: [ AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
