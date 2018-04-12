import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HomeSummary } from './HomeSummary';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../transactions/Transaction';
import { TransactionsDaoService } from '../core/transactions-dao.service';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class HomeDaoService {
  baseUrl = 'http://localhost:8001';

  constructor( private http: HttpClient, private txDao: TransactionsDaoService ) { }

  getSummary(): Observable<HomeSummary> {
    const summary: HomeSummary = {};
    return this.txDao.getLastTransaction()
      .switchMap( lastTx => {
        summary.lastTx = lastTx;
        summary.lastTxAmount = lastTx.amount;
        summary.lastTxPayee = lastTx.payee.payeeName;
        summary.category = lastTx.category.categoryName;

        return this.txDao.getAmountSpentByCategory( summary.category )
          .map( total => {
            summary.categoryAmount = total;
            return summary;
          } );
      } )
      .switchMap( passedSummary => this.txDao.getNotClearedCount().map( count => {
        passedSummary.notClearedCount = count;
        return passedSummary;
      } ) );
  }

  someErrorHandler( err: HttpErrorResponse ): ErrorObservable {
    let msg = '';

    // JavaScript error?
    if ( err.error instanceof ErrorEvent ) {
      console.error( 'Javascript had a problem with the data (parsing, etc.' );
      msg = 'JavaScript error';
    } else {
      // HttpError
      switch ( err.status ) {
        case 404:
          msg = 'Could not find results';
          break;
        case 500:
          msg = 'Server was down';
          break;
        default:
          msg = 'Good luck with that.';
      }
    }

    return new ErrorObservable( {
      message : `Oops, something went wrong: [${msg}]`,
      code : 1001
    } );
  }
}
