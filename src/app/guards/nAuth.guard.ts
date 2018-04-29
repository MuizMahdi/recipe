import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable()
export class nAuthGuard implements CanActivate
{
    constructor(private router:Router, public afAuth:AngularFireAuth){ }

    canActivate(): Observable<boolean>
    {
        return this.afAuth.authState.map(auth => {
            if(auth) // if authenticated
            {
                this.router.navigate(['/allrecipes']); 
                return false;
            }
            else 
            {
                return true;         
            }
        });
    }
}


