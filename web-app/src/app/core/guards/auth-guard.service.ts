import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { AUTH_ROUTE } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): boolean {
    const isAuthenticated = !!this.authService.token;

    if (!isAuthenticated) {
      this.router.navigate([AUTH_ROUTE]);
      return false;
    }

    return true;
  }
}
