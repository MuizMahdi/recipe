import { Component, OnInit } from '@angular/core';
import { ScrollEvent } from 'ngx-scroll-event';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit 
{
  
  locationOnTop: boolean = true;
  locationNotOnTop: boolean = false;
  navState: string ="navbar sticky-top navbar-expand-lg navbar-dark bg-dark"; //starts being transparent (remove navbar-dark bg-dark so it doesn't start black)

  constructor() { }
  ngOnInit() { }

  middleEventsCounter: number = 0;
  atTheTop: boolean = true;

  public handleScroll(event: ScrollEvent) 
  {
    if (event.isReachingBottom) 
    {
      console.log(`AT THE BOTTOM`);
      this.middleEventsCounter = 0;
    }

    if (event.isReachingTop) 
    {
      this.atTheTop = true; //true after a single event of at top (isReachingTop)
      this.middleEventsCounter = 0;
    }

    if (event.isWindowEvent) 
    {
      this.middleEventsCounter = this.middleEventsCounter + 1;

      if (this.middleEventsCounter > 36)
      {
        this.middleEventsCounter = 0;
        this.atTheTop = false; // false only after 10 events of in middle (isWindowEvent)
      } 
    }

    if(this.atTheTop)
    {
      //transparent
      this.navState = "navbar sticky-top navbar-expand-lg navbar-dark bg-dark";
    } else { // if atTheTop is false
      //not transparent
      this.navState = "navbar sticky-top navbar-expand-lg navbar-dark bg-dark";
    }

  }

}
