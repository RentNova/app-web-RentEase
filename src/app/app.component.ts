import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showRegister = false;
  showProfileComponent = false;

  showRegisterForm() {
    this.showRegister = true;
    this.showProfileComponent = false;
  }

  showProfile() {
    this.showProfileComponent = true;
    this.showRegister = false;
  }
}
