import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PayeesDaoService } from './payees-dao.service';
import { TransactionsDaoService } from './transactions-dao.service';
import { CategoriesDaoService } from './categories-dao.service';

@NgModule( {
  imports : [ HttpClientModule ],
  providers : [ PayeesDaoService, TransactionsDaoService, CategoriesDaoService ]
} )
export class CoreModule {}
