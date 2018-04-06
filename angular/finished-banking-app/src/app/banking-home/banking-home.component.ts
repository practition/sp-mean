import { Component, OnInit } from '@angular/core';
import { TransactionsDaoService } from '../core/transactions-dao.service';
import { Transaction } from '../transactions/Transaction';

@Component( {
  selector : 'banking-home',
  templateUrl : './banking-home.component.html',
  styleUrls : [ './banking-home.component.css' ]
} )
export class BankingHomeComponent implements OnInit {

  lastTx: Transaction;
  selectedTx: Transaction;
  lastTxBanner = 'Latest transaction';
  last5Tx: Transaction[];

  constructor( private dao: TransactionsDaoService ) { }

  ngOnInit() {
    this.dao.getLastTransaction()
      .subscribe( tx => {
        this.lastTx = tx;
      } );

    this.dao.getLastFiveTransactions()
      .subscribe( txs => this.last5Tx = txs );
  }

  handleSelectTx( tx: Transaction ) {
    this.selectedTx = tx;
    this.lastTxBanner = 'Selected transaction';
  }

  getDetailTx(): Transaction {
    return this.selectedTx ? this.selectedTx : this.lastTx;
  }

}
