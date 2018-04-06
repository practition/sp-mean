import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankingHomeComponent } from './banking-home/banking-home.component';
import { CategoriesManagerComponent } from './categories/categories-manager/categories-manager.component';
import { PayeesManagerComponent } from './payees/payees-manager/payees-manager.component';
import { NotFoundComponent } from './shared/not-found.component';

const routes: Routes = [
  {path: 'home', component: BankingHomeComponent},
  {path: 'categories', component: CategoriesManagerComponent},
  {path: 'payees', component: PayeesManagerComponent},
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: '**', component: NotFoundComponent}
];

@NgModule( {
  imports : [ RouterModule.forRoot( routes ) ],
  exports : [ RouterModule ],
} )
export class AppRoutingModule {}
