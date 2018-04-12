import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../../home/Transaction';

@Component({
  selector: 'tx-detail',
  templateUrl: './tx-detail.component.html',
  styles: []
})
export class TxDetailComponent implements OnInit {

  @Input()
  displayTx: Transaction;

  constructor() { }

  ngOnInit() {
  }

}
