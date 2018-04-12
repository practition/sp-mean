import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TxManagerComponent } from './tx-manager/tx-manager.component';
import { TxDetailComponent } from './tx-detail/tx-detail.component';
import { TxEditComponent } from './tx-edit/tx-edit.component';

const routes: Routes = [
  {
    path : 'tx',
    component : TxManagerComponent,
    children : [
      {
        path : 'detail/:id',
        component : TxDetailComponent
      },
      {
        path : 'edit/:id',
        component : TxEditComponent
      }/*,
      {
        path: 'account/:account',
        component: TxGridManagerComponent,
        resolve: {
          txs: TxGridManagerResolverService
        }
      }*/
    ]
  },
  {
    path : 'tx/account/:account',
    component : TxManagerComponent
  }
];

@NgModule( {
  imports : [ RouterModule.forChild( routes ) ],
  exports : [ RouterModule ]
} )
export class TransactionsRoutingModule {}
