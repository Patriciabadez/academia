import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LogsComponent } from './pages/logs/logs.component';
import { AlunoListComponent } from './pages/aluno-list/aluno-list.component';
import { AlunoFormComponent } from './pages/aluno-form/aluno-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'logs', component: LogsComponent },
  { path: 'alunos', component: AlunoListComponent },
  { path: 'cadastrar', component: AlunoFormComponent },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
