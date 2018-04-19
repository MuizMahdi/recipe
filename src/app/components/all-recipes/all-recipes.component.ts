import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit 
{

  constructor(private authService: AuthService) { }

  ngOnInit() 
  {
    this.authService.getAuth().subscribe(authState => {
      console.log(authState.displayName);
      console.log(authState.emailVerified);
    });
  }

}