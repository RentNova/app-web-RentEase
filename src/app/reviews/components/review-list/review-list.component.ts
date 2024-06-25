import { Component, Input, OnInit, inject } from '@angular/core';
import { ReviewResponse } from '../../interfaces/review.interface';
import { ReviewService } from '../../services/review.service';
import { UserResponse } from '../../interfaces/user.interface';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent {
  @Input() propertyid : number = 0;

  reviewservice = inject(ReviewService);

  userReviews: { review: ReviewResponse, user: UserResponse}[] = [];

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

  ngOnInit(){
    this.reviewservice.getReviews(this.propertyid).subscribe(
      (reviews: ReviewResponse[]) => {
        reviews.forEach(review => {
          this.reviewservice.getUser(review.userid).subscribe(
            (user: UserResponse) => {
              this.userReviews.push({ review, user });
            }
          );
        });
      }
    );
  }

}
