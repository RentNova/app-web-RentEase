import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from '../guard/auth.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EditperfilComponent } from './components/editperfil/editperfil.component';

const routes: Routes = [
  { path: 'auth', component: AccountComponent, 
  children:[
    {path:"login", component: LoginComponent, canActivate:[AuthGuard]},
    {path:"register", component: RegisterComponent, canActivate:[AuthGuard]},
    {path:"reset-password", component: ResetPasswordComponent}
  ]},
  {path:'perfil', component:PerfilComponent},  
  {path:"perfil-edit", component:EditperfilComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
