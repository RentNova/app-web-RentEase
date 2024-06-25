import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ReviewCreateComponent } from './components/review-create/review-create.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReviewListComponent,
    ReviewCreateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ], 
  exports:[
    ReviewListComponent,
    ReviewCreateComponent
  ]
})
export class ReviewsModule { }
