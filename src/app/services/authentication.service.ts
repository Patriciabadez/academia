import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private autenticado = new BehaviorSubject<boolean>(this.temToken());

  autenticado$ = this.autenticado.asObservable();

  constructor() {}

  private temToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isChangeAutenticantion(value: boolean) {
    this.autenticado.next(value);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isChangeAutenticantion(false);
  }
}
