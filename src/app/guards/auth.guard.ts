import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { NgxToastrService } from '../services/ngx-toastr/ngx-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngxToastrService: NgxToastrService
  ) {}

  canActivate(): boolean {
    if (!this.authService.isLogged()) {
      this.ngxToastrService.error('Debe iniciar sesión para continuar.');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
