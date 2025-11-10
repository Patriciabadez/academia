import { Component, computed, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  version: String = '0.0.1';
  username: String = 'Academia';
  loggedInUserEmail: string = '';
  telaAtual: string = '';
  menuClass: string = '';
  menuColor: string = '#FFFFFF';

  constructor(private _snackBar: MatSnackBar, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.loggedInUserEmail = decodedToken.email;
    }
  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url.includes('/home')) {
          this.telaAtual = 'home';
          this.menuColor = '#f27508';
        } else if (this.router.url.includes('/condominios')) {
          this.telaAtual = 'clientes';
          this.menuColor = '#f27508';
        } else {
          this.telaAtual = '';
          this.menuColor = '#FFFFFF';
        }
      }
    });
  }

  irParaClientes() {
    this.router.navigate(['/condominios']);
  }
  irParaHome() {
    this.router.navigate(['/home']);
  }
  Sair() {
    this.router.navigate(['/']);
  }
  collapsed = signal(true);

  logout(): void {
    this.router.navigate(['/login']);
    window.localStorage.clear();
    this._snackBar.open('Redirecionando para o login...', 'Fechar', {
      duration: 2000,
    });
  }

  sideNavWidth = computed(() => (this.collapsed() ? '58px' : '14vw'));
}
