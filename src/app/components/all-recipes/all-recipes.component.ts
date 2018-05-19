import { AuthService } from './../../Services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase , AngularFireList, AngularFireObject } from 'angularfire2/database';
import { RecipesDataService } from './../../Services/recipesData.service';


@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})


export class AllRecipesComponent implements OnInit 
{

  constructor(private authService: AuthService, public ngFireDB: AngularFireDatabase, public recipesDataService: RecipesDataService) { }

  ngOnInit() 
  {
    /*
    this.authService.getAuth().subscribe(authState => {

      if(this.recipesDataService.getDbUserByName(authState.displayName))
      {
        console.log("User exists on DB");

        this.recipesDataService.getDbUserByName(authState.displayName).subscribe(users => {
          return users.map(user => {
            console.log(user.userName);
          })
        }); 
      }
      else
      {
        console.log("logged In user doesn't exist on DB");
      }

    });
    */
  }

}