import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/logs.service';
import { FuncionarioService } from '../../services/funcionarios.service';
import { Funcionario } from '../../services/funcionarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css'],
})
export class FuncionarioListComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  displayedColumns = ['id', 'nome', 'email', 'cargo', 'ativo', 'acoes'];

  constructor(
    private funcionarioService: FuncionarioService,
    private logService: LogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.funcionarioService
      .getFuncionarios()
      .subscribe((data) => (this.funcionarios = data));
  }

  excluir(id: number) {
    this.funcionarioService.deleteFuncionario(id).subscribe(() => {
      this.logService.registrar('Excluiu funcionário', `ID ${id}`);
      this.carregarFuncionarios();
    });
  }

  alternarStatus(funcionario: Funcionario) {
    funcionario.ativo = !funcionario.ativo;
    this.funcionarioService.atualizar(funcionario);
    this.logService.registrar(
      funcionario.ativo ? 'Ativou funcionário' : 'Desativou funcionário',
      funcionario.nome
    );
  }
  novoFuncionario() {
    this.router.navigate(['/cadastrar-funcionarios']);
  }
}
