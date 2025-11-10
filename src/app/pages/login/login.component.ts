import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginService } from '../../services/login.service';


interface JwtPayload {
  username: string;
  email: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoading: boolean = false;
  username: string = '';
  password: string = '';
  loggedInUserEmail: string = '';
  hide = true;

  constructor(
    private authService: AuthenticationService,
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private messageService: MessageService
  ) {}

  login() {
    this.isLoading = true;
    if (!this.username || !this.password) {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Bem vindo de volta!',
        life: 2000,
        styleClass: 'custom-toast',
      });
      return;
    }
    this.loginService.login(this.username, this.password).subscribe(
      (data) => {
        this.authService.isChangeAutenticantion(true);
        window.localStorage.setItem('token', data.token);
        const decodedToken: JwtPayload = jwtDecode(data.token);
        window.localStorage.setItem('user', JSON.stringify(decodedToken));
        this.loggedInUserEmail = decodedToken.email;
        this.router.navigate(['/home']);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Login realizado com sucesso!',
          life: 2000,
          styleClass: 'custom-toast',
        });
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao fazer login!',
          life: 2000,
          styleClass: 'custom-toast',
        });
        this.isLoading = false;
      }
    );
  }
}
