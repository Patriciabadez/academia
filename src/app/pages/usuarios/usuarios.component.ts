import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Usuario {
  nome: string;
  username: string;
  email: string;
  codigo?: string;
  funcao: string;
  senha: string;
  ativo: boolean;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  formUsuario: FormGroup;
  usuarios: Usuario[] = [];
  colunas: string[] = ['nome', 'username', 'email', 'codigo', 'funcao', 'ativo'];

  constructor(private fb: FormBuilder) {
    this.formUsuario = this.fb.group({
      nome: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      codigo: [''],
      funcao: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required]
    });

    // Mock inicial
    this.usuarios = [
      { nome: 'Patrícia', username: 'patricia', email: 'patricia@academia.com', codigo: '001', funcao: 'administrador', senha: '123', ativo: true },
      { nome: 'Carlos', username: 'carlos', email: 'carlos@academia.com', codigo: '002', funcao: 'funcionario', senha: '123', ativo: true },
      { nome: 'João Silva', username: 'joaos', email: 'joao@academia.com', codigo: '003', funcao: 'aluno', senha: '123', ativo: true }
    ];
  }

  cadastrarUsuario() {
    if (this.formUsuario.invalid) return;

    const novoUsuario: Usuario = {
      ...this.formUsuario.value,
      ativo: true
    };

    // Simula salvamento local
    this.usuarios.push(novoUsuario);
    this.formUsuario.reset();
  }
}
