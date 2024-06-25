import { Component, inject } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  private session = inject(SessionService);
  private location = inject(Location);
  imageUrl: string | ArrayBuffer | null = null;

  userDetails : any | null = null;
  ngOnInit(): void {
    this.userDetails = this.session.getUserDetails();
    this.imageUrl = this.session.getUserImage();
  }

  goBack(){
    this.location.back();
  }
}
