import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService 
{

  constructor(public afAuth: AngularFireAuth) 
  { }


  // Check whether user is logged in or not (user state) as an observable
  getAuth()
  {
    return this.afAuth.authState.map(auth => auth);
  }


  login(email: string, password: string) 
  {
    return new Promise( (resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)  
      .then( userData => resolve(userData), err => reject(err) )
    });
  }

  logout()
  {
    this.afAuth.auth.signOut();
  }



}
