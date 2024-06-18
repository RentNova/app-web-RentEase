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
    // Simulamos el envío del código de verificación sin verificar el email
    this.successMessage = 'Código enviado a tu email.';
    this.errorMessage = '';
    this.step = 2;
  }

  verifyCode() {
    if (this.code === '00000') { 
      this.step = 3;
      this.errorMessage = '';
      this.successMessage = 'Código verificado exitosamente.';
    } else {
      this.errorMessage = 'Código incorrecto.';
      this.successMessage = '';
    }
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
    
    // Aquí podrías llamar a un servicio para realmente cambiar la contraseña
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
