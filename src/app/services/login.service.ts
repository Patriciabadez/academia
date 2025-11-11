import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
   // Usuários simulados
  private usuariosFake = [
    { username: 'admin', password: '123', email: 'admin@academia.com', tipo: 'admin' },
    { username: 'joao', password: '123', email: 'joao@academia.com', tipo: 'personal' },
    { username: 'maria', password: '123', email: 'maria@academia.com', tipo: 'recepcionista' },
    { username: 'limpeza', password: '123', email: 'limpeza@academia.com', tipo: 'limpeza' },
    { username: 'pedro', password: '123', email: 'pedro@academia.com', tipo: 'aluno' },
  ];

  constructor() {}

  login(username: string, password: string): Observable<any> {
    const usuario = this.usuariosFake.find(
      (u) => u.username === username && u.password === password
    );

    if (usuario) {
      // Gera um token fake com JWT (simulado)
      const payload = {
        username: usuario.username,
        email: usuario.email,
        tipo: usuario.tipo,
        exp: Math.floor(Date.now() / 1000) + 3600 // expira em 1h
      };
      const token = this.fakeJwtEncode(payload);

      return of ({ token });
    } else {
      return throwError(() => new Error('Usuário ou senha inválidos'));
    }
  }

  // Função que cria um JWT fake (somente para simulação)
  private fakeJwtEncode(payload: any): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const encode = (obj: any) => btoa(JSON.stringify(obj));
    return `${encode(header)}.${encode(payload)}.fake-signature`;
  }
}

