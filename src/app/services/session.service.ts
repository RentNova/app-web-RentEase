import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private http = inject(HttpClient);
  private isLoggedIn = false;
  private userAccount : {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    age: number,
    cellphone: string
  } | null = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    age: 0,
    cellphone: ""
  }
  userImage : string | null = null;
  
  private readonly localStorageKey = 'userAccount';

  constructor() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if(this.isLoggedIn){
      this.userAccount = this.getEncryptedUserDetails();
      if(localStorage.getItem('img') == '1'){
        this.http.get(`${environment.apiURL}/userdetails/${this.userAccount?.id}`).subscribe((data:any) =>{
          this.userImage = data.img;
        })
      }
    }
  }
  update(){    
    this.http.get(`${environment.apiURL}/userdetails/${this.userAccount?.id}`).subscribe((data:any) =>{
      this.http.get(`${environment.apiURL}/userdetails/${this.userAccount?.id}`).subscribe((account:any)=>{
        const userDetails = {
          id: this.getUserID()!,
          email: account.email,
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          cellphone: data.cellphone,
          img: data.img
        }
        this.setUserDetails(userDetails);
      })
    })
  }

  getUserDetails(){
    return this.userAccount;
  }
  getUserImage(): string{
    return this.userImage!;
  }
  
  login(id: number) {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem("img", "0");
    this.userImage = null;
    this.userAccount = null;
    this.clearUserDetails()
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  setUserDetails(userDetail: {
    id: number,
    email: string;
    firstName: string,
    lastName: string,
    age: number,
    cellphone: string,
    img: string | null
  } | null){
    if (userDetail) {
      const { img, ...userDetailsWithoutImage } = userDetail;
      this.userImage = img;
      this.userAccount = { ...userDetailsWithoutImage };
      const encryptedData = this.encryptData(userDetailsWithoutImage);
      localStorage.setItem(this.localStorageKey, encryptedData);
      if(img){
        localStorage.setItem("img", "1");
        this.userImage = img;
      }
    } else {
      this.userAccount = null;
    }
  }

  getEncryptedUserDetails(){
    const encryptedData = localStorage.getItem(this.localStorageKey);
    if (encryptedData) {
      return this.decryptData(encryptedData);
    }
    return null;
  }

  getUserID(): number | null{
    return this.userAccount!.id;
  }

  clearUserDetails(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  private encryptData(data: any): string {
    const secretKey = 'your-secret-key';
    const json = JSON.stringify(data);
    const encryptedData = btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g,
      (match, p1) => String.fromCharCode(Number('0x' + p1))));
    return encryptedData;
  }

  private decryptData(encryptedData: string): any {
    const secretKey = 'your-secret-key';
    const decryptedData = decodeURIComponent(atob(encryptedData).split('').map(
      (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(decryptedData);
  }
}
