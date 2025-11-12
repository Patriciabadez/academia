import { AlunoService } from './../../services/aluno.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogService } from '../../services/logs.service';
import { FuncionarioService } from '../../services/funcionarios.service';



@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class FuncionarioFormComponent {
  funcionarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private logService: LogService
  ) {
    this.funcionarioForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      plano: ['', Validators.required],
      validadePlano: ['', Validators.required],
      ativo: [true]
    });
  }

  salvar() {
    if (this.funcionarioForm.valid) {
      this.funcionarioService.adicionarFuncionario(this.funcionarioForm.value);
      this.logService.registrar('Cadastrou novo funcionário', this.funcionarioForm.value.nome);
      alert('Funcionário cadastrado com sucesso!');
      this.funcionarioForm.reset({ ativo: true });
    }
  }
}
