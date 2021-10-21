import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    public _authService: AuthService,
    public router: Router){}

  canActivate(){
    if(this._authService.isLogged()){
      return true;
    }else{
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
