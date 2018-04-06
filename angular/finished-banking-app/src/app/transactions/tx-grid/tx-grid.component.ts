import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transaction } from '../Transaction';

@Component( {
  selector : 'tx-grid',
  templateUrl : './tx-grid.component.html',
  styles : []
} )
export class TxGridComponent implements OnInit {

  @Input()
  txs: Transaction[];

  @Output()
  selectTx = new EventEmitter<Transaction>();

  constructor() { }

  ngOnInit() {
  }

  callSelectTx(tx: Transaction) {
    this.selectTx.emit( tx );
  }
}
