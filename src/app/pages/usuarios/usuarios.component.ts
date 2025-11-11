import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];

  novoUsuario: Partial<Usuario> = {
    username: '',
    email: '',
    password: '',
    tipo: 'aluno',
    ativo: true
  };

  tipos = ['admin', 'personal', 'recepcionista', 'limpeza', 'aluno'];

  constructor(
    private usuariosService: UsuariosService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuariosService.listar().subscribe((data) => (this.usuarios = data));
  }

  cadastrar() {
    if (!this.novoUsuario.username || !this.novoUsuario.password || !this.novoUsuario.email) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos obrigatórios',
        detail: 'Preencha usuário, e-mail e senha!',
      });
      return;
    }

    this.usuariosService.adicionar(this.novoUsuario as Usuario).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Usuário cadastrado!',
      });
      this.carregarUsuarios();
      this.novoUsuario = {
        username: '',
        email: '',
        password: '',
        tipo: 'aluno',
        ativo: true
      };
    });
  }

  excluir(id: number) {
    this.usuariosService.excluir(id).subscribe(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Removido',
        detail: 'Usuário excluído com sucesso!',
      });
      this.carregarUsuarios();
    });
  }
}
