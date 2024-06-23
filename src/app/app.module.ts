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
import { ReviewComponent } from './review/review.component';

import { ReviewService } from './review.service';
import { OwnerReviewsComponent } from './owner-reviews/owner-reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    PerfilComponent,
    PropertyListComponent,
    PropertyDetailComponent,
    ReviewComponent,
    OwnerReviewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [PropertyService,ReviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
