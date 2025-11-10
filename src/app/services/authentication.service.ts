import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export type JWTToken = {
  primarysid: string;
  name: string;
  email: string;
  exp: number;
};
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAuthenticated = false;
  initialState = {
    primarysid: '',
    name: '',
    email: '',
    exp: 0,
  };

  constructor() {
    this.checkToken();
  }

  private checkToken() {
    const token = localStorage.getItem('token');
    let jwtToken: JWTToken = token ? jwtDecode(token || '') : this.initialState;
    if (jwtToken.exp > (new Date().getTime() + 1) / 1000) {
      this.isAuthenticated = true;
    } else {
      window.localStorage.clear();
      this.isAuthenticated = false;
    }
  }

  isChangeAutenticantion(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
