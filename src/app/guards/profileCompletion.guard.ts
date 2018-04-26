import { Observable } from 'rxjs/Observable';
import { RecipesDataService } from './../Services/recipesData.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable()
export class ProfileCompletionGuard implements CanActivate
{
    constructor(private router:Router, public afAuth:AngularFireAuth, private recipesDataService: RecipesDataService){ }

    canActivate(): Observable<boolean>
    {
        return this.afAuth.authState.map(auth => {
            if(!auth) // if not authenticated
            {
                this.router.navigate(['/login']); // then navigate to the login page
                return false;
            }
            else // check if profile complete, if it is return false (cannot enter), if not then navigate and return true 
            {
                this.recipesDataService.getDbUserByName(auth.displayName).subscribe(users => {
                    return users.map(user => {
                        if(!user.completedProfile)
                        {
                            this.router.navigate(['/completeProfile']);
                            return true;
                        }
                        else
                        {
                            this.router.navigate(['/']);
                            return false;
                        }
                    })
                });
            }
        });
    }
}