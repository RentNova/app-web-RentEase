import{a as h}from"./chunk-AXK7MOIB.js";import{_ as g,a as n,c as l,ea as u}from"./chunk-RCTQCWBE.js";var o={producction:!1,apiURL:"https://rentnova-api-rest.onrender.com/api/v1"};var U=(()=>{let r=class r{constructor(){this.http=u(h),this.isLoggedIn=!1,this.userAccount={id:0,email:"",firstName:"",lastName:"",age:0,cellphone:""},this.userImage=null,this.localStorageKey="userAccount",this.isLoggedIn=localStorage.getItem("isLoggedIn")==="true",this.isLoggedIn&&(this.userAccount=this.getEncryptedUserDetails(),localStorage.getItem("img")=="1"&&this.http.get(`${o.apiURL}/userdetails/${this.userAccount?.id}`).subscribe(e=>{this.userImage=e.img}))}update(){this.http.get(`${o.apiURL}/userdetails/${this.userAccount?.id}`).subscribe(e=>{this.http.get(`${o.apiURL}/userdetails/${this.userAccount?.id}`).subscribe(s=>{let t={id:this.getUserID(),email:s.email,firstName:e.firstName,lastName:e.lastName,age:e.age,cellphone:e.cellphone,img:e.img};this.setUserDetails(t)})})}getUserDetails(){return this.userAccount}getUserImage(){return this.userImage}login(e){this.isLoggedIn=!0,localStorage.setItem("isLoggedIn","true")}logout(){this.isLoggedIn=!1,localStorage.setItem("isLoggedIn","false"),localStorage.setItem("img","0"),this.userImage=null,this.userAccount=null,this.clearUserDetails()}isAuthenticated(){return this.isLoggedIn}setUserDetails(e){if(e){let s=e,{img:t}=s,i=l(s,["img"]);this.userImage=t,this.userAccount=n({},i);let c=this.encryptData(i);localStorage.setItem(this.localStorageKey,c),t&&(localStorage.setItem("img","1"),this.userImage=t)}else this.userAccount=null}getEncryptedUserDetails(){let e=localStorage.getItem(this.localStorageKey);return e?this.decryptData(e):null}getUserID(){return this.userAccount.id}clearUserDetails(){localStorage.removeItem(this.localStorageKey)}encryptData(e){let s="your-secret-key",t=JSON.stringify(e);return btoa(encodeURIComponent(t).replace(/%([0-9A-F]{2})/g,(c,m)=>String.fromCharCode(+("0x"+m))))}decryptData(e){let s="your-secret-key",t=decodeURIComponent(atob(e).split("").map(i=>"%"+("00"+i.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(t)}};r.\u0275fac=function(s){return new(s||r)},r.\u0275prov=g({token:r,factory:r.\u0275fac,providedIn:"root"});let a=r;return a})();export{o as a,U as b};