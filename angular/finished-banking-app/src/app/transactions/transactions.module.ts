import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TxListComponent } from './tx-list/tx-list.component';
import { TxDetailComponent } from './tx-detail/tx-detail.component';
import { TxManagerComponent } from './tx-manager/tx-manager.component';
import { TxEditComponent } from './tx-edit/tx-edit.component';

@NgModule( {
  imports : [
    SharedModule,
    TransactionsRoutingModule
  ],
  declarations : [ TxListComponent, TxDetailComponent, TxManagerComponent, TxEditComponent ],
  exports : [ TxListComponent, TxDetailComponent ]
} )
export class TransactionsModule {}
