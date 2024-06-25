import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../services/session.service';
import { PropertyResponse } from '../interfaces/property.interface';
import { ClientResponse } from '../interfaces/client.interface';

@Injectable({
    providedIn: 'root'
  })
  
export class PropertyService {
    private currentID : number = 0;
    private apiURL : string = environment.apiURL;
    private session = inject(SessionService);
    private http = inject(HttpClient);

    getHighestId(): Observable<number> {
      return this.getProperties().pipe(
        map(property => Math.max(...property.map(property => property.id)))
        );
        }
    
    getProperties(): Observable<PropertyResponse[]> {
      const url = `${this.apiURL}/properties`;
      return this.http.get<PropertyResponse[]>(url);
    }
    getOwnProperties(): Observable<PropertyResponse[]> {        
      const url = `${this.apiURL}/properties?owner=${this.session.getUserID()}`;
      return this.http.get<PropertyResponse[]>(url);
    }
    getPropertyClient(id:number): Observable<ClientResponse>{
      const url = `${this.apiURL}/userdetails/${id}`;
      return this.http.get<ClientResponse>(url);
    }
    createProperty(property :PropertyResponse) : Observable<PropertyResponse>{
      return this.getHighestId().pipe(switchMap( id => {
        this.currentID = id + 1;
        property.id = this.currentID;
        property.owner = this.session.getUserID()!;
        this.http.get<any>(`${this.apiURL}/userdetails/${this.session.getUserID()}`).subscribe((user)=>{
          user.properties.push(this.currentID)
          this.http.patch<any>(`${this.apiURL}/userdetails/${this.session.getUserID()}`, user);
        })

        const url = `${this.apiURL}/properties`;
        return this.http.post<PropertyResponse>(url, property);
      }))
    }
}