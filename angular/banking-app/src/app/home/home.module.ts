import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { HomeManagerComponent } from './home-manager/home-manager.component';
import { HomeDailySummaryComponent } from './home-daily-summary/home-daily-summary.component';
import { HomeDaoService } from './home-dao.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRoutingModule
  ],
  declarations: [HomeManagerComponent, HomeDailySummaryComponent],
  exports: [HomeManagerComponent],
  providers: [HomeDaoService]
})
export class HomeModule { }
