import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private API = environment.PATH_API + '/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.post(this.API, { email, senha });
  }

  salvarLogin(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  estaLogado(): boolean {
  const token = localStorage.getItem('token');
  return !!token; // retorna true se existir token
}

  logout() {
    localStorage.clear();
  }
}
