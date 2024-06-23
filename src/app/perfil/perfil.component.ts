import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any = {};
  errorMessage: string = '';
  isEditing: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe(
      (response: any) => {
        this.user = response;
      },
      (error: any) => {
        console.error(error);
        this.errorMessage = 'Error al cargar el perfil del usuario.';
      }
    );
  }

  editProfile() {
    this.isEditing = !this.isEditing;
  }

  updateProfile() {
    this.userService.updateProfile(this.user).subscribe(
      (response: any) => {
        this.isEditing = false;
        // Actualizar el perfil con la respuesta del servidor si es necesario
      },
      (error: any) => {
        console.error(error);
        this.errorMessage = 'Error al actualizar el perfil del usuario.';
      }
    );
  }
}
