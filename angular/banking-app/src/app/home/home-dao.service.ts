import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HomeSummary } from './HomeSummary';
import { Observable } from 'rxjs/Observable';
import { Transaction } from './Transaction';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeDaoService {
  baseUrl = 'http://localhost:8001';

  constructor(private http: HttpClient) { }

  getTxById(id: number | string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/tx/${id}`);
  }

  listTx(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/tx/?_expand=payee`);
  }

  getLatestTx(): Observable<Transaction> {
    return this.http
      .get<Transaction[]>(`${this.baseUrl}/tx/?_sort=txDate&_order=desc&_limit=1&_expand=payee`)
      .pipe( catchError(this.someErrorHandler) )
      .map(transactions => transactions[0]);
  }

  someErrorHandler(err: HttpErrorResponse): ErrorObservable {
    let msg = '';

    // JavaScript error?
    if (err.error instanceof ErrorEvent) {
      console.error('Javascript had a problem with the data (parsing, etc.');
      msg = 'JavaScript error';
    } else {
      // HttpError
      switch (err.status) {
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

    return new ErrorObservable({message: `Oops, something went wrong: [${msg}]`, code: 1001});
  }

  getAmountSpentByCategory(categoryName: string): Observable<number> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/tx?category.categoryName=${categoryName}&txDate_like=2016-07-`)
      .map(transactions => {
        let total = 0;
        transactions.forEach(tx => total += tx.amount);
        return total;
      });
  }

  getAmountSpentByCategoryReduce(categoryName: string): Observable<number> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/tx?category.categoryName=${categoryName}&txDate_like=2016-07-`)
      .map(transactions => transactions.map(tx => tx.amount).reduce((total, current) => total + current));
  }

  getSummary(): HomeSummary {
    return {
      lastTxAmount: 28.76,
      lastTxPayee: 'Shop-Rite',
      categoryAmount: 250,
      category: 'Groceries'
    };
  }

}
