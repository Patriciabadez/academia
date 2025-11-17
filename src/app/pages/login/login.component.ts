import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  email = '';
  senha = '';
  hide = true;
  isLoading = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  login() {
    this.isLoading = true;

    this.loginService.login(this.email, this.senha).subscribe({
      next: (res) => {
        this.isLoading = false;

        this.loginService.salvarLogin(res.token, res.user);

        this.snack.open('Login realizado com sucesso!', 'OK', { duration: 2000 });

        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;

        this.snack.open(
          err.error?.error || 'Erro ao fazer login',
          'OK',
          { duration: 2500 }
        );
      },
    });
  }
}
