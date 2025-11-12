import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LogsComponent } from './pages/logs/logs.component';
import { AlunoListComponent } from './pages/aluno-list/aluno-list.component';
import { AlunoFormComponent } from './pages/aluno-form/aluno-form.component';
import { FuncionarioListComponent } from './pages/funcionario-list/funcionario-list.component';
import { FuncionarioFormComponent } from './pages/funcionario-form/funcionario-form.component';
import { CadastrosComponent } from './components/cadastros/cadastros.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'home', component: CadastrosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'logs', component: LogsComponent },
  { path: 'alunos', component: AlunoListComponent },
  { path: 'cadastrar-alunos', component: AlunoFormComponent },
  { path: 'funcionarios', component: FuncionarioListComponent },
  { path: 'cadastrar-funcionarios', component: FuncionarioFormComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
