import { AuthService } from './auth.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from './../../environments/environment.prod';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { TestBed, inject } from '@angular/core/testing';

import { RecipesDataService } from './recipesData.service';
import { AngularFireModule } from 'angularfire2/angularfire2';


describe('RecipesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipesDataService, AuthService],
      imports: [ AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule ]
    });
  });

  it('should be created', inject([RecipesDataService], (service: RecipesDataService) => {
    expect(service).toBeTruthy();
  }));
});
