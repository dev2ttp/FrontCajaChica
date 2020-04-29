import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogged(): boolean {
    if (localStorage.getItem('login') === 'true') {
      return true;
    } else {
      return false;
    }
  }

  setSession(data: IUser): void {
    localStorage.setItem('login', 'true');
    // Items...
  }

  logout(): void {
    localStorage.clear();
  }
}
