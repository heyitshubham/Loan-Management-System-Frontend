import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../auth/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated() && this.auth.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}