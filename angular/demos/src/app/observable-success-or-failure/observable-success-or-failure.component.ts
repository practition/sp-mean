import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component( {
  selector : 'observable-success-or-failure',
  templateUrl : './observable-success-or-failure.component.html',
  styles : []
} )
export class ObservableSuccessOrFailureComponent implements OnInit {

  obs: Observable;
  obsResult: any;

  constructor() { }

  ngOnInit() {
  }

  handleCheck( event ) {
    this.obs = Observable.create( observer => {
      if ( event.target.value === 'success' ) {
        observer.next( 'success' );
        observer.complete();
      } else {
        observer.error( 'ERROR' );
      }
    } ).delay( 500 );

    this.obs.subscribe( success => {
        console.log( 'Success!' );
        this.obsResult = success;
      },
      err => {
        console.error( 'Error! ', err );
        this.obsResult = err;
      },
      () => {
        console.log( 'Done...' );
      }
    );
  }

}
