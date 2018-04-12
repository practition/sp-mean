import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesManagerComponent } from './categories/categories-manager/categories-manager.component';
import { PayeesManagerComponent } from './payees/payees-manager/payees-manager.component';
import { NotFoundComponent } from './shared/not-found.component';

const routes: Routes = [];

@NgModule( {
  imports : [ RouterModule.forRoot( routes ) ],
  exports : [ RouterModule ],
} )
export class AppRoutingModule {}
