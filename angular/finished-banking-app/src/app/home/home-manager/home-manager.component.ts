import { Component, OnInit } from '@angular/core';
import { HomeDaoService } from '../home-dao.service';
import { Transaction } from '../../transactions/Transaction';
import { TransactionsDaoService } from '../../core/transactions-dao.service';

@Component( {
  selector : 'home-manager',
  templateUrl : './home-manager.component.html',
  styleUrls : [ './home-manager.component.css' ]
} )
export class HomeManagerComponent implements OnInit {
  lastTx: Transaction;
  last5Tx: Transaction[];

  constructor( private dao: TransactionsDaoService ) { }

  ngOnInit() {
    this.dao.getLastTransaction()
      .subscribe( tx => this.lastTx = tx );

    this.dao.getLastFiveTransactions()
      .subscribe( results => this.last5Tx = results );
  }

  handleSelectTransaction( tx ) {
    this.lastTx = tx;
  }

}
