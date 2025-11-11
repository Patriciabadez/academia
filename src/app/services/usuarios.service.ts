import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Usuario {
  id: number;
  username: string;
  email: string;
  password: string; // ✅ deve existir esse campo
  tipo: 'admin' | 'personal' | 'recepcionista' | 'limpeza' | 'aluno';
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private storageKey = 'usuarios';

  constructor() {
    // Se não existir no localStorage, cria lista inicial
    const existentes = localStorage.getItem(this.storageKey);
    if (!existentes) {
      const base: Usuario[] = [
        { id: 1, username: 'admin', email: 'admin@academia.com', password: '123', tipo: 'admin', ativo: true },
        { id: 2, username: 'joao', email: 'joao@academia.com', password: '123', tipo: 'personal', ativo: true },
        { id: 3, username: 'maria', email: 'maria@academia.com', password: '123', tipo: 'recepcionista', ativo: true },
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(base));
    }
  }

  private getUsuarios(): Usuario[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private setUsuarios(usuarios: Usuario[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
  }

  listar(): Observable<Usuario[]> {
    return of(this.getUsuarios());
  }

  adicionar(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    const usuarios = this.getUsuarios();
    const novo: Usuario = { ...usuario, id: usuarios.length + 1 };
    usuarios.push(novo);
    this.setUsuarios(usuarios);
    return of(novo);
  }

  excluir(id: number): Observable<boolean> {
    const usuarios = this.getUsuarios().filter(u => u.id !== id);
    this.setUsuarios(usuarios);
    return of(true);
  }

  buscarPorUsername(username: string): Usuario | undefined {
    return this.getUsuarios().find(u => u.username === username);
  }
}
