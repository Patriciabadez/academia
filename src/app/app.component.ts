import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isLoginPage = false;
  title = 'academia';


  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // verifica se a rota é /login
        this.isLoginPage = event.urlAfterRedirects.includes('/login');
      });
  }
  logout() {
    this.router.navigate(['/login']);
  }
}
