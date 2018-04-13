import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HomeSummary } from '../HomeSummary';
import {HomeDaoService} from '../home-dao.service';

@Component({
  selector: 'home-daily-summary',
  templateUrl: './home-daily-summary.component.html',
  styles: []
})
export class HomeDailySummaryComponent implements OnInit {
  today: Date = new Date();
  summary: HomeSummary;

  constructor(private dao: HomeDaoService) { }

  ngOnInit() {
    this.summary = this.dao.getSummary();

    this.dao.getTxById()
    .subscribe( tx => this.summary.lastTxAmount = tx.amount);

    this.getLastTx();

    this.dao
    .getTxById()
    .toPromise()
    .then( tx => this.summary.lastTxAmount = tx.amount );

  }

  async getLastTx() {
    const tx = await this.dao.getTxById().toPromise();
    this.summary.lastTxAmount = tx.amount;

    this.dao
    .getTxById()
    .toPromise()
    .then(tx => this.summary.lastTxAmount = tx.amount)
  }

}
