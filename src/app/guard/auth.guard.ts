import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SessionService } from "../services/session.service";

export const AuthGuard: CanActivateFn = ():
    Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> 
    | boolean 
    | UrlTree=> {
  
    if(inject(SessionService).isAuthenticated()){
        inject(Router).navigate(['/'])
        console.log("Ya se encuentra logeado")
        return false;
    }
    return true;
  };

export const ContentGuard: CanActivateFn = ():
    Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> 
    | boolean 
    | UrlTree=> {
  
    if(inject(SessionService).isAuthenticated()){
      return true;
    }
    inject(Router).navigate(['/account/auth/login'])
    console.log("No tiene permitida la entrada")
    return false;
  };