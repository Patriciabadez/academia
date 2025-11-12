import { AlunoService } from './../../services/aluno.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogService } from '../../services/logs.service';



@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent {
  alunoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private AlunoService: AlunoService,
    private logService: LogService
  ) {
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      plano: ['', Validators.required],
      validadePlano: ['', Validators.required],
      ativo: [true]
    });
  }

  salvar() {
    if (this.alunoForm.valid) {
      this.AlunoService.adicionarAluno(this.alunoForm.value);
      this.logService.registrar('Cadastrou novo aluno', this.alunoForm.value.nome);
      alert('Aluno cadastrado com sucesso!');
      this.alunoForm.reset({ ativo: true });
    }
  }
}
