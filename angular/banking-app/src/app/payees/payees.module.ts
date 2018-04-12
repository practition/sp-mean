import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { PayeesRoutingModule } from './payees-routing.module';
import { PayeesManagerComponent } from './payees-manager/payees-manager.component';

@NgModule( {
  imports : [
    SharedModule,
    PayeesRoutingModule
  ],
  declarations : [PayeesManagerComponent]
} )
export class PayeesModule {}
