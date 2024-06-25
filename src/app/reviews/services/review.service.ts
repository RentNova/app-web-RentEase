import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../services/session.service';
import { UserResponse } from '../interfaces/user.interface';
import { ReviewResponse } from '../interfaces/review.interface';

@Injectable({
    providedIn: 'root'
  })
  
export class ReviewService {
  private currentID : number = 0;
  private apiURL : string = environment.apiURL;
  private session = inject(SessionService);
  private http = inject(HttpClient);

  getHighestId(): Observable<number> {
    return this.getAllReviews().pipe(
      map(review => Math.max(...review.map(review => review.id)))
      );
      }
  
  getAllReviews(): Observable<ReviewResponse[]> {
    const url = `${this.apiURL}/reviews`;
    return this.http.get<ReviewResponse[]>(url);
  }

  getUser(id:number): Observable<UserResponse>{
    const url = `${this.apiURL}/userdetails/${id}`;
    return this.http.get<UserResponse>(url);
  }
  getReviews(id:number): Observable<ReviewResponse[]>{
    const url = `${this.apiURL}/reviews?propertyId=${id}`;      
    return this.http.get<ReviewResponse[]>(url); 
  }
  createReview(review : ReviewResponse): Observable<ReviewResponse> {      
    return this.getHighestId().pipe(switchMap( id => {
      this.currentID = id + 1;
      review.id = this.currentID;
      console.log("lago")
      const url = `${this.apiURL}/reviews`;
      return this.http.post<ReviewResponse>(url, review);
    }))
  }
}