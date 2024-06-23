import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { OwnerReviewsComponent } from './owner-reviews/owner-reviews.component';

const routes: Routes = [
  { path: 'registro', component: RegisterComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '', redirectTo: '/properties', pathMatch: 'full' },
  { path: 'properties', component: PropertyListComponent },
  { path: 'property/:id', component: PropertyDetailComponent },
  { path: 'owner-reviews', component: OwnerReviewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
