import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showRegister = false;
  showProfileComponent = false;
  showPropertyListComponent = false;

  showRegisterForm() {
    this.showRegister = true;
    this.showProfileComponent = false;
    this.showPropertyListComponent = false;
  }

  showProfile() {
    this.showProfileComponent = true;
    this.showRegister = false;
    this.showPropertyListComponent = false;
  }

  showPropertyList() {
    this.showPropertyListComponent = true;
    this.showRegister = false;
    this.showProfileComponent = false;
  }
}
