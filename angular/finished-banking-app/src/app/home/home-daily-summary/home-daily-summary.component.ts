import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HomeSummary } from '../HomeSummary';
import { HomeDaoService } from '../home-dao.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';

@Component( {
  selector : 'home-daily-summary',
  templateUrl : './home-daily-summary.component.html',
  styles : [
      `section .card-header {
      background-color: #6f42c1;
    }`
  ]
} )
export class HomeDailySummaryComponent implements OnInit {
  summary: HomeSummary | Observable<HomeSummary>;

  constructor( private dao: HomeDaoService ) { }

  ngOnInit() {
    this.summary = this.dao.getSummary();
  }
}
