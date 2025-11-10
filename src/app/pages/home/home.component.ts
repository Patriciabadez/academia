import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCog,
  faMagnifyingGlass,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  clientes: any[] = [];
  notas: any[] = [];

  searchIcon = faMagnifyingGlass;
  userFriends = faUserFriends;
  configIcon = faCog;

  totalPaginas: number = 0;
  paginaAtual: number = 1;
  tamanhoPagina: number = 1000;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {

  }

  irParaClientes() {
    this.router.navigate(['/condominios']);
  }

  irParaBuscadorNotas() {
    this.router.navigate(['/buscador-notas']);
  }

  irParaProcessoDeCaptura() {
    this.router.navigate(['/configuracoes']);
  }

}
