import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://tu-api.com/api'; // Asegúrate de reemplazar esto con la URL de tu API

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/perfil`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProfile(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/perfil`, user, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/register`, user, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  recoverPassword(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/recover-password`, { email }, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

}
