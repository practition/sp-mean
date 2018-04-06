import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TransactionsModule } from './transactions/transactions.module';
import { PayeesModule } from './payees/payees.module';
import { CategoriesModule } from './categories/categories.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BankingHomeComponent } from './banking-home/banking-home.component';
import { BankingNavigationComponent } from './banking-navigation/banking-navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { BankingDailyStatusComponent } from './banking-daily-status/banking-daily-status.component';

@NgModule( {
  imports : [
    BrowserModule,
    TransactionsModule,
    PayeesModule,
    CategoriesModule,
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  declarations : [
    AppComponent,
    BankingHomeComponent,
    BankingNavigationComponent,
    BankingDailyStatusComponent,
  ],
  providers : [],
  bootstrap : [ AppComponent ]
} )
export class AppModule {}
