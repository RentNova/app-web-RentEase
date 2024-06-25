import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesComponent } from './properties.component';
import { OwnpropertiesComponent } from './components/ownproperties/ownproperties.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { ReviewsModule } from '../reviews/reviews.module';
import { PropertyCreateComponent } from './components/property-create/property-create.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PropertiesComponent,
    OwnpropertiesComponent,
    PropertyDetailComponent,
    PropertyCreateComponent
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    ReviewsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PropertiesModule { }
