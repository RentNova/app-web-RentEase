import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { AccountResponse } from '../interfaces/account-response.interface';
import { environment } from '../../../environments/environment';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { PasswordResponse } from '../interfaces/password-reset.interface';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { ImageResponse } from '../interfaces/image.interface';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private currentID : number = 0;
  private apiURL : string = environment.apiURL;

  private session = inject(SessionService);
  private http = inject(HttpClient);
  private router = inject(Router);

  login(email: string | null | undefined, password: string | null | undefined): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login`, {email, password})
        .pipe(
          tap(response => {
            if(response && response.user) {
              const userDetails = {
                id: response.userDetail.id,
                email: response.user.email,
                firstName: response.userDetail.firstName,
                lastName: response.userDetail.lastName,
                age: response.userDetail.age,
                cellphone: response.userDetail.cellphone,
                img: response.userDetail.img
              }
              this.session.login(response.user.id);
              this.session.setUserDetails(userDetails);
              this.router.navigate(["/"]);
            }
          })
      )
  }


  getHighestId(): Observable<number> {
    return this.getAccounts().pipe(
      map(accounts => Math.max(...accounts.map(account => account.id)))
      );
      }
      
  getAccounts(): Observable<AccountResponse[]>{
    const url = `${this.apiURL}/accounts`;
    return this.http.get<AccountResponse[]>(url);
  }
  registerAccount(newAccount: AccountResponse): Observable<AccountResponse>{
    newAccount.id = this.currentID;
    newAccount.userDetailsId = this.currentID;
    const url = `${this.apiURL}/accounts`;
    return this.http.post<AccountResponse>(url, newAccount);
  }

  registerAccountDetails(newAccount: RegisterResponse): Observable<RegisterResponse>{
    return this.getHighestId().pipe(switchMap( id => {
      this.currentID = id + 1;
      newAccount.id = this.currentID;
      const url = `${this.apiURL}/userdetails`;
      return this.http.post<RegisterResponse>(url, newAccount);
    }))
  }

  getAccountsDetail(id : number): Observable<RegisterResponse>{
    const url = `${this.apiURL}/userdetails/${id}`;
    return this.http.get<RegisterResponse>(url);
  }

  changePassword(newPassword: PasswordResponse, userID: number | null):Observable<PasswordResponse>{
    const url = `${this.apiURL}/accounts/${userID}`;
    return this.http.patch<PasswordResponse>(url, newPassword);
  }

  changePhoto(newPhoto: ImageResponse, userID: number | null): Observable<ImageResponse>{
    const url = `${this.apiURL}/userdetails/${userID}`;
    return this.http.patch<ImageResponse>(url, newPhoto);
  }

  editAccount(newPassword: AccountResponse, userID: number | null):Observable<AccountResponse>{
    const url = `${this.apiURL}/accounts/${userID}`;
    if (newPassword.password === "") {
      delete newPassword.password;
    }
    return this.http.patch<AccountResponse>(url, newPassword);
  }
  editUserDetails(patch: RegisterResponse, userID: number | null):Observable<RegisterResponse>{
    const url = `${this.apiURL}/userdetails/${userID}`;
    return this.http.patch<RegisterResponse>(url, patch);
  }
}
