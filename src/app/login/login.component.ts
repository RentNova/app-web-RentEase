import { Component } from '@angular/core';
import { UserService } from '../user.service'; // Asegúrate de que esta ruta es correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.login(this.email, this.password).subscribe(
      response => {
        // Manejar la respuesta del servidor
        // Por ejemplo, redirigir a la página principal
        console.log('Login exitoso', response);
        this.router.navigate(['/']); // Redirigir a la página principal o la deseada
      },
      error => {
        console.error('Error al iniciar sesión', error);
        this.errorMessage = 'Error al iniciar sesión.';
      }
    );
  }
}
