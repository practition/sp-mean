import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TxGridComponent } from './tx-grid/tx-grid.component';
import { TxDetailComponent } from './tx-detail/tx-detail.component';
import { TxManagerComponent } from './tx-manager/tx-manager.component';
import { TxEditComponent } from './tx-edit/tx-edit.component';
import { TxGridManagerComponent } from './tx-grid-manager/tx-grid-manager.component';
import { TxGridManagerResolverService } from './tx-grid-manager-resolver.service';

@NgModule( {
  imports : [
    SharedModule,
    TransactionsRoutingModule
  ],
  declarations : [ TxGridComponent, TxDetailComponent, TxManagerComponent, TxEditComponent, TxGridManagerComponent ],
  exports: [TxGridComponent, TxDetailComponent],
  providers: [TxGridManagerResolverService]
} )
export class TransactionsModule {}
