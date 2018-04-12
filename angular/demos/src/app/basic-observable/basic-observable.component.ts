import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'; // Don't do this in the real world

@Component({
  selector: 'basic-observable',
  templateUrl: './basic-observable.component.html',
  styles: []
})
export class BasicObservableComponent implements OnInit {

  obs = Observable.of('Observable return value');
  delayedObs = Observable.of('Delayed observable value').delay(2500);

  constructor() { }

  ngOnInit() {
  }

}
