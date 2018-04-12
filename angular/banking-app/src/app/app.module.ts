import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { TransactionsModule } from './transactions/transactions.module';
import { BankingNavigationComponent } from './banking-navigation/banking-navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule( {
  declarations : [
    AppComponent,
    BankingNavigationComponent
  ],
  imports : [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    TransactionsModule,
    AppRoutingModule
  ],
  providers : [],
  bootstrap : [ AppComponent ]
} )
export class AppModule {}
