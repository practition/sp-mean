import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HomeSummary } from '../HomeSummary';
import { HomeDaoService } from '../home-dao.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

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
  today: Date = new Date();
  summary: HomeSummary;

  constructor( private dao: HomeDaoService ) { }

  ngOnInit() {
    this.dao.getLatestTx()
      .subscribe( transaction => {
          this.summary = {};
          this.summary.lastTxAmount = transaction.amount;
          this.summary.lastTxPayee = transaction.payee.payeeName;
          this.summary.category = transaction.category.categoryName;

          this.dao.getAmountSpentByCategory( transaction.category.categoryName )
            .subscribe( total => this.summary.categoryAmount = total );
        },
        ( err ) => {
          console.log( 'Houston, we have a problem.', err.code );
        } );
  }
}
