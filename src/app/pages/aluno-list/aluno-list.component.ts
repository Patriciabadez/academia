import { Router } from '@angular/router';
import { Aluno } from '../../models/aluno.model';
import { LogService } from '../../services/logs.service';
import { AlunoService } from './../../services/aluno.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.scss'],
})
export class AlunoListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'telefone',
    'plano',
    'validadePlano',
    'ativo',
    'acoes',
  ];
  alunos: Aluno[] = [];

  constructor(
    private AlunoService: AlunoService,
    private LogService: LogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos() {
    this.alunos = this.AlunoService.getAlunos();
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
      const aluno = this.alunos.find((a) => a.id === id);
      this.AlunoService.removerAluno(id);
      this.LogService.registrar('Excluiu aluno', aluno?.nome || '');
      this.carregarAlunos();
    }
  }

  alternarStatus(aluno: Aluno) {
    aluno.ativo = !aluno.ativo;
    this.AlunoService.atualizarAluno(aluno);
    this.LogService.registrar(
      aluno.ativo ? 'Reativou aluno' : 'Desativou aluno',
      aluno.nome
    );
    this.carregarAlunos();
  }
  novoAluno() {
    this.router.navigate(['/cadastrar-alunos']);
  }
}
