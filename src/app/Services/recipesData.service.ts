import { Recipe } from './../models/Recipe';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabase , AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AnonymousSubject } from 'rxjs/Subject';
import { OnDestroy } from "@angular/core";

@Injectable()
export class RecipesDataService 
{

/*******************************************************************************************/

  public recipeReturned: Recipe[];
  selected: Recipe;
  valObj: Recipe[];
  subscription: any;

/*******************************************************************************************/

/*******************************************************************************************/

  constructor(public ngFireDB: AngularFireDatabase) 
  { }

/*******************************************************************************************/
  

/*******************************************************************************************/

  updateRecipe(recipe: Recipe)
  {
    //this.ngFireDB.list<Recipe>('/recipes', ref => ref.orderByChild('name').equalTo(recipe.name)).update({upvotes: recipe.upvotes});
    let recipeList = this.ngFireDB.list<Recipe>('/recipes', ref => ref.orderByChild('name').equalTo(recipe.name));
    
    recipeList.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(items => {
      return items.map(item => {
        recipeList.update(item.key, {
          name: item.name,
          description: item.description,
          imagesrc: item.imagesrc,
          upvotes: item.upvotes+1,
          upvoted: true, // Each account should be able to apvote separatedly, so basicly it should be false by default for each account.
          ingredientsNames: item.ingredientsNames,
          ingredientsAmounts: item.ingredientsAmounts,
          comments:item.comments
        });
        
      });
    });  

    let recipeListSubscription = recipeList.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe( items => {});

    recipeListSubscription.unsubscribe();
    
    // MEMORY LEAK AFTER UPVOTING TWICE WHEN UPVOTED: FALSE !
  }

/*******************************************************************************************/


/*******************************************************************************************/

  getRecipesChanges()
  {
    return this.ngFireDB.list<Recipe>('/recipes').valueChanges();
  }

/*******************************************************************************************/


/*******************************************************************************************/

  getRecipeObservable()
  {
    this.ngFireDB.list<Recipe>('/recipes').valueChanges();
  }

/*******************************************************************************************/


/*******************************************************************************************/

  /*selectedRecipe(theRecipe: Recipe)
  {
    this.selected = theRecipe;
  }

  getSelectedRecipe(): ARecipe
  {
    return this.selected;
  }*/

/*******************************************************************************************/



/*******************************************************************************************/

  /*
    Insert in component onInit() to access DB data:

    this.recipeDataService.getRecipesDbChanges().subscribe( recipes => {
      this.recipesFromDB = recipes; // subscribe when data is needed else where.
    });

    this.recipesDbObservable = this.recipeDataService.getRecipesDbChanges(); // async to observable when data only needed on template.
  */

 /*
 getPostsPerUser() 
 {
  return this.http.get('/users').map(res => res.json()).flatMap((result : Array<User>) => {
    return Observable.forkJoin(
      result.map((user : User) => user.getPosts());
    });
  }

  this.getPostsPerUser().subscribe(result => {
    var postsUser1 = result[0];
    var postsUser2 = result[1];
    (...)
  });
  */
/*******************************************************************************************/

}
