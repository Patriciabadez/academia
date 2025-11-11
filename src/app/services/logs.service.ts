import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LogService {
  private logsKey = 'appLogs';

  registrar(acao: string, usuario: string) {
    const logs = this.obterLogs();
    const novoLog = {
      data: new Date().toLocaleString(),
      usuario,
      acao
    };
    logs.unshift(novoLog); // adiciona no início
    localStorage.setItem(this.logsKey, JSON.stringify(logs));
  }

  obterLogs() {
    return JSON.parse(localStorage.getItem(this.logsKey) || '[]');
  }

  limparLogs() {
    localStorage.removeItem(this.logsKey);
  }
}
