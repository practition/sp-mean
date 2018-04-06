import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component( {
  selector : 'tx-manager',
  templateUrl : './tx-manager.component.html',
  styleUrls : [ './tx-manager.component.css' ]
} )
export class TxManagerComponent implements OnInit {

  constructor( private route: ActivatedRoute ) {
    console.log( 'TxManagerComponent.data constructed' );
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe( ( params: ParamMap ) => {
        console.log( 'Account: ', params.get( 'account' ) );
      } );
  }

}
