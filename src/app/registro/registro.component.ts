import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegisterComponent {
  user: any = {
    nombre: '',
    apellido: '',
    edad: '',
    telefono: '',
    email: '',
    contrasena: '',
    confirmarContrasena: ''
  };
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  onSubmit() {
    if (this.user.contrasena !== this.user.confirmarContrasena) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.userService.register(this.user).subscribe(
      response => {
        // Handle successful registration here
        console.log('User registered successfully', response);
      },
      error => {
        // Handle registration error here
        console.error('Error registering user', error);
        this.errorMessage = 'Hubo un error al registrar el usuario';
      }
    );
  }
}
