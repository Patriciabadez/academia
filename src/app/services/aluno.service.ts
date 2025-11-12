import { Injectable } from '@angular/core';
import { Aluno } from '../models/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private readonly STORAGE_KEY = 'alunos';

  getAlunos(): Aluno[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  adicionarAluno(aluno: Aluno): void {
    const alunos = this.getAlunos();
    aluno.id = alunos.length + 1;
    alunos.push(aluno);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(alunos));
  }

  removerAluno(id: number): void {
    const alunos = this.getAlunos().filter(a => a.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(alunos));
  }

  atualizarAluno(aluno: Aluno): void {
    const alunos = this.getAlunos().map(a => a.id === aluno.id ? aluno : a);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(alunos));
  }
}
