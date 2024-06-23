import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { Review } from '../review.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() propertyId!: number;
  reviews: Review[] = [];
  newReview: Review = { propertyId: 0, rating: 0, comment: '', reviewer: '' };

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    if (this.propertyId) {
      this.newReview.propertyId = this.propertyId;
      this.reviewService.getReviewsForProperty(this.propertyId).subscribe(reviews => this.reviews = reviews);
    } else {
      console.error('propertyId is undefined');
    }

    // Add three sample reviews with names and long comments
    this.reviews.push(
      { propertyId: this.propertyId, rating: 5, comment: 'Excelente experiencia, el apartamento estaba impecable y muy bien ubicado. La comunicación con el propietario fue rápida y eficiente. Recomendado al 100%. El proceso de alquiler fue sencillo y el propietario estuvo siempre disponible para resolver cualquier duda.', reviewer: 'Carlos Pérez', reviewerImage: 'assets/user1.jpeg' },
      { propertyId: this.propertyId, rating: 4, comment: 'El lugar es hermoso y muy cómodo. La calidad de la propiedad superó mis expectativas. Hubo un pequeño problema con la calefacción, pero el propietario lo resolvió rápidamente. Definitivamente recomendaría este lugar a otros arrendatarios.', reviewer: 'María Gómez', reviewerImage: 'assets/user2.jpg' },
      { propertyId: this.propertyId, rating: 5, comment: 'La propiedad es tal cual se describe, perfecta para familias. Disfrutamos mucho nuestra estancia y definitivamente consideraremos volver en el futuro. Además, la zona es muy tranquila y segura, ideal para los niños.', reviewer: 'Jorge Fernández', reviewerImage: 'assets/user3.jpg' }
    );
  }

  addReview(): void {
    if (this.propertyId) {
      this.newReview.propertyId = this.propertyId;
      this.reviewService.addReview(this.newReview).subscribe(review => {
        this.reviews.push(review);
        this.newReview = { propertyId: this.propertyId, rating: 0, comment: '', reviewer: '' };
      });
    } else {
      console.error('propertyId is undefined');
    }
  }

  getStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}
