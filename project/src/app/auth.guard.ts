import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
  
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private login: LoginComponent,
    private router: Router){ 
    }

    canActivate():boolean{
      if(this.authService.loggedIn()){
        return true
      } else {
        this.router.navigate(['/login'])
        return false
      }
    }

   /* canActivateChild(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      return this.canActivate(next, state)
    }*/
    
   
}
