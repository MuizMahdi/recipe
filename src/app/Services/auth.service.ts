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

  register(name: string, email:string, password:string)
  {
    return new Promise( (resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then( userData => resolve(userData), err => reject(err) )
        .then( userData => {
          this.afAuth.authState.subscribe(userData => {
            userData.updateProfile({ displayName:name, photoURL:null }); 
            userData.sendEmailVerification().then( (success) => {
              window.alert("Please verify your email");
              this.logout();
            }).catch( (err) => {
              window.alert(err.message);
            })
          })
        })
    });
  }
  // Create a user then update the user profile, giving then a displayName of name and an empty photoURL (for now).

  login(email: string, password: string) 
  {
    return new Promise( (resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)  
      //.then( userData => resolve(userData), err => reject(err) )
      .then( userData => {
        this.afAuth.authState.subscribe(userData => {
          if(userData.emailVerified)
          {
            resolve(userData), err => reject(err)
          }
          else
          {
            window.alert("Please verify your email before logging in");
          }
        })
      })
    });
  }

  logout()
  {
    this.afAuth.auth.signOut();
  }



}
