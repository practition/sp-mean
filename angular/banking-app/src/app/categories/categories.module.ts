import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesManagerComponent } from './categories-manager/categories-manager.component';

@NgModule( {
  imports : [
    SharedModule,
    CategoriesRoutingModule
  ],
  declarations : [CategoriesManagerComponent]
} )
export class CategoriesModule {}
