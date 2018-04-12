import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { Transaction } from '../transactions/Transaction';
import { TxCriteria } from './TxCriteria';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransactionsDaoService {
  baseUrl = 'http://localhost:8001/tx';
  params = {
    getLastTransaction : '_sort=txDate&_order=desc&_limit=1&_expand=payee&_expand=txType',
    getLastFiveTransactions : '_sort=txDate&_order=desc&_limit=5&_expand=payee&_expand=txType',
  };

  constructor( private http: HttpClient ) { }

  getLastTransaction() {
    return this.http.get<Transaction[]>( `${this.baseUrl}?${this.params.getLastTransaction}` )
      .pipe( catchError( this.handleError ) )
      .map( txs => txs[ 0 ] );
  }

  getLastFiveTransactions() {
    return this.http.get<Transaction[]>( `${this.baseUrl}?${this.params.getLastFiveTransactions}` )
      .pipe( catchError( this.handleError ) )
      .map( txs => ( txs.map( tx => new Transaction( tx ) ) ) );
  }

  getNotCleared(): Observable<Transaction[]> {
    return this.query( new TxCriteria( { cleared : false } ) );
  }

  getNotClearedCount(): Observable<number> {
    return this.getNotCleared().map( txs => txs.length );
  }

  getAmountSpentByCategory( categoryName: string ): Observable<number> {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}?category.categoryName=${categoryName}&txDate_like=2016-07-` )
      .map( transactions => {
        let total = 0;
        transactions.forEach( tx => total += tx.amount );
        return total;
      } );
  }

  getAmountSpentByCategoryReduce( categoryName: string ): Observable<number> {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/tx?category.categoryName=${categoryName}&txDate_like=2016-07-` )
      .map( transactions => transactions.map( tx => tx.amount ).reduce( ( total, current ) => total + current ) );
  }

  query( criteria: TxCriteria ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>( `${this.baseUrl}?${criteria.getQueryString()}` )
      .pipe( catchError( this.handleError ) )
      .map( txs => ( txs.map( tx => new Transaction( tx ) ) ) );
  }

  private handleError( error: HttpErrorResponse ) {
    if ( error.error instanceof ErrorEvent ) {
      // Client-side error
      console.error( 'Error on the client side: ', error.error.message );
    } else {
      // Response code >= 400
      switch ( error.status ) {
        case 404:
          console.error( 'Not found' );
          break;
        case 500:
          console.error( 'Appears the server is down' );
          break;
        default:
          console.error( `Strange results: ${error.status} [${error.error}]` );
      }
    }

    // This goes to the caller
    return new ErrorObservable( 'DAO issues, please retry later.' );
  }

}
