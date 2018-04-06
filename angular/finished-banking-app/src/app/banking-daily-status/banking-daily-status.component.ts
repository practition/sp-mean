import { Component, Input, OnInit } from '@angular/core';
import * as parse from 'date-fns/parse';
import { TransactionsDaoService } from '../core/transactions-dao.service';
import { Transaction } from '../transactions/Transaction';
import { Observable } from 'rxjs/Observable';
import { TxCriteria } from '../core/TxCriteria';

@Component( {
  selector : 'banking-daily-status',
  templateUrl : './banking-daily-status.component.html',
  styleUrls : [ './banking-daily-status.component.css' ]
} )
export class BankingDailyStatusComponent implements OnInit {

  @Input()
  lastTx: Transaction;
  payReceive = 'pay';
  toFrom = 'to';
  notClearedTxCount: number | Observable<number>;
  monthlyCategory = 'Transportation';
  monthlyCategoryAmount: number;

  constructor( private dao: TransactionsDaoService ) { }

  ngOnInit() {
    if ( this.lastTx.category.categoryType === 'income' ) {
      this.payReceive = 'receive';
      this.toFrom = 'from';
    }
    this.notClearedTxCount = this.dao.getNotClearedCount();

    const criteria = new TxCriteria( {
      categoryName : this.monthlyCategory,
      txDateBetween : {
        from : parse( '2016-07-01' ),
        to : parse( '2016-07-31' )
      }
    } );
    this.dao.query( criteria )
      .subscribe( txs => {
        this.monthlyCategoryAmount = txs.map( tx => tx.amount )
          .reduce( ( previousValue, currentValue ) => previousValue + currentValue );
      } );
  }
}
