import { ReviewResponse } from './../../interfaces/review.interface';
import { Component, Inject, inject } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { SessionService } from '../../../services/session.service';
import { NavigationEnd, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrl: './review-create.component.css'
})
export class ReviewCreateComponent {

  private session = inject(SessionService);
  private reviewservice = inject(ReviewService);
  private router = inject(Router);
  private id: number = 0;

  constructor(
    private dialogRef: MatDialogRef<ReviewCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  remainingCharacters: number = 1000;
  maxLength: number = 1000; 
  rating:number = 0;
  content: string = "";
  onSliderInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.rating = Number(value)
    console.log('Slider value:', value);
  }
  
  getStars(rating: number): { image: string, alt: string }[] {
    const stars: { image: string, alt: string }[] = [];
         
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push({ image: 'assets/star.png', alt: 'Estrella llena' });
      } else if (i <= rating + 0.5) {
        stars.push({ image: 'assets/star2.png', alt: 'Estrella semi llena' });
      } else {
        stars.push({ image: 'assets/star3.png', alt: 'Estrella vacía' });
      }
    }
    return stars;
  }
  updateCharacterCount(event: any) {
    this.remainingCharacters = this.maxLength - event.target.value.length;
  }

  
  createReview(){
    if(this.content === "") {
      return;
    }
    const review : ReviewResponse ={
      id : 0,
      userid : this.session.getUserID()!,
      rating : this.rating,
      content : this.content,
      propertyId : this.data.id
    }
    console.log("prueba");
    this.reviewservice.createReview(review).subscribe(()=>{
      this.dialogRef.close();
    });
  }
}
