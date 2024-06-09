import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';

const routes: Routes = [
  { path: 'registro', component: RegisterComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'property/:id', component: PropertyDetailComponent }, 
  { path: 'properties', component: PropertyListComponent },
  { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
