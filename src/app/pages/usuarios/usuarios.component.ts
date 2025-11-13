import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';
import { LogService } from '../../services/logs.service';

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

  /** 👇 Adiciona esta linha */
  abrirFormulario: boolean = false;

  constructor(
    private usuariosService: UsuariosService,
    private messageService: MessageService,
    private logService: LogService
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

    this.usuariosService.adicionar(this.novoUsuario as any).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Usuário cadastrado!',
      });

      // 🪵 Registra log
      this.logService.registrar(
        'Cadastrou novo usuário',
        this.novoUsuario.username || 'Desconhecido'
      );

      this.carregarUsuarios();

      // limpa e fecha formulário
      this.novoUsuario = { username: '', email: '', password: '', tipo: 'aluno', ativo: true };
      this.abrirFormulario = false;
    });
  }

  excluir(id: number) {
    this.usuariosService.excluir(id).subscribe(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Removido',
        detail: 'Usuário excluído com sucesso!',
      });

      // 🪵 Registra exclusão no log
      this.logService.registrar(
        `Excluiu usuário com ID ${id}`,
        'Administrador'
      );

      this.carregarUsuarios();
    });
  }
}
