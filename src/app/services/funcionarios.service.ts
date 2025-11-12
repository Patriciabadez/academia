import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Funcionario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private funcionarios: Funcionario[] = [
    { id: 1, nome: 'João Silva', email: 'joao@academia.com', cargo: 'Personal Trainer', ativo: true },
    { id: 2, nome: 'Maria Souza', email: 'maria@academia.com', cargo: 'Recepcionista', ativo: true },
    { id: 3, nome: 'Pedro Lima', email: 'pedro@academia.com', cargo: 'Limpeza', ativo: false }
  ];

  private funcionariosSubject = new BehaviorSubject<Funcionario[]>(this.funcionarios);
  funcionarios$ = this.funcionariosSubject.asObservable();

  constructor() {}

  // ✅ Retorna todos os funcionários
  getFuncionarios(): Observable<Funcionario[]> {
    return this.funcionarios$;
  }

  // ✅ Exclui um funcionário
  deleteFuncionario(id: number): Observable<void> {
    this.funcionarios = this.funcionarios.filter(f => f.id !== id);
    this.funcionariosSubject.next(this.funcionarios);
    return of();
  }

  // ✅ Adiciona funcionário
  adicionarFuncionario(funcionario: Funcionario) {
    funcionario.id = this.funcionarios.length + 1;
    this.funcionarios.push(funcionario);
    this.funcionariosSubject.next(this.funcionarios);
  }

  // ✅ Atualiza status ou dados
  atualizar(funcionario: Funcionario) {
    const index = this.funcionarios.findIndex(f => f.id === funcionario.id);
    if (index !== -1) {
      this.funcionarios[index] = funcionario;
      this.funcionariosSubject.next(this.funcionarios);
    }
  }
}
