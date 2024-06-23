import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { Review, Experience } from '../review.model';

@Component({
  selector: 'app-owner-reviews',
  templateUrl: './owner-reviews.component.html',
  styleUrls: ['./owner-reviews.component.css']
})
export class OwnerReviewsComponent implements OnInit {
  reviews: Review[] = [];
  experiences: Experience[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviewsAndExperiences();
  }

  loadReviewsAndExperiences(): void {
    this.reviewService.getReviewsForOwner().subscribe(reviews => this.reviews = reviews);
    this.reviewService.getExperiencesForOwner().subscribe(experiences => this.experiences = experiences);
  }
}
