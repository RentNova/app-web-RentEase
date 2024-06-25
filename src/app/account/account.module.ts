import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { MaterialModule } from '../material/material.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EditperfilComponent } from './components/editperfil/editperfil.component';
import { UploadPhotoComponent } from '../shared/upload-photo/upload-photo.component';


@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    PerfilComponent,
    EditperfilComponent,
    UploadPhotoComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AccountModule { }
