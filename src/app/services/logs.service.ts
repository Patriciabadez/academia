import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LogsService {
  private logs: string[] = [];

  registrar(acao: string): void {
    const log = `${new Date().toLocaleString()} - ${acao}`;
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  listar(): string[] {
    const logsSalvos = localStorage.getItem('logs');
    if (logsSalvos) this.logs = JSON.parse(logsSalvos);
    return this.logs;
  }

  limpar(): void {
    this.logs = [];
    localStorage.removeItem('logs');
  }
}
