import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'; // Don't do this in the real world
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'basic-observable',
  templateUrl: './basic-observable.component.html',
  styles: []
})
export class BasicObservableComponent implements OnInit, OnDestroy {

  obs = Observable.of('Observable return value');
  delayedObs = Observable.of('Delayed observable value').delay(3500);
  otherObs = Observable.of(1, 2, 3, 4, 5, 6);

  obsResult: string;
  subscription: Subscription;

  ngOnInit() {
    this.obs.subscribe(result => this.obsResult = result);
    this.subscription = this.delayedObs.subscribe(result => console.log('Results: ', result));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
