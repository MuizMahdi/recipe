import { RecipesDataService } from './../../Services/recipesData.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit 
{

  profileUsername: string;
  userName: string;
  userDetails: string;
  userProfileImageSource: string;

  constructor(private route: ActivatedRoute, private router: Router, private recipeDataService: RecipesDataService) 
  { 
    this.getRoutingParameters();
  }

  getRoutingParameters()
  {
    this.route.params.subscribe(params => {
      this.profileUsername = params.userName;
      this.getUser();
    });
  }


  getUser()
  {
    this.recipeDataService.getDbUserByName(this.profileUsername).subscribe(users => {
      return users.map(user => {

        this.userName = user.userName;
        this.userDetails = user.aboutUser;
        // use async pipe to view these data

      })
    });
  }

  ngOnInit() 
  { }

}
