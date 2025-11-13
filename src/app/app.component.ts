import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  username: string;
  email: string;
  tipo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // ✅ Corrigido (plural)
})
export class AppComponent implements OnInit {
  isLoginPage = false;
  userNome: string = '';
  userTipo: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Detecta mudanças de rota para verificar se está na página de login
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isLoginPage = event.urlAfterRedirects.includes('/login');
        this.carregarUsuario();
      });

    // Carrega os dados do usuário ao iniciar
    this.carregarUsuario();
  }

  carregarUsuario() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        this.userNome = decoded.username || 'Usuário';
        this.userTipo = decoded.tipo || '';
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        this.userNome = '';
        this.userTipo = '';
      }
    } else {
      this.userNome = '';
      this.userTipo = '';
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
