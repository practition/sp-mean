import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { HomeManagerComponent } from './home-manager/home-manager.component';
import { HomeDailySummaryComponent } from './home-daily-summary/home-daily-summary.component';
import { HomeDaoService } from './home-dao.service';
import { TransactionsModule } from '../transactions/transactions.module';

@NgModule( {
  imports : [
    SharedModule,
    TransactionsModule,
    HttpClientModule,
    HomeRoutingModule
  ],
  declarations : [ HomeManagerComponent, HomeDailySummaryComponent ],
  exports : [ HomeManagerComponent ],
  providers : [ HomeDaoService ]
} )
export class HomeModule {}
