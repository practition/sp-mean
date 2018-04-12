import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { OneRouteComponent } from './one-route/one-route.component';
import { TwoRouteComponent } from './two-route/two-route.component';
import { BasicObservableComponent } from './basic-observable/basic-observable.component';
import { ObservableSuccessOrFailureComponent } from './observable-success-or-failure/observable-success-or-failure.component';


@NgModule({
  declarations: [
    AppComponent,
    OneRouteComponent,
    TwoRouteComponent,
    BasicObservableComponent,
    ObservableSuccessOrFailureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
