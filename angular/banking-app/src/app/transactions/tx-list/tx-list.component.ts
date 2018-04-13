import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Transaction } from '../../home/Transaction';

@Component({
  selector: 'tx-list',
  templateUrl: './tx-list.component.html',
  styles: []
})
export class TxListComponent implements OnInit {

  @Output()
  selectTransaction = new EventEmitter<Transaction>();

  @Input()
  transactions: Transaction[];

  callSelectTransaction(tx: Transaction) {
    this.selectTransaction.emit(tx);
  }

  constructor() { }

  ngOnInit() {
  }

}
