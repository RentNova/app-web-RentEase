// recuperar-contrasena.component.ts
import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent {
  email: string = '';
  code: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  step: number = 1;

  constructor(private userService: UserService) {}

  sendResetLink() {
    this.userService.recoverPassword(this.email).subscribe(
      response => {
        this.successMessage = 'Código enviado a tu email.';
        this.errorMessage = '';
        this.step = 2;
      },
      error => {
        this.errorMessage = 'Error al enviar el código.';
        this.successMessage = '';
      }
    );
  }

  verifyCode() {
    if (this.code === '123456') { // Esta es solo una simulación
      this.step = 3;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Código incorrecto.';
    }
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
    // Aquí deberías llamar a una API que cambie la contraseña
    this.successMessage = 'Contraseña cambiada exitosamente.';
    this.errorMessage = '';
    this.step = 1; // Reiniciar el flujo
  }

  cancel() {
    this.step = 1;
    this.email = '';
    this.code = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.errorMessage = '';
    this.successMessage = '';
  }
}
