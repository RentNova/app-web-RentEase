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
  showLogin = false;

  showRegisterForm() {
    this.showRegister = true;
    this.showProfileComponent = false;
    this.showPropertyListComponent = false;
    this.showLogin = false;
  }

  showProfile() {
    this.showProfileComponent = true;
    this.showRegister = false;
    this.showPropertyListComponent = false;
    this.showLogin = false;
  }

  showPropertyList() {
    this.showPropertyListComponent = true;
    this.showRegister = false;
    this.showProfileComponent = false;
    this.showLogin = false;
  }

  showLoginForm() {
    this.showLogin = true;
    this.showRegister = false;
    this.showProfileComponent = false;
    this.showPropertyListComponent = false;
  }
}
