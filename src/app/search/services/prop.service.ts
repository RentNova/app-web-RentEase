import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PropertyResponse } from '../../properties/interfaces/property.interface';
import { Observable, map } from 'rxjs';
import { SessionService } from '../../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class PropService {
    private apiURL : string = environment.apiURL;
    private session = inject(SessionService)
    private http = inject(HttpClient);

    getProperties(): Observable<PropertyResponse[]> {
        const url = `${this.apiURL}/properties`;
        return this.http.get<PropertyResponse[]>(url).pipe(
            map(properties => properties.filter(property => property.owner !== this.session.getUserID()))
        );
    }
}