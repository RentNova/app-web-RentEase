import { Component } from '@angular/core';
import { UserService } from '../user.service'; // Asegúrate de que esta ruta es correcta

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  onSubmit() {
    this.userService.login(this.email, this.password).subscribe(
      response => {
        // Manejar la respuesta del servidor
      },
      error => {
        this.errorMessage = 'Error al iniciar sesión.';
      }
    );
  }
}
