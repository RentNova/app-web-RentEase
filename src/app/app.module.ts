import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UserService } from './user.service';

import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertyService } from './property.service';

import { AppRoutingModule } from './app-routing.module';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { LoginComponent } from './login/login.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PerfilComponent,
    PropertyListComponent,
    PropertyDetailComponent,
    RecuperarContrasenaComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [UserService, PropertyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
