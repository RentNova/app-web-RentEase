import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isHomePage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
      this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
              this.isHomePage = (event.url === '/');
              console.log(this.isHomePage);
          }
      });
  }


  title = 'RentEase';
}
