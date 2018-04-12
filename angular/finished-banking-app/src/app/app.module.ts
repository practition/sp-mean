import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TransactionsModule } from './transactions/transactions.module';
import { PayeesModule } from './payees/payees.module';
import { CategoriesModule } from './categories/categories.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BankingNavigationComponent } from './banking-navigation/banking-navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';

@NgModule( {
  imports : [
    BrowserModule,
    HomeModule,
    TransactionsModule,
    PayeesModule,
    CategoriesModule,
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  declarations : [
    AppComponent,
    BankingNavigationComponent,
  ],
  providers : [],
  bootstrap : [ AppComponent ]
} )
export class AppModule {}
