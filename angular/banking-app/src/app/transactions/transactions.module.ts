import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TxDetailComponent } from './tx-detail/tx-detail.component';
import { TxListComponent } from './tx-list/tx-list.component';
import { TxManagerComponent } from './tx-manager/tx-manager.component';

@NgModule({
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ],
  declarations: [TxDetailComponent, TxListComponent, TxManagerComponent],
  exports: [TxDetailComponent, TxListComponent, TxManagerComponent]
})
export class TransactionsModule { }
