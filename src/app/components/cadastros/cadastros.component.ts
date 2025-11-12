import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastros',
  templateUrl: './cadastros.component.html',
  styleUrls: ['./cadastros.component.css']
})
export class CadastrosComponent {
  constructor(private router: Router) {}

  abrirAlunos() {
    this.router.navigate(['/alunos']);
  }

  abrirFuncionarios() {
    this.router.navigate(['/funcionarios']);
  }

  abrirPlanos() {
    this.router.navigate(['/planos']);
  }

  abrirFinanceiro() {
    this.router.navigate(['/financeiro']);
  }
}
