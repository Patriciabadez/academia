import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/logs.service';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logs: any[] = [];

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.logs = this.logService.obterLogs();
  }

  limpar() {
    this.logService.limparLogs();
    this.logs = [];
  }
}
