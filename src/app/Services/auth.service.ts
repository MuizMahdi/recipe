import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService 
{
  constructor(public afAuth: AngularFireAuth) 
  { }

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

            try 
            {
              userData.updateProfile({ displayName:name, photoURL:null }); 
            } 
            catch(e) 
            {
              // Everything works fine but theres still an error, saying the userData is null.
            }
           
            userData.sendEmailVerification().then( (success) => {
              window.alert("Verify your email before logging in");
              this.logout();
            }).catch( (err) => {
              window.alert(err.message);
            })
          })
        })
    });
  }

  login(email: string, password: string) 
  {
    return new Promise( (resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)  
      .then( userData => {
        this.afAuth.authState.subscribe(userData => {
          if(userData.emailVerified)
          {
            console.log("User email is verified.. proceeding to profile completion check.")
            console.log(userData.displayName + "PASSED AUTH SERVICE");
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
