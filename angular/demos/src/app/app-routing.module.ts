import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OneRouteComponent } from './one-route/one-route.component';
import { TwoRouteComponent } from './two-route/two-route.component';
import { BasicObservableComponent } from './basic-observable/basic-observable.component';
import { ObservableSuccessOrFailureComponent } from './observable-success-or-failure/observable-success-or-failure.component';

const routes: Routes = [
  {
    path : 'one',
    component : OneRouteComponent
  },
  {
    path : 'two',
    component : TwoRouteComponent
  },
  {
    path: 'basic-observable',
    component: BasicObservableComponent
  },
  {
    path: 'observable-success-or-failure',
    component: ObservableSuccessOrFailureComponent
  },
  {
    path : '',
    redirectTo : '/one',
    pathMatch : 'full'
  },
  {
    path : '**',
    redirectTo : '/one'
  }
];

@NgModule( {
  imports : [ RouterModule.forRoot( routes ) ],
  exports : [ RouterModule ]
} )
export class AppRoutingModule {}
