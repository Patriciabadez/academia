import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private autenticado = new BehaviorSubject<boolean>(false);

  constructor() {
    // Verifica o token no carregamento inicial
    const token = localStorage.getItem('token');
    this.autenticado.next(!!token);
  }

  // ✅ Método usado pelo AuthGuard
  isAuthenticatedUser(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // true se existe token, false se não
  }

  // ✅ Método para alterar o estado de autenticação (usado no login/logout)
  isChangeAutenticantion(value: boolean) {
    this.autenticado.next(value);
  }

  // ✅ Observable — caso queira escutar se o usuário logou/deslogou em tempo real
  get isAuthenticated$() {
    return this.autenticado.asObservable();
  }

  // ✅ Método de logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.autenticado.next(false);
  }
}
