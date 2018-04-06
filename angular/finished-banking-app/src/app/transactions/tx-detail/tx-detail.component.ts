import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../Transaction';

@Component( {
  selector : 'tx-detail',
  templateUrl : './tx-detail.component.html',
  styles : []
} )
export class TxDetailComponent implements OnInit {

  @Input()
  tx: Transaction;

  constructor() { }

  ngOnInit() {
  }

}
