import { Component, OnInit } from '@angular/core';
import { HomeDaoService } from '../home-dao.service';
import { Transaction } from '../Transaction';

@Component({
  selector: 'home-manager',
  templateUrl: './home-manager.component.html',
  styleUrls: [ './home-manager.component.css']
})
export class HomeManagerComponent implements OnInit {
  lastTx: Transaction;
  last5Tx: Transaction[];

  constructor(private dao: HomeDaoService) { }

  ngOnInit() {
    this.dao.getLatestTx()
    .subscribe(tx => this.lastTx = tx);

    this.dao.listTx()
    .subscribe(results => this.last5Tx = results.slice(0, 5));
  }

  handleSelectTransaction(tx) {
    this.lastTx = tx;
  }

}
