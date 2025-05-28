import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        if (roles === 'Admin' || (Array.isArray(roles) && roles.includes('Admin'))) {
          return true;
        }
      } catch (err) {
        console.error('Invalid token');
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}