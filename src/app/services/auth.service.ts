import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarioLogado: Usuario | null = null;

  constructor(private usuariosService: UsuariosService) {}

  login(email: string, senha: string): Observable<boolean> {
    return this.usuariosService.autenticar(email, senha).pipe(
      tap(usuario => {
        if (usuario) {
          this.usuarioLogado = usuario;
          localStorage.setItem('usuario', JSON.stringify(usuario));
        }
      }),
      map(usuario => !!usuario)
    );
  }

  logout(): void {
    this.usuarioLogado = null;
    localStorage.removeItem('usuario');
  }

  getUsuarioLogado(): Usuario | null {
    if (!this.usuarioLogado) {
      const data = localStorage.getItem('usuario');
      if (data) this.usuarioLogado = JSON.parse(data);
    }
    return this.usuarioLogado;
  }

  isAutenticado(): boolean {
    return !!this.getUsuarioLogado();
  }
}
