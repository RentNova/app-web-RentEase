import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { LoginComponent } from './login/login.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component'; // Asegúrate de crear este componente

const routes: Routes = [
  { path: 'registro', component: RegisterComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'properties', component: PropertyListComponent },
  { path: 'property/:id', component: PropertyDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent }, // Ruta para la recuperación de contraseña
  { path: '', redirectTo: '/registro', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
