import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review, Experience } from './review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsUrl = 'api/reviews'; // URL to web api
  private experiencesUrl = 'api/experiences'; // URL to web api for experiences

  constructor(private http: HttpClient) {}

  getReviewsForProperty(propertyId: number): Observable<Review[]> {
    const url = `${this.reviewsUrl}?propertyId=${propertyId}`;
    return this.http.get<Review[]>(url);
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.reviewsUrl, review);
  }

  addExperience(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(this.experiencesUrl, experience);
  }

  getExperiencesForProperty(propertyId: number): Observable<Experience[]> {
    const url = `${this.experiencesUrl}?propertyId=${propertyId}`;
    return this.http.get<Experience[]>(url);
  }

  getReviewsForOwner(): Observable<Review[]> {
    const url = `${this.reviewsUrl}/owner`;
    return this.http.get<Review[]>(url);
  }
  
  getExperiencesForOwner(): Observable<Experience[]> {
    const url = `${this.experiencesUrl}/owner`;
    return this.http.get<Experience[]>(url);
  }
  
  
}
